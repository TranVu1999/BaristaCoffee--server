const KeyMap = require('./../models/KeyMap')
const jwt = require('jsonwebtoken')
const AccountKey = require('./../models/AccountKey')
const Account = require('./../models/Account')

/**
 * return list key match
 * @param {Array} listKey
 * @param {String} keySearch 
 */

const getListKey = function(listKey, keySearch){
    let temp = []
    for(let item of listKey){
        if(item.key.toLowerCase().indexOf(keySearch.toLowerCase()) !== -1){
            temp.push({
                key: item.key,
                score: item.score
            })
        }
    }

    // Remove duplicate key
    let resListKey = []
    for(let itemKey of temp){
        let flag = true
        let lengthKey = resListKey.length
        for(let i = 0; i < lengthKey; i++){
            if(resListKey[i].key.toLowerCase() === itemKey.key.toLowerCase()){
                flag = false
                break
            }
        }

        if(flag){
            resListKey.push({key: itemKey.key})
        }
    }
    return resListKey
}

const standardKey = function(key){
    key = key.toLowerCase()
    key = key[0].toUpperCase() + key.slice(1)

    return key
}

const removeDuplicateKey = function(listKey){
    let resListKey = []
    

    for(let itemKey of listKey){
        let flag = true
        let length = resListKey.length
        for(let i = 0; i < length; i++){
            
            if(itemKey.key === resListKey[i].key){
                flag = false
                break
            }
        }

        if(flag){
            resListKey.push(itemKey)
        }
    }

    return resListKey
}

module.exports = {
    /**
     * Get list Key match
     */
    getKey: async function(req, res){
        const {key, accessToken} = req.body

        try {
            const resLengthListKey = 10
            let resListKey = []

            if(accessToken){
                const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
                const accountId = decoded.accountId

                const listKeyOfAccount = await AccountKey
                .find({createdBy: accountId})
                .sort({createdDate: -1}).lean()

                resListKey = [...listKeyOfAccount.slice(0, 3).map(item => {
                    return {key: item.key}
                })]
            }

            let lengthKeyOfStore = resLengthListKey - resListKey.length
            const listKey = await KeyMap.find().sort({score: -1}).lean()


            resListKey = [
                ...resListKey, 
                ...getListKey(listKey, key).slice(0, lengthKeyOfStore)
            ]

            resListKey = removeDuplicateKey(resListKey)

            res.json({
                success: true, 
                message: "Your product created successfully",
                listKey: resListKey
            })
            
        } catch (error) {
            console.log(error)
            res
            .status(500)
            .json({
                success: false,
                message: "Internal server error"
            })
        }
    },

    /**
     * Add new key
     */
    addKey: async function(req, res){
        const {key, accessToken, productId} = req.body

        try {
            // Update key in account
            if(accessToken){
                const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
                const accountId = decoded.accountId;
                const account = await Account.findOne({_id: accountId}).lean()

                // account is found
                if(account){
                    const listKeyAccount = await AccountKey.find({
                        createdBy: accountId
                    }).lean()

                    for(let itemKeyClient of key){
                        let isNew = true
                        for(let itemKeyServer of listKeyAccount){
                            if(itemKeyClient.toLowerCase() === itemKeyServer.key.toLowerCase()){
        
                                const keyUpdate = new AccountKey({
                                    key: itemKeyServer.key,
                                    createdBy: accountId
                                })
        
                                await keyUpdate.save()
                                await AccountKey.deleteOne({_id: itemKeyServer._id})
        
                                isNew = false
                                break
                            }
                        }

                        if(isNew){
                            let newkey = new AccountKey({
                                key: standardKey(itemKeyClient),
                                createdBy: accountId
                            })
        
                            await newkey.save()
                        }
                    }
                }
            }

            

            

            const listKey = await KeyMap.find({productId}).lean()

            // Update key in KeyMap table
            for(let itemKeyClient of key){
                let isNew = true
                for(let itemKeyServer of listKey){
                    if(itemKeyClient.toLowerCase() === itemKeyServer.key.toLowerCase()){
                        
                        itemKeyServer.score++

                        const keyUpdate = new KeyMap({
                            key: itemKeyServer.key,
                            productId: itemKeyServer.productId,
                            score: itemKeyServer.score
                        })

                        await keyUpdate.save()
                        await KeyMap.deleteOne({_id: itemKeyServer._id})

                        isNew = false
                        break
                    }
                }

                if(isNew){
                    let newkey = new KeyMap({
                        key: standardKey(itemKeyClient),
                        productId
                    })

                    await newkey.save()
                }
            }


            res.json({
                success: true, 
                message: "Your operation is done successfully"
            })
            
        } catch (error) {
            console.log(error)
            res
            .status(500)
            .json({
                success: false,
                message: "Internal server error"
            })
        }
    },

    
}
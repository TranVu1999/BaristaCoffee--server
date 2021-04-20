const KeyMap = require('./../models/KeyMap')
const AccountKey = require('./../models/AccountKey')
const jwt = require('jsonwebtoken')

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
                .sort({createdDate: -1})

                resListKey = [...listKeyOfAccount.slice(0, 3)]
            }

            let lengthKeyOfStore = resLengthListKey - resListKey.length
            console.log({lengthKeyOfStore})
            const listKey = await KeyMap.find().sort({score: -1})
            resListKey = [
                ...resListKey, 
                ...getListKey(listKey, key).slice(0, lengthKeyOfStore)
            ]

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

    
}
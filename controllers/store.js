const helpers = require('../Helpers/auth')
const other = require('../Helpers/other')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const Account = require('../models/Account')
const Store = require('../models/Store')



module.exports = {

    /**
     * Register store for account
     */
    register: async function(req, res){
        const {accountId} = req
        const {
            brand,
            alias,
            coverImage,
            description,
            descriptionImage,
            avatar,
            logo

        } = req.body

        try {
            // is not accepted account
            const account = await Account.findOne({_id: accountId})
            if(!account){
                return res
                .status(400)
                .json({
                    success: false, 
                    message: "This account is not found"
                })
            }

            // This store is created before
            const store = await Store.findOne({brand})
            if(store){
                return res
                .status(400)
                .json({
                    success: false, 
                    message: "This shop has been created"
                })
            }

            // This account had store before
            const accountStore = await Store.findOne({createdBy: accountId})
            if( accountStore){
                return res
                .status(400)
                .json({
                    success: false, 
                    message: "You already have a store before"
                })
            } 

            const newStore = new Store({
                brand,
                alias,
                logo,
                avatar,
                coverImage,
                description,
                descriptionImage,
                createdBy: accountId,
                modifiedBy: accountId
            })

            newStore.save()

            res.json({
                success: true, 
                message: "Your store created successfully", 
                store: newStore
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
     * Update store
     */
     update: async function(req, res){
        const {accountId} = req
        const {
            brand,
            alias,
            coverImage,
            description,
            descriptionImage,
            avatar,
            logo

        } = req.body

        try {
            // is not accepted account
            const account = await Account.findOne({_id: accountId})
            if(!account){
                return res
                .status(400)
                .json({
                    success: false, 
                    message: "This account is not found"
                })
            }

            // This store is not found
            const accountStore = await Store.findOne({createdBy: accountId})
            if( !accountStore){
                return res
                .status(400)
                .json({
                    success: false, 
                    message: "This store is not found"
                })
            } 
            
            const d = new Date()
            await Store.findByIdAndUpdate(accountStore._id, {
                brand,
                alias,
                logo,
                avatar,
                coverImage,
                description,
                descriptionImage,
                createdBy: accountStore.createdBy,
                modifiedBy: accountId,
                modifiedDate:  Date.now(),
                createdDate: accountStore.createdDate
            }, (err, store) =>{
                if(err) throw err

                res.json({
                    success: true, 
                    message: "Your store has been successfully updated ", 
                    store
                })
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
     * Update store
     */
    getInfomation: async function(req, res){
        try {
            const accountId = req.accountId

            // This store is not found
            const store = await Store.findOne({createdBy: accountId})
            if(!store){
                return res
                .status(400)
                .json({
                    success: false, 
                    message: "This store is not found"
                })
            }

            res.json({
                success: true, 
                message: "Your store is found ", 
                store
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
    }
}
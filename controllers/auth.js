const helpers = require('./../Helpers/auth')
const other = require('./../Helpers/other')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const Account = require('./../models/Account')
const User = require('./../models/User')

module.exports = {
    /**
     * Sign in for user
     */
    login: async function(req, res){
        const {username, password} = req.body
        if(helpers.simpleValidate(username, password)){
            return res
            .status(400)
            .json({success: false, message: "Missing username and/or password"})
        }

        try {
            const account = await Account.findOne({username})
            if(!account){
                return res
                .json({success: false, message: "Incorrect username or password"})
            }

            // Username found
            const passwordValid = await argon2.verify(account.password, password);
            if(!passwordValid){
                return res
                .json({success: false, message: "Incorrect username or password"})
            }

            // all good
            const accessToken = jwt.sign({accountId: account._id}, process.env.ACCESS_TOKEN_SECRET)
            res.json({success: true, message: "User logged successfully", accessToken})
            
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
     * Sign up for user
     */
    register: async function(req, res){
        const {fullname, email, phoneNumber, password} = req.body

        try {
            const username = email || phoneNumber
            const account = await Account.findOne({username})
            
            if(account){
                return res
                .json({success: false, message: "This username is existed before"})
            }

            const hashedPassword = await argon2.hash(password);

            const newAccount = new Account({
                username: email || phoneNumber,
                password: hashedPassword
            })

            const newUser = new User({
                fullname,
                email: email || "",
                phoneNumber: phoneNumber || "",
                accountId: newAccount._id
            })

            await newAccount.save()
            await newUser.save()

            const accessToken = jwt.sign({accountId: newAccount._id}, process.env.ACCESS_TOKEN_SECRET);
            res.json({success: true, message: "Username created successfully", accessToken})

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
     * Send code to your email or phone
     */
    verify: function(req, res){
        const {email, phone} = req.body
        
        try {
            if(email){
                // Send code into email
                const verifyCode = other.createRandomString(6)
                other.sendCodeToEmail(email, verifyCode)
            }else{
                // Send code into phone number
                console.log(phone)
            }

            res.json({
                success: true,
                message: "The code is sended",
                verifyCode
            })
            
        } catch (error) {
            res
            .status(500)
            .json({
                success: false,
                message: "Cannot connect email"
            })
        }
    },

    /**
    * Check username is existed
    */
    checkUsername: async function(req, res){
        const {username} = req.body
        
        try {
            const user = await Account.findOne({username})

            if(user){
                return res
                .json({
                    success: false,
                    message: "This email is existed before"
                })
            }

            res.json({
                success: true,
                message: "This email is accepted"
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
const helpers = require('./../Helpers/auth')
const other = require('./../Helpers/other')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const Account = require('./../models/Account')
const Address = require('./../models/Address')
const User = require('./../models/User')
const ProductCommented = require('./../models/ProductCommented')
const ProductFavorited = require('./../models/ProductFavorited')
const ProductReaded = require('./../models/ProductReaded')
const ProductSaveForLate = require('./../models/ProductSaveForLate')
const UserNotify = require('./../models/UserNotify')
const Invoice = require('./../models/Invoice')
const InvoiceDetail = require('./../models/InvoiceDetail')
const Product = require('./../models/Product')

module.exports = {

    /**
     * Check password
     */
    checkPassword: async function(req, res){
        const {password} = req.body

        try {

            const account = await Account.findOne({_id: req.accountId}).lean()

            if(account){
                const passwordValid = await argon2.verify(account.password, password);
                if(!passwordValid){
                    return res
                    .json({
                        success: false,
                        message: "This password is not correct"
                    })
                }

                return res
                    .json({
                        success: true,
                        message: "ok"
                    })
            }

            return res
            .json({
                success: false,
                message: "This account is not found"
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
     * Update account infomation
     */
    update: async function(req, res){

        const {
            fullname, 
            phoneNumber, 
            email, 
            gender, 
            birthday, 
            newPassword
        } = req.body

        try {
            const userUpdate = {
                fullname,
                phoneNumber,
                email,
                gender, 
                birthday: new Date(birthday.year, birthday.month, birthday.date),
            }

            let accountUpdate = {
                modifiedDate: Date.now()
            } 

            let newNotify = null
            
            if(newPassword){
                
                const hashedPassword = await argon2.hash(newPassword);
                accountUpdate = {
                    ...accountUpdate,
                    password: hashedPassword
                }    
                
                newNotify = new UserNotify({
                    typeNotify: "system",
                    toAccount: req.accountId,
                    content: "CoffeeShop gửi lời cám ơn chân thành vì quý khách đã tin tưởng sử dụng dịch vụ của chúng tôi. Hãy thay đổi mật khẩu thường xuyên để có được sự bảo mật tốt hơn."
                })
                
                await newNotify.save()
            }

            let newAccount = await Account.findOneAndUpdate({_id: req.accountId}, accountUpdate)

            const newUser = await User.findOneAndUpdate({accountId: req.accountId}, userUpdate).lean()

            return res
            .json({
                success: true, 
                message: "ok",
                newUser, 
                newAccount,
                notify: newNotify
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
                .json({
                    success: false, 
                    message: "Incorrect username or password"
                })
            }

            // Username found
            const passwordValid = await argon2.verify(account.password, password);
            if(!passwordValid){
                return res
                .json({success: false, message: "Incorrect username or password"})
            }

            // all good
            const user = await User.findOne({accountId: account._id})
            
            const productComments = await ProductCommented.find({
                accountId: account._id
            })
            const productFavorites = await ProductFavorited.find({
                accountId: account._id
            })
            const productReads = await ProductReaded.find({
                accountId: account._id
            })
            const productSaveForLates = await ProductSaveForLate.find({
                accountId: account._id
            })

            const notifies = await UserNotify.find({toAccount: account._id})
            const addresses = await Address.find({accountId: account._id})


            const accountInfo = {
                id: account._id,
                username: account.username,
                fullname: user.fullname,
                phoneNumber: user.phoneNumber,
                email: user.email,
                gender: user.gender,
                birthday: user.birthday,
                productSaveForLates,
                productReads,
                productFavorites,
                productComments,
                notifies,
                addresses
            }

            const accessToken = jwt.sign({accountId: account._id}, process.env.ACCESS_TOKEN_SECRET)
            res.json({
                success: true, 
                message: "User logged successfully", 
                accessToken,
                accountInfo
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
     * Check user is logged
     */
    checkLogged: async function(req, res){
        const {accessToken} = req.body

        if(!accessToken){
            return res
            .status(401)
            .json({success: false, message: "Access token not found"})            
        }

        try {
        
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    
            // Vì kết quả trả về chính là dữ liệu trong cái access token của nó nên có thể lấy dữ liệu thông qua cách này
            const accountId = decoded.accountId;

            const account = await Account.findOne({_id: accountId})

            if(account){
                const user = await User.findOne({accountId})
                const productComments = await ProductCommented.find({accountId})
                const productFavorites = await ProductFavorited.find({accountId})
                const productReads = await ProductReaded.find({accountId})
                const productSaveForLates = await ProductSaveForLate.find({accountId})
                const notifies = await UserNotify.find({toAccount: accountId, status: true})
                const addresses = await Address.find({accountId})
                const invoices = await Invoice.find({createdBy: accountId}).lean()
                const Products = await Product.find().lean()
                const InvoiceDetails = await InvoiceDetail.find().lean()

                // set product in invoice
                const lengthInvoice = invoices.length
                
                for(let i = 0; i < lengthInvoice; i++){
                    let listProduct = InvoiceDetails.filter(item => item.invoiceId.toString() === invoices[i]._id.toString())

                    let lengthProduct = listProduct.length
                    for(let j = 0; j < lengthProduct; j++){
                        let product = Products.filter(item => item._id.toString() === listProduct[j].productId.toString())[0]

                        listProduct[j]["title"] = product.title
                    }

                    invoices[i]["listProduct"] = [...listProduct]
                }


                const accountInfo =  {
                    username: account.username,
                    fullname: user.fullname,
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    gender: user.gender,
                    birthday: user.birthday,
                    productSaveForLates,
                    productReads,
                    productFavorites,
                    productComments,
                    notifies,
                    addresses,
                    invoices
                }

                return res.json({
                    success: true, 
                    message: "User is logged before", 
                    accountInfo
                })
            }

            res.json({
                success: false, 
                message: "Cannot find this account"
            })

            

            
        } catch (error) {
            console.log(error);
            return res
            .status(403)
            .json({success: false, message: "Invalid token"})
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
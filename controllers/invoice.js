const Invoice = require('../models/Invoice')
const InvoiceDetail = require('../models/InvoiceDetail')
const Product = require('../models/Product')
const UserNotify = require('../models/UserNotify')

module.exports = {

     /**
     * Add new invoice
     */
    add: async function(req, res){
        const {
            fullname,
            company,
            province,
            district,
            ward,
            houseNumber,
            phoneNumber,
            total,
            listProduct
        } = req.body

        try {   
            const {accountId} = req
            const newInvoice = new Invoice({
                fullname,
                company,
                province,
                district,
                ward,
                houseNumber,
                phoneNumber,
                chargeShip: 14000,
                total,
                createdBy: accountId
            })

            await newInvoice.save()

            let newInvoiceRes = {
                _id: newInvoice._id,
                fullname,
                company,
                province,
                district,
                ward,
                houseNumber,
                phoneNumber,
                chargeShip: 14000,
                total,
                createdBy: accountId,
                createdDate: newInvoice.createdDate,
                orderSituation: newInvoice.orderSituation,
                listProduct: [],
                new: newInvoice.new
            }

            const Products = await Product.find().lean()

            // create invoice detail
            for(let item of listProduct){
                let newInvoiceDetail = new InvoiceDetail({
                    productId: item.productId,
                    amount: item.amount,
                    total: item.total,
                    invoiceId: newInvoice._id
                })

                await newInvoiceDetail.save()

                let product = Products.filter(itemProduct => itemProduct._id.toString() === item.productId)[0]

                if(product){
                    let newInvoiceDetailRes = {
                        productId: item.productId,
                        amount: item.amount,
                        total: item.total,
                        invoiceId: newInvoice._id,
                        title: product.title
                    }

                    newInvoiceRes.listProduct.push(newInvoiceDetailRes)
                }

                
            }

            let newNotify = null
            
            newNotify = new UserNotify({
                typeNotify: "invoice",
                toAccount: accountId,
                content: "CoffeeShop gửi lời cám ơn chân thành vì quý khách đã tin tưởng sử dụng dịch vụ của chúng tôi. Hóa đơn của bạn sẽ được xử lý trong vài ngày tới."
            })
            
            await newNotify.save()

            res.json({
                success: true, 
                message: "Your operation is done successfully.",
                newInvoice: newInvoiceRes,
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

    getDetail: async function(req, res){
        const invoiceId = req.params.id

        try {   
            const invoice = await Invoice.findOne({_id: invoiceId})

            if(invoice){                
                return res.json({
                    success: true, 
                    message: "Your operation is done successfully.",
                    invoice
                }) 
            }


            res.json({
                success: false, 
                message: "Your invoice is not found."
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
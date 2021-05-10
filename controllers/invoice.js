const Invoice = require('../models/Invoice')
const InvoiceDetail = require('../models/InvoiceDetail')

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

            // create invoice detail
            for(let item of listProduct){
                let newInvoiceDetail = new InvoiceDetail({
                    productId: item.productId,
                    amount: item.amount,
                    total: item.total,
                    invoiceId: newInvoice._id
                })

                await newInvoiceDetail.save()
            }

            res.json({
                success: true, 
                message: "Your operation is done successfully.",
                newInvoice
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
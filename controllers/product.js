const Account = require('./../models/Account')
const Product = require('./../models/Product')

module.exports = {
    /**
     * Add new product
     */
    addNew: async function(req, res){
        const {accountId} = req
        const {
            avatar,
            moreImage,
            title,
            alias,
            productCategoryId,
            price,
            shortDescription,
            detail,
            sku,
            keySearch
        } = req.body

        try {
            const account = await Account.findOne({_id: accountId})
            if(!account){
                return res
                .status(400)
                .json({
                    success: false, 
                    message: "This account is not found"
                })
            }

            const product = await Product.findOne({title})
            if(product){
                return res
                .status(400)
                .json({
                    success: false, 
                    message: "This shop has been created"
                })
            }

            // All good
            const newProduct = new Product ({
                avatar,
                title,
                moreImage,
                alias,
                productCategoryId,
                price,
                shortDescription,
                detail,
                sku,
                keySearch,
                createdBy: accountId
            })

            newProduct.save()
            res.json({
                success: true, 
                message: "Your product created successfully", 
                product: newProduct
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
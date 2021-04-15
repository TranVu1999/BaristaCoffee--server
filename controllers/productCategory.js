const Account = require('./../models/Account')
const ProductCategory = require('./../models/ProductCategory')

module.exports = {
    /**
     * Add new product categody
     */
    addNew: async function(req, res){
        const {accountId} = req
        const {title, alias} = req.body

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

            const prodCate = await ProductCategory.findOne({title})
            if(prodCate){
                return res
                .status(400)
                .json({
                    success: false, 
                    message: "This product catalog has been created before"
                })
            }

            const newProdCate = new ProductCategory({
                title,
                alias,
                createdBy: accountId
            })
            newProdCate.save()

            res.json({
                success: true, 
                message: "This product category created successfully",
                productCategory: newProdCate
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
     * Get all product category
     */
    getAll: async function(req, res){

        try {
            const listProdCate = await ProductCategory.find().sort({"title": 1})
            res.json({
                success: true, 
                message: "Your operation is done successfully",
                listProdCate
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
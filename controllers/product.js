const Account = require('./../models/Account')
const Product = require('./../models/Product')
const ProductSale = require('./../models/ProductSale')
const KeyMap = require('./../models/KeyMap')

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
            keySearch,
            height, 
            weight,
            length,
            width,
            listSale
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
                    message: "This product has been created"
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
                createdBy: accountId,
                height, 
                weight,
                length,
                width
            })
            newProduct.save()

            for(let item of listSale){
                let newProductSale = new ProductSale({
                    from: item.from,
                    to: item.to,
                    price: item.price,
                    productId: newProduct._id
                })
                newProductSale.save()
            }

            for(let item of keySearch){
                let newKeyMap = new KeyMap({
                    key: item,
                    productId: newProduct._id,
                    createdBy: accountId
                })
                newKeyMap.save()
            }

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
        
    },

    /**
     * Get list product
     */
    filter: async function(req, res){
        const {
            perPage,
            page,
            sortBy
        } = req.body

        try {
            let listProduct = null

            switch(sortBy){
                case "Sort by lastest":
                    listProduct = await Product.find().sort({createdDate: -1})
                    break

                case "Sort by popularity":
                    listProduct = await Product.find().sort({view: -1})
                    break

                case "Sort by average rating":
                    listProduct = await Product.find().sort({rating: -1})
                    break

                case "Sort by price: low to high":
                    listProduct = await Product.find().sort({price: 1})
                    break

                case "Sort by price: high to low":
                    listProduct = await Product.find().sort({price: -1})
                    break
                
                default: 
                    listProduct = await Product.find().sort({createdDate: -1})
                    break
            }

            if(!listProduct){
                return res
                .status(400)
                .json({
                    success: false,
                    message: "Cannot get list product"
                })
            }

            const startIndex = (page - 1) * perPage
            res.json({
                success: true, 
                message: "Your operation is done successfully",
                sizeList: listProduct.length,
                listProduct: listProduct.splice(startIndex, perPage),
                
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
     * Get list top rated 3 product
     */
    filterTopRate: async function(req, res){
        try {
            const listProduct = await Product.find().sort({rating: 1})

            res.json({
                success: true, 
                message: "Your operation is done successfully",
                listProduct: listProduct.slice(0, 3)
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
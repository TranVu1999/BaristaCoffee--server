const Account = require('./../models/Account')
const Store = require('./../models/Store')
const Product = require('./../models/Product')
const ProductRate = require('./../models/ProductRate')
const ProductCategory = require('./../models/ProductCategory')
const ProductSale = require('./../models/ProductSale')
const KeyMap = require('./../models/KeyMap')

const sortByScore = function (listProduct, listStore){
    // update score
    let lengthProduct = listProduct.length
    for(let storeItem of listStore){
        for(let i = 0; i < lengthProduct; i++){
            if(storeItem.createdBy === listProduct[i].createdBy){
                listProduct[i].score += storeItem.score * 2
            }
        }
    }

    
    for(let i = 0; i < lengthProduct; i++){
        for(let j = i + 1; j < lengthProduct; j++){
            if(listProduct[i].score < listProduct[j].score){
                let temp = {...listProduct[i]}
                listProduct[i] = {...listProduct[j]}
                listProduct[j] = {...temp}
            }
            
        }
    }

    return listProduct
}

const sortByType = function (listProduct, typeSort){
    let resListProduct = [...listProduct]

    let keyProp = ""
    switch(typeSort){
        case "Sort by lastest":
            keyProp = "createdDate"
            break

        case "Sort by popularity":
            keyProp = "view"
            break

        case "Sort by average rating":
            keyProp = "rating"
            break

        case "Sort by price: low to high":  
            keyProp = "price"
            break      
        case "Sort by price: high to low":
            keyProp = "price"
            break

        default:
            break
    }

    let length = resListProduct.length
    for(let i = 0; i < length; i++){
        for(let j = i + 1; j < length; j++){
            if(resListProduct[i][keyProp] < resListProduct[j][keyProp]){
                let temp = {...resListProduct[i]}
                resListProduct[i] = {...resListProduct[j]}
                resListProduct[j] = {...temp}
            }
            
        }
    }

    if(typeSort === "Sort by price: low to high"){
        resListProduct = resListProduct.reverse()
    }

    return resListProduct
}

const filterKey = function(listKey, key){
    let resListKey = []
    for(let keyItem of listKey){
        if(keyItem.key.toLowerCase().indexOf(key.toLowerCase()) !== -1){
            resListKey.push(keyItem)
        }
    }

    return resListKey
}

const filterProductByKey = function(listProduct, listKey){
    console.log(listKey)

    let temp = []
    for(let keyItem of listKey){
        for(productItem of listProduct){
            
            if(productItem._id.toString() === keyItem.productId.toString()){
                temp.push(productItem)
            }
        }
    }

    let resListProduct = []
    for(let tempItem of temp){
        let flag = true
        let lengthProduct = resListProduct.length
        for(let i = 0; i < lengthProduct; i++){
            if(tempItem._id == resListProduct[i]._id){
                flag = false
                break
            }
        }

        if(flag){
            resListProduct.push(tempItem)
        }
    }

    return resListProduct
}

const filterProductByProductCategory = function (listProduct, productCategoryId){
    let resListProduct = []
    let lengthProduct = listProduct.length
    for(let i = 0; i < lengthProduct; i++){

        if(productCategoryId.toString() == listProduct[i].productCategoryId.toString()){
            resListProduct.push(listProduct[i])
        }
    }

    return resListProduct
}

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
            sortBy,
            productCategory,
            keySearch
        } = req.body

        try {
            let listProduct = await Product.find().lean()

            if(keySearch){
                // B1: lấy danh sách các từ khóa ra.
                const db_listKey = await KeyMap.find().lean()
                const listKey = filterKey(db_listKey, keySearch)

                listProduct = filterProductByKey(listProduct, listKey)
            }

            

            if(productCategory !== "All"){
                const prodCate= await ProductCategory.findOne({title: productCategory}).lean()
                listProduct = filterProductByProductCategory(listProduct, prodCate._id)
                
            }
            
            if(sortBy === "Sort by popularity"){
                const listStore = await Store.find().lean()
                listProduct = sortByScore(listProduct, listStore)
            }else{
                listProduct = sortByType(listProduct, sortBy)

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
            const listProduct = await Product.find().sort({rating: 1}).lean()

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
    },

    /**
     * Get product infomation 
     */
    getProductInfomation: async function(req, res){
        const {alias} = req.params

        try {
            const listProduct = await Product.find().lean()
            const listStore = await Store.find().lean()

            let product = listProduct.filter(item => item.alias === alias)[0]

            let productCategory = await ProductCategory.findOne({_id: product.productCategoryId}).lean()

            let comment = await ProductRate.find({productId: product._id}).lean()

            if(!product){
                res
                .status(400)
                .json({
                    success: false, 
                    message: "This product is not found"
                })
            }

            // get list product relative
            // get list key of product
            const listKey = product.keySearch
            let listRelativeProduct = listProduct.filter(item =>{
                if(item._id !== product._id){
                    for(let keyRelativeItem of item.keySearch){
                        for(let keyItem of listKey){
                            if(
                                keyItem.toLowerCase().indexOf(keyRelativeItem.toLowerCase()) !== -1
                            ){
                                return true
                            }
                        }
                    }
                }
                return false
            })

            listRelativeProduct = sortByScore(listProduct, listStore)

            res.json({
                success: true, 
                message: "Your operation is done successfully",
                product: {
                    ...product, 
                    productCategory: productCategory.title,
                    comment,
                    listRelativeProduct: listRelativeProduct.slice(0, 4)
                }
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
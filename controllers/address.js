const Account = require('../models/Account')
const Address = require('../models/Address')



module.exports = {

     /**
     * Add new address
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
            isDefault
        } = req.body

        try {
            const {accountId} = req
            if(isDefault){
                const filter = {accountId, isDefault: true}
                await Address.findOneAndUpdate(filter, {isDefault: false})
            }

            const newAddress = new Address({
                fullname, 
                company, 
                province, 
                district, 
                ward, 
                houseNumber, 
                phoneNumber, 
                isDefault,
                accountId
            })

            await newAddress.save()
            
            
            res.json({
                success: true, 
                message: "Your operation is done successfully.",
                newAddress
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
const express = require('express')
const dbConnect = require('../database/config')
require('../database/config')
const {getShopping, postShopping, putShopping, deleteShopping} = require('../controllers/shoppingController')
const {getSale, postSale, putSale, deleteSale} = require('../controllers/salesController')
const { getCat, postCat, putCat, deleteCat } =  require('../controllers/catController')
const { getProv, postProv, putProv, deleteProv } =  require('../controllers/provController')
const cors = require('cors')

class Server{
    constructor(){
        this.app = express()
        this.listen()
        this.dbConecction()
        this.pathShopping = '/api/shopping' 
        this.pathSale = '/api/sales'
        this.pathCat = '/api/catproveedores'
        this.pathProv = '/api/proveedores'
        this.route()
    }

    async dbConecction(){
        await dbConnect()
    }

    route(){
        this.app.use(express.json())
        this.app.use(cors())
        //METHODS SHOPPING
        this.app.get(this.pathShopping, getShopping) 
        // this.app.get(this.pathShopping+'/:id', getOneShopping)
        this.app.post(this.pathShopping, postShopping)
        this.app.put(this.pathShopping+'/:id', putShopping)
        this.app.delete(this.pathShopping+'/:id', deleteShopping)
        //METHODS SALES
        this.app.get(this.pathSale, getSale) 
        this.app.post(this.pathSale, postSale)
        this.app.put(this.pathSale+'/:id',putSale)
        this.app.delete(this.pathSale+'/:id', deleteSale)
        //METHODS CATEGORIA DE PROVEEDORES
        this.app.get(this.pathCat, getCat) 
        this.app.post(this.pathCat, postCat)
        this.app.put(this.pathCat+'/:id',putCat)
        this.app.delete(this.pathCat+'/:id', deleteCat)
        //METHODS PROVEEDORES
        this.app.get(this.pathProv, getProv) 
        this.app.post(this.pathProv, postProv)
        this.app.put(this.pathProv+'/:id',putProv)
        this.app.delete(this.pathProv+'/:id', deleteProv)
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log('Server is runing')
        })
    }
}

module.exports = Server
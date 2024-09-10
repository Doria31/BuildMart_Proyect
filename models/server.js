const express = require('express')
const dbConnect = require('../database/config')
require('../database/config')
const {getShopping, postShopping, putShopping, deleteShopping} = require('../controllers/shoppingController')
const {getSale, postSale, putSale, deleteSale} = require('../controllers/salesController')
const cors = require('cors')

class Server{
    constructor(){
        this.app = express()
        this.listen()
        this.dbConecction()
        this.pathShopping = '/api/shopping' 
        this.pathSale = '/api/sales'
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

    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log('Server is runing')
        })
    }
}

module.exports = Server
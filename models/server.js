const express = require('express')
const dbConnect = require('../database/config')
require('../database/config')
const {getShopping, postShopping, putShopping, deleteShopping} = require('../controllers/shoppingController')

class Server{
    constructor(){
        this.app = express()
        this.listen()
        this.dbConecction()
        this.pathShopping = '/api/shopping' 
        this.route()
    }

    async dbConecction(){
        await dbConnect()
    }

    route(){
        this.app.use(express.json())
        this.app.get(this.pathShopping, getShopping) 
        this.app.post(this.pathShopping, postShopping)
        this.app.put(this.pathShopping, putShopping)
        this.app.delete(this.pathShopping+'/:id', deleteShopping)
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log('Server is runing')
        })
    }
}

module.exports = Server
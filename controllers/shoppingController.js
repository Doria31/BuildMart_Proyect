//Metodos http / Api BuildMart

const Shopping = require('../models/shopping')

//Metodo GET

const getShopping = async(req, res) => {
    const shopping = await Shopping.find()

    res.json(shopping)
}

//Metodo POST

const postShopping = async (req, res) => {

    const { nit, supplier, product, amount, price, date } = req.body;
    
    const total = price * amount;

    const newShopping = new Shopping({
        nit,
        supplier,
        product,
        amount,
        price,
        date,
        total,
        
    });

    try {
        const savedShopping = await newShopping.save();
        res.status(201).json(savedShopping); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

};

// Metodo PUT

const putShopping = async(req, res) => {
    const { _id,  nit, supplier, product, amount, price, date } = req.body

    id = req.params.id
    let msg = 'Updated purchase'
    
    try {
        await Shopping.findByIdAndUpdate(_id, {nit:nit, supplier:supplier, product:product, amount:amount, 
            price:price, date: date})
    } catch (error) {
        msg = error
    }
    res.json({msg:msg})
}   

//Metodo Delete

const deleteShopping = async(req, res) => {
    let msg = 'Purchase removed'
    id = req.params.id
    try {
        await Shopping.findByIdAndDelete({_id: id})
    } catch (error) {
        msg = 'There was a problem while deleting'
    }
    res.json({msg:msg})
}

//Exportación

module.exports = {
    getShopping,
    postShopping,
    putShopping,
    deleteShopping,
}
const {model,Schema} = require('mongoose')

const ShoppingSchema = new Schema({
    nit: {
        type: String,//Tipo dato
        unique:true,//Unico
        required:[true, 'El NIT es requerido'],//Requerido
        maxlength:[12,'Maximo 11 caracteres'],//Tamaño maximo
        minlength:[5, 'Minimo 6 caracteres']//Tamaño 6 characters
    },
    supplier: {
        type: String,//Tipo dato
        required:[true, 'El Proveedor es requerido'],//Requerido
        maxlength: [50, 'Maximo 50 caracteres'],
        minlength:[3, 'Minimo 3 caracteres']//Tamaño 6 characters
    },
    product: {
        type: String,
        required: [true, 'El Producto es requerido'],
        maxlength: [50, 'Maximo 50 caracteres'],
        minlength: [3, 'Minimo 1 unidad']
    },
    amount: {
        type: Number,
        required: [true, 'La Cantidad es requerida'],
        maxlength: [999, 'Maximo 999 unidades'],
        minlength: [1, 'Minimo 1 unidad']
    },
    price: {
        type: Number,
        required: [true, 'El Precio es requerido'],
        maxlength: [999999999, 'Maximo 999 unidades'],
        minlength: [100, 'Minimo 1 unidad']
    },
    date: {
        type: Date,
        required: [true, 'La Fecha es requerida'],
    },
    total: {
        type: Number,
        required: [true]
    }
}
)

module.exports = model('Shopping', ShoppingSchema, 'shopping') 
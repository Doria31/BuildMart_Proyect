const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    maxlength:[40,'Maximo 40 caracteres'],
    minlength:[5, 'Minimo 5 caracteres'],
    required: [true]
},
  amount: { 
    type: Number, 
    required: [true]
},
  price: { 
    type: Number,
    required: [true]
}
});

const shoppingSchema = new mongoose.Schema({
  nit: { 
      type: String, 
      required: [true],
      maxlength:[10,'Maximo 30 caracteres'],
      minlength:[10, 'Minimo 3 caracteres'],
      unique: [true]
  },
  supplier: { 
    type: String, 
    maxlength:[40,'Maximo 40 caracteres'],
    minlength:[5, 'Minimo 5 caracteres'],
    required: [true]
},
  date: { 
    type: Date, 
    required: [true] 
},
  products: [
    productSchema
],
  total: { 
    type: Number, 
    required: [true] 
}
});

const Shopping = mongoose.model('Shopping', shoppingSchema);

module.exports = Shopping

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

const saleSchema = new mongoose.Schema({
  customer: { 
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

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale

const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
});


const Categorias = mongoose.model('Categorias', CategoriaSchema)

module.exports = Categorias
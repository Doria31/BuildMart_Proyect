const Sale = require('../models/sales')

const getSale = async (req, res) => {
    try {
      const sale = await Sale.find();
      res.json(sale);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

const postSale= async (req, res) => {
    const { customer, products, date } = req.body;
  
    // Validar que productos es un array y contiene elementos
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'El campo "productos" debe ser un array y no puede estar vacío.' });
    }
  
    // Calcular el total
    const total = products.reduce((sum, prod) => {
      if (typeof prod.amount !== 'number' || typeof prod.price !== 'number') {
        throw new Error('La cantidad y el precio deben ser números.');
      }
      return sum + (prod.amount * prod.price);
    }, 0);
  
    // Verificar que el total es un número
    if (isNaN(total)) {
      return res.status(400).json({ message: 'El cálculo del total falló.' });
    }
  
    // Crear la nueva compra usando el modelo correcto
    const newSale = new Sale({
      customer,
      date,
      products,
      total,
    });
  
    try {
      const savedSale = await newSale.save();
      res.status(201).json(savedSale);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };


const putSale = async (req, res) => {
    const { id } = req.params;
    const { customer, products, date} = req.body;
  
    // Validar que productos es un array y contiene elementos
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'El campo "productos" debe ser un array y no puede estar vacío.' });
    }
  
    // Calcular el total
    const total = products.reduce((sum, prod) => {
      if (typeof prod.amount !== 'number' || typeof prod.price !== 'number') {
        throw new Error('La cantidad y el precio deben ser números.');
      }
      return sum + (prod.amount * prod.price);
    }, 0);
  
    // Verificar que el total es un número
    if (isNaN(total)) {
      return res.status(400).json({ message: 'El cálculo del total falló.' });
    }
  
    try {
      // Buscar y actualizar la compra
      const getSale = await Sale.findByIdAndUpdate(
        id,
        { customer, products, total, date },
        { new: true, runValidators: true } // `new: true` para devolver el documento actualizado
      );
  
      if (!getSale) {
        return res.status(404).json({ message: 'Compra no encontrada.' });
      }
  
      res.json(getSale);
    } catch (err) {
      // Manejo de errores para campos únicos
      if (err.code === 11000) {
        // Error de duplicado de clave única
        res.status(400).json({ message: 'El NIT ya está registrado.' });
      } else {
        res.status(400).json({ message: err.message });
      }
    }
};


const deleteSale = async(req, res) => {
  let msg = 'Compra eliminada'
  id = req.params.id
  try {
      await Sale.findByIdAndDelete({_id: id})
  } catch (error) {
      msg = 'There was a problem while deleting'
  }
  res.json({msg:msg})
}

module.exports = {
    getSale,
    postSale,
    putSale,
    deleteSale,
}
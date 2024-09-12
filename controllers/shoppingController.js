//Metodos http / Api BuildMart

const Shopping = require('../models/shopping')

//Metodo GET

const getShopping = async (req, res) => {
    try {
      const shopping = await Shopping.find(); // Busca todas las compras en la base de datos usando el método `find()` y las almacena en la variable `shopping`.
      res.json(shopping);  // Envía las compras como respuesta en formato JSON.
    } catch (err) {
      res.status(500).json({ message: err.message });// Si hay un error al buscar, responde con un estado 500 (error del servidor) y envía el mensaje de error.
    }
  };

// const getOneShopping = async(req,res) =>{
//     const{id}= req.params
//     const shopping = awaitShopping.findById(id)
//     res.json(shopping)
// }

//Metodo POST

const postShopping = async (req, res) => {
  // Extrae los campos 'supplier', 'nit', 'products', y 'date' del cuerpo de la solicitud
  const { supplier, nit, products, date } = req.body;

  // Validar que productos es un array y contiene elementos
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: 'El campo "productos" debe ser un array y no puede estar vacío.' });
  }

  // Calcular el total de la compra sumando el precio total de cada producto (cantidad * precio)
  const total = products.reduce((sum, prod) => {
    // Validar que 'amount' y 'price' de cada producto sean números
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
  const newShopping = new Shopping({
    supplier,
    nit,
    date,
    products,
    total,
  });

  try {
    // Guardar la nueva compra en la base de datos
    const savedShopping = await newShopping.save();
    // Responder con la compra creada y el código de estado 201 (creado)
    res.status(201).json(savedShopping);
  } catch (err) {
    // En caso de error, responder con un código de estado 400 y el mensaje de error
    res.status(400).json({ message: err.message });
  }
};

// Metodo PUT
const putShopping = async (req, res) => {
  // Extrae el ID de la compra desde los parámetros de la solicitud
  const { id } = req.params;
  // Extrae los campos del cuerpo de la solicitud
  const { supplier, nit, products, date } = req.body;

  // Validar que 'products' es un array y no está vacío
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
    const getShopping = await findByIdAndUpdate(
      id,
      { supplier, nit, products, total, date},
      { new: true, runValidators: true } // `new: true` para devolver el documento actualizado
    );

    if (!getShopping) {
      return res.status(404).json({ message: 'Compra no encontrada.' });
    }

    res.json(getShopping);
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

// //Metodo Delete
const deleteShopping = async(req, res) => {
    let msg = 'Compra eliminada'
     // Extraer el ID de la compra a eliminar desde los parámetros de la solicitud
    id = req.params.id
    try {
        await findByIdAndDelete({_id: id})
    } catch (error) {
        msg = 'There was a problem while deleting'
    }
    res.json({msg:msg})
}

//Exportación
module.exports = {
    getShopping,
    // getOneShopping,
    postShopping,
    putShopping,
    deleteShopping,
}
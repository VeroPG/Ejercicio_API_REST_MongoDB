const Product = require("../models/products.model");
const Providers = require("../models/providers.model");

// GET - READ
const getProvider = async (req, res) => {
  try {
    const provider = await Providers.find().select();

    res.status(200).json(provider);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ msj: `ERROR: ${error.stack}` });
  }
};

//CREATE - POST
const createProvider = async (req, res) => {
  try {
    const result = await new Providers(req.body).save();
    res.status(201).json({ message: "Proveedor creado", provider: result });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

//UPTADE - PUT
const updateProvider = async (req, res) => {
  try {
    const nombreEmpresa = { company_name: req.body.company_name };
    const result = await Providers.findOneAndUpdate(nombreEmpresa, req.body);
    res.status(200).json({
      message: `Proveedor actualizado: ${req.body.company_name}`,
      provider: result,
    });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

//DELETE

const deleteProvider = async (req, res) => {
  try {
    const nombreEmpresa = req.body.company_name;
    const buscar = await Product.find({ "provider.name": nombreEmpresa });
    if (buscar.length === 0) {
      const result = await Providers.deleteOne({ company_name: nombreEmpresa });
      res
        .status(200)
        .json({ message: `Se ha borrado el proveedor: ${nombreEmpresa}` });
    } else {
      res.status(409).json({
        message: `ERROR: El proveedor '${req.body.company_name}' no se puede borrar ya que tiene productos asociados en la Base de Datos.`,
      });
    }
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

module.exports = {
  getProvider,
  createProvider,
  updateProvider,
  deleteProvider,
};

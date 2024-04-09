const Provider = require("../models/providers.model")
const Product = require("../models/products.model")

// READ
const getProduct = async (req, res) => {
    try {
        const products = await Product
            .find()
            .populate('provider')
            .select();
        res.status(200).json(products);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
};


//CREATE - POST

const createProduct = async (req, res) => {
    try{
        const {title, price, description, provider} = req.body;
        const buscarProvider = await Provider.find({company_name: provider});
        if ( buscarProvider.length === 0) {
            res.status(400).json({message: `ERROR: El proveedor intorducido no existe`})
        } else {
            const crearProducto = {
                title,
                price,
                description,
                provider: buscarProvider[0]._id
            };
            let result = await new Product(crearProducto).save();
            res.status(201).json({message: "Producto creado", product: result});
        }

    }catch (error) {
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
};

//CREATE - PUT

const updateProduct = async (req, res) => {
    try {
        const {title, price, description, provider} = req.body;
        if (provider) {
            const buscarProvider = await Provider.find({company_name: req.body.provider});
            if ( buscarProvider.length === 0) {
                res.status(400).json({message: `ERROR: El proveedor intorducido no existe`})
                return
            } else {
                const productoEditado = {
                    title,
                    price,
                    description,
                    provider: buscarProvider[0]._id
                };
            }
            const result = await Product.findOneAndUpdate({title}, productoEditado);
        } else {
            const result = await Product.findOneAndUpdate({title}, req.body);
            res.status(200).json({message: `Producto actualizado: ${req.body.title}`, product: result});
        }
        
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};


//DELETE
const deleteProduct = async (req, res) => {
    try {
        const result = await Product.deleteOne({title: req.body.title});
        res.status(200).json({message: `Se ha borrado el producto: ${req.body.title}`});
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};


module.exports = {
    getProduct,
    createProduct,
    updateProduct, 
    deleteProduct
}









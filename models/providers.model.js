const mongoose = require('mongoose');
require('../config/db_mongo') // Conexión a BBDD MongoDB

const objectSchema = {
    id: { 
        type: Number, 
        required: true,
        unique: true
    },
    company_name: {
        type: String,
        required: true,
        unique: true
    },
    CIF: {
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required:true
    },
    url_web:{
        type: String,
        required: true,
        validate: {
            validator: function(url){
                if(url.indexOf("http://www.") != -1 || url.indexOf("https://www.") != -1)
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Introdude un web válida por favor"
        }
    }
};

const providerSchema = mongoose.Schema(objectSchema);



// Crear el modelo
const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;
const express = require("express");
const cowsay = require("cowsay");
const app = express();
const port = 3000;
app.use(express.json()); // Habilito recepción de JSON en servidor
mongoose = require('./config/db_mongo');

// Middlewares
const error404 = require("./middlewares/error404");
const morgan = require("./middlewares/morgan");

// Logger
app.use(morgan(":method :host :status :param[id] - :response-time ms :body"));

// Rutas
const providersRoutes = require("./routes/providers.routes");
const productsRoutes = require("./routes/products.routes");



// Rutas

app.use("/products", productsRoutes);
app.use("/providers", providersRoutes);

//por defecto
app.get('/', (req, res) => {
  res.send('Bienvenido a nuestra API de proveedores y productos')
})

//rutas
app.use('/products',productsRoutes);
app.use('/providers',providersRoutes);

// Para rutas no existentes
app.use("*", error404);

app.listen(port, () => {
  console.log(
    cowsay.say({
      text: `Nos vamos a por tortilla. Funcionando en: http://localhost:${port}`,
      e: "oO",
      T: "U ",
    })
  );
});

// Cargar variables de entorno
require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");

const allowedOrigins = [
  "https://servicios-web-final.onrender.com/api/docs/#/Devices/get_api_devices",
];
const options = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// Middlewares globales.
app.use(cors(options));

app.use(express.json()); // Es lo mismo que bodyParser.json()

// Swagger
const setupSwagger = require("./swagger");
setupSwagger(app);

// Enrutamiento
const routerApi = require("./routes/rutas");
routerApi(app);

// ErrorHandler
const { logErrors, errorHandler } = require("./middlewares/errorHandler");
app.use(logErrors);
app.use(errorHandler);

// Conexión MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conexión a mongoDB exitosa"))
  .catch((err) => console.error("No se puede conectar a mongoDB", err));

// Levantar servidor
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));

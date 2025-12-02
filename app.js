// Cargar variables de entorno
require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");

const allowedOrigins = [
  "http://localhost:4000",
  "http://localhost:3000",
  "https://servicios-web-final.onrender.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Swagger a veces manda null
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// CORS SIEMPRE DE PRIMERO
app.use(cors());

// Body parser
app.use(express.json());

// Enrutamiento
const routerApi = require("./routes/rutas");
routerApi(app);

// Swagger (DESPUÉS del router)
const setupSwagger = require("./swagger");
setupSwagger(app);

// ErrorHandler
const { logErrors, errorHandler } = require("./middlewares/errorHandler");
app.use(logErrors);
app.use(errorHandler);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conexión a mongoDB exitosa"))
  .catch((err) => console.error("No se puede conectar a mongoDB", err));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));

app.get("/", (req, res) => {
  res.send("API funcionando");
});

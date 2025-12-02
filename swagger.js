const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//configuracion del swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Documentacion proyecto final",
    version: "1.0.0",
    description: "Documentacion de la Api con Swagger",
  },
  servers: [
    /*
    {
      url: "http://localhost:4000",
      description: "Servidor de desarrollo",
    },
    */
    {
      url: "https://servicios-web-final.onrender.com",
      description: "Servidor de producción",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;

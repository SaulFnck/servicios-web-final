//Traer entidades
const users = require("./users");
const zones = require("./zones");
const devices = require("./devices");
const sensors = require("./sensors");
const readings = require("./readings");

function routerApi(app) {
  app.use("/api/users", users);
  app.use("/api/zones", zones);
  app.use("/api/devices", devices);
  app.use("/api/sensors", sensors);
  app.use("/api/readings", readings);
}

module.exports = routerApi;

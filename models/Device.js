const mongoose = require("mongoose");

const DeviceSchema = mongoose.Schema(
  {
    serialNumber: {
      type: String,
      require: true,
      unique: true,
    },
    model: {
      type: String,
    },
    ownerId: {
      type: String,
      ref: "User",
    },
    zoneId: {
      type: String,
      ref: "Zone",
    },
    installedAt: {
      type: Date,
    },
    status: {
      type: String,
    },
    sensor1: {
      type: String,
      ref: "Sensor",
    },
    sensor2: {
      type: String,
      ref: "Sensor",
    },
  },
  {
    versionKey: false, // Oculta
  }
);

module.exports = mongoose.model("Devices", DeviceSchema);

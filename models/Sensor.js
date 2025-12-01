const mongoose = require("mongoose");

const SensorSchema = mongoose.Schema(
  {
    type: {
      type: String,
    },
    unit: {
      type: String,
    },
    model: {
      type: String,
    },
    location: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
  },
  {
    versionKey: false, // Oculta
  }
);

module.exports = mongoose.model("Sensors", SensorSchema);

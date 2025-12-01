const mongoose = require("mongoose");

const ZoneSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
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

module.exports = mongoose.model("Zones", ZoneSchema);

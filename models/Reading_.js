const mongoose = require("mongoose");

const ReadingSchema = mongoose.Schema(
  {
    sensorId: {
      type: String,
    },
    time: {
      type: Date,
    },
    value: {
      type: Number,
    },
  },
  {
    versionKey: false, // Oculta __v
  }
);

module.exports = mongoose.model("Reading", ReadingSchema);

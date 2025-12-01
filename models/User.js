const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  {
    versionKey: false, // Oculta
  }
);

module.exports = mongoose.model("Users", UserSchema);

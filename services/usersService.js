const User = require("../models/User");
const devices = require("../models/Device");

const allowkeys = ["name", "email", "password", "role"];
const allowRole = ["admin", "technician", "viewer"];

class usersService {
  constructor() {
    this.users = User;
  }

  async getAll() {
    try {
      const data = await User.find();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const data = await User.findById(id);
      if (!data) return { message: "User no encontrado" };
      return { message: "User Encontrado", data };
    } catch (error) {
      throw error;
    }
  }

  async post(data) {
    // Validar atributos obligatorios
    for (const key of allowkeys) {
      if (data[key] === undefined) {
        throw new Error(`Error, falta el atributo {${key}}`);
      }
    }

    // Validar atributos extra
    const extraKeys = Object.keys(data).filter(
      (key) => !allowkeys.includes(key)
    );
    if (extraKeys.length > 0) {
      throw new Error(`Error, existen atributos extras {${extraKeys}}`);
    }

    // Validar rol
    if (!allowRole.includes(data.role)) {
      throw new Error(
        `Error, el rol ingresado no es permitido. Roles permitidos: {${allowRole}}`
      );
    }

    // Crear usuario en DB
    const newUser = new User(data);
    await newUser.save();

    return newUser;
  }

  async update(id, data) {
    // Validar atributos extra
    const extraKeys = Object.keys(data).filter(
      (key) => !allowkeys.includes(key)
    );
    if (extraKeys.length > 0) {
      throw new Error(`Error, existen atributos extras {${extraKeys}}`);
    }

    // Validar rol
    if (data.role !== undefined && !allowRole.includes(data.role)) {
      throw new Error(
        `Error, el rol ingresado no es permitido. Roles permitidos: {${allowRole}}`
      );
    }

    //Encontrar los campos a actualizar
    const updateFields = {};
    for (const key of allowkeys) {
      if (data[key] !== undefined) {
        updateFields[key] = data[key];
      }
    }

    const updated = await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    if (!updated) throw new Error("User no encontrado");
    return updated;
  }

  async delete(id) {
    try {
      //Verificacion uso en devices
      const deviceUsandoSensor = await devices.findOne({ ownerId: id });
      if (deviceUsandoSensor) {
        throw new Error(
          `No se puede eliminar, el user se esta usando en device: ${deviceUsandoSensor._id}`
        );
      }

      //Eliminar
      const result = await User.findByIdAndDelete(id);
      if (!result) throw new Error("Error, User no encontrado");
      return { message: "User eliminado", result };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = usersService;

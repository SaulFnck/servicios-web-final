const Zone = require("../models/Zone");
const devices = require("../models/Device");

const allowKeys = ["name", "description", "isActive"];

class zoneService {
  constructor() {
    this.zones = Zone;
  }

  async getAll() {
    try {
      return await Zone.find();
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    const zone = await Zone.findById(id);
    if (!zone) throw new Error("Zona no encontrada");
    return zone;
  }

  async post(data) {
    // Validar obligatorios
    for (const key of allowKeys) {
      if (data[key] === undefined) {
        throw new Error(`Falta el atributo obligatorio: ${key}`);
      }
    }

    // Validar atributos extra
    const extraKeys = Object.keys(data).filter(
      (key) => !allowKeys.includes(key)
    );
    if (extraKeys.length > 0) {
      throw new Error(`Existen atributos no permitidos: ${extraKeys}`);
    }

    const newZone = new Zone(data);
    await newZone.save();
    return newZone;
  }

  async update(id, data) {
    // Validar atributos extra
    const extraKeys = Object.keys(data).filter(
      (key) => !allowKeys.includes(key)
    );
    if (extraKeys.length > 0) {
      throw new Error(`Existen atributos no permitidos: ${extraKeys}`);
    }

    //Cambiar estado a false si se esta usando.
    const deviceUsandoZone = await devices.findOne({ zoneId: id });
    if (deviceUsandoZone && data.isActive == false) {
      throw new Error(
        `Error, la zona se esta usando en device y no se puede cambiar su estado.`
      );
    }

    // Crear objeto $set dinámico
    const updateFields = {};
    for (const key of allowKeys) {
      if (data[key] !== undefined) {
        updateFields[key] = data[key];
      }
    }

    const updated = await Zone.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    if (!updated) throw new Error("Zona no encontrada");
    return updated;
  }

  async delete(id) {
    const deviceUsandoZone = await devices.findOne({ zoneId: id });
    if (deviceUsandoZone) {
      throw new Error(
        `Error, la zona se esta usando en device: ${deviceUsandoZone._id}`
      );
    }

    //Verificar estado desactivado (isActive: false )
    const zoneEncontrado = await Zone.findOne({ _id: id });
    if (zoneEncontrado.isActive == true)
      throw new Error("Error,La zone esta activa");

    //Eliminar
    const result = await Zone.findByIdAndDelete({ _id: id });
    if (!result) throw new Error("Error, Zona no encontrada");
    return { message: "Zona eliminada", result };
  }
}

module.exports = zoneService;

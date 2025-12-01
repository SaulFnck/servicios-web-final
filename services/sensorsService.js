const Sensor = require("../models/Sensor");
const devices = require("../models/Device");

const allowedKeys = ["type", "unit", "model", "location", "isActive"];

class sensorsService {
  constructor() {
    this.sensors = Sensor;
  }

  async getAll() {
    try {
      const data = await Sensor.find();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    const sensor = await Sensor.findById(id);
    if (!sensor) throw new Error("Sensor no encontrado");
    return sensor;
  }

  async post(data) {
    // Validar atributos obligatorios
    for (const key of allowedKeys) {
      if (data[key] === undefined) {
        throw new Error(`Error, falta el atributo {${key}}`);
      }
    }

    // Validar atributos extra
    const extraKeys = Object.keys(data).filter(
      (key) => !allowedKeys.includes(key)
    );
    if (extraKeys.length > 0) {
      throw new Error(`Error, existen atributos extras {${extraKeys}}`);
    }

    const newSensor = new Sensor(data);
    await newSensor.save();
    return newSensor;
  }

  async patch(id, data) {
    // Validar atributos extra
    const extraKeys = Object.keys(data).filter(
      (key) => !allowedKeys.includes(key)
    );
    if (extraKeys.length > 0) {
      throw new Error(`Error, existen atributos extras {${extraKeys}}`);
    }

    //Cambiar estado a false si se esta usando.
    const deviceUsandoSensor = await devices.findOne({ sensors: id });
    if (deviceUsandoSensor && data.isActive == false) {
      throw new Error(
        `Error, el sensor se esta usando en device y no se puede cambiar su estado.`
      );
    }

    const updated = await Sensor.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    if (!updated) throw new Error("Sensor no encontrado");
    return updated;
  }

  //Verificacion para no borrar en devices

  async delete(id) {
    //Verificacion uso en devices
    const deviceUsandoSensor = await devices.findOne({
      sensor1: id,
      sensor2: id,
    });
    if (deviceUsandoSensor) {
      throw new Error(
        `No se puede eliminar, el sensor se esta usando en device: ${deviceUsandoSensor._id}`
      );
    }

    //Verificar estado desactivado (isActive: false )
    const sensorEncontrado = await Sensor.findOne({ _id: id });
    if (sensorEncontrado.isActive == true)
      throw new Error("Error,El sensor esta activo");

    //Delete
    const deleted = await Sensor.findByIdAndDelete(id);
    if (!deleted) throw new Error("Error, Sensor no encontrado");
    return { message: "Sensor eliminado", deleted };
  }
}

module.exports = sensorsService;

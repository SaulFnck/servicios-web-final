const Reading = require("../models/Reading_");
const sensors = require("../models/Sensor");

// Llaves permitidas
const allowKeys = ["sensorId", "time", "value"];

class ReadingService {
  constructor() {
    this.readings = Reading;
  }

  async getAll() {
    try {
      const data = await Reading.find();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const data = await Reading.findOne({ _id: id });

      if (!data) {
        return { message: "Reading no encontrado", data: null };
      }

      return { message: "Reading encontrado", data };
    } catch (error) {
      throw error;
    }
  }

  async post(body) {
    try {
      //Validar atributos necesarios
      for (const key of allowKeys) {
        if (body[key] == undefined) {
          throw new Error(`Error, Faltan el atributo: {${key}}`);
        }
      }

      // Validar atributos extra
      const extraKeys = Object.keys(body).filter(
        (key) => !allowKeys.includes(key)
      );
      if (extraKeys.length > 0) {
        throw new Error(`Error, existen atributos extras {${extraKeys}}`);
      }

      // Validar el sensor existente
      const sensorExistente = await sensors.findOne({ _id: body.sensorId });
      if (!sensorExistente) {
        throw new Error("Error, el sensor no existe.");
      }

      const newReading = new Reading(body);
      await newReading.save();

      return { message: "Reading creado", data: newReading };
    } catch (error) {
      throw error;
    }
  }

  async patch(id, body) {
    try {
      // Validar llaves extra
      const extraKeys = Object.keys(body).filter(
        (key) => !allowKeys.includes(key)
      );
      if (extraKeys.length > 0) {
        throw new Error(`Error, existen atributos incorrectos {${extraKeys}}`);
      }

      // Validar sensor existente
      if ("sensorId" in body) {
        const sensorExistente = await sensors.findOne({ _id: body.sensorId });
        if (!sensorExistente) {
          throw new Error("Error, el sensor no existe.");
        }
      }

      const updated = await Reading.findOneAndUpdate(
        { _id: id },
        { $set: body },
        { new: true }
      );

      if (!updated) {
        return { message: "Reading no encontrado", data: null };
      }

      return { message: "Reading actualizado", data: updated };
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const deleted = await Reading.findOneAndDelete({ _id: id });

      if (!deleted) {
        return { message: "Reading no encontrado", data: null };
      }

      return { message: "Reading eliminado", data: deleted };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ReadingService;

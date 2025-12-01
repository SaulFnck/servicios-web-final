const Device = require("../models/Device");
const users = require("../models/User");
const zones = require("../models/Zone");
const sensors = require("../models/Sensor");

const allowKeys = [
  "serialNumber",
  "model",
  "ownerId",
  "zoneId",
  "installedAt",
  "status",
  "sensor1",
  "sensor2",
];

const allowStatus = ["active", "maintenance", "offline"];

class devicesService {
  constructor() {
    this.devices = Device;
  }

  async getAll() {
    try {
      const data = await Device.find();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const data = await Device.findOne({ _id: id });
      if (!data) {
        return { message: "Device no encontrado", data: null };
      }
      return { message: "Device encontrado", data };
    } catch (error) {
      throw error;
    }
  }

  async post(body) {
    try {
      //Validar llaves requeridas
      for (const key of allowKeys) {
        if (body[key] == undefined) {
          throw new Error(`Error, falta el atributo: ${key}`);
        }
      }

      // Validar llaves extra
      const extraKeys = Object.keys(body).filter(
        (key) => !allowKeys.includes(key)
      );
      if (extraKeys.length > 0) {
        throw new Error(`Error, existen atributos extras {${extraKeys}}`);
      }

      // Validar status
      if (body.status && !allowStatus.includes(body.status)) {
        throw new Error(
          `Error, el status no es permitido. Permitidos: {${allowStatus}}`
        );
      }

      //Validar userId
      const userExistente = await users.findOne({ _id: body.ownerId });
      if (!userExistente) throw new Error(`Error, el ownerId(user) no existe.`);

      //Validar zoneId y estado
      const zoneExistente = await zones.findOne({ _id: body.zoneId });
      if (!zoneExistente) {
        throw new Error(`Error, la zona no existe.`);
      }
      if (zoneExistente.isActive == false) {
        throw new Error(`Error, la zona esta desactivada.`);
      }

      //Validar sensor1
      const sensor1Existente = await sensors.findOne({ _id: body.sensor1 });
      if (!sensor1Existente) {
        throw new Error(`Error, el sensor1 no existe.`);
      }
      if (sensor1Existente.isActive == false) {
        throw new Error(`Error, la sensor1 esta desactivado.`);
      }

      //validar sensor2
      const sensor2Existente = await sensors.findOne({ _id: body.sensor2 });
      if (!sensor2Existente) {
        throw new Error(`Error, el sensor2 no existe.`);
      }
      if (sensor2Existente.isActive == false) {
        throw new Error(`Error, la sensor2 esta desactivado.`);
      }

      const newDevice = new Device(body);
      await newDevice.save();

      return { message: "Device creado", data: newDevice };
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
        throw new Error(`Error, existen atributos extras {${extraKeys}}`);
      }

      // Validar status
      if (body.status && !allowStatus.includes(body.status)) {
        throw new Error(
          `Error, el status no es permitido. Permitidos: {${allowStatus}}`
        );
      }

      //Validar userId
      if ("ownerId" in body) {
        const userExistente = await users.findOne({ _id: body.ownerId });
        if (!userExistente)
          throw new Error(`Error, el ownerId(user) no existe.`);
      }

      //Validar zoneId y estado
      if ("zoneId" in body) {
        const zoneExistente = await zones.findOne({ _id: body.zoneId });
        if (!zoneExistente) {
          throw new Error(`Error, la zona no existe.`);
        }
        if (zoneExistente.isActive == false) {
          throw new Error(`Error, la zona esta desactivada.`);
        }
      }

      //Validar sensor 1 y estado
      if ("sensor1" in body) {
        const sensor1Existente = await sensors.findOne({ _id: body.sensor1 });
        if (!sensor1Existente) {
          throw new Error(`Error, el sensor1 no existe.`);
        }
        if (sensor1Existente.isActive == false) {
          throw new Error(`Error, la sensor1 esta desactivado.`);
        }
      }

      //Validar sensor 2 y estado
      if ("sensor2" in body) {
        const sensor2Existente = await sensors.findOne({ _id: body.sensor2 });
        if (!sensor2Existente) {
          throw new Error(`Error, el sensor2 no existe.`);
        }
        if (sensor2Existente.isActive == false) {
          throw new Error(`Error, la sensor2 esta desactivado.`);
        }
      }

      const updated = await Device.findOneAndUpdate(
        { _id: id },
        { $set: body },
        { new: true }
      );

      if (!updated) {
        return { message: "Id del device incorrecto", data: null };
      }

      return { message: "Device actualizado", data: updated };
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const deleted = await Device.findOneAndDelete({ _id: id });

      if (!deleted) {
        return { message: "Device no encontrado", data: null };
      }

      return { message: "Device eliminado", data: deleted };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = devicesService;

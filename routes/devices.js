const express = require("express");
const router = express.Router();

const deviceService = require("../services/devicesService");
const service = new deviceService();

/**
 * @swagger
 * /api/devices:
 *   get:
 *     tags:
 *       - Devices
 *     responses:
 *       200:
 *         description: Lista de dispositivos
 */
router.get("/", async (req, res) => {
  const respuesta = await service.getAll();
  res.status(200).json(respuesta);
});

/**
 * @swagger
 * /api/devices/{id}:
 *   get:
 *     tags:
 *       - Devices
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Dispositivo encontrado
 */
router.get("/:id", async (req, res) => {
  try {
    const respuesta = await service.getById(req.params.id);
    res.status(200).json(respuesta);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/devices:
 *   post:
 *     tags:
 *       - Devices
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serialNumber:
 *                 type: string
 *               model:
 *                 type: string
 *               ownerId:
 *                 type: string
 *               zoneId:
 *                 type: string
 *               installedAt:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *               sensor1:
 *                 type: string
 *               sensor2:
 *                 type: string
 *     responses:
 *       201:
 *         description: Dispositivo creado
 */

router.post("/", async (req, res) => {
  try {
    const respuesta = await service.post(req.body);
    res.status(201).json(respuesta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/devices/{id}:
 *   patch:
 *     tags:
 *       - Devices
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serialNumber:
 *                 type: string
 *               model:
 *                 type: string
 *               ownerId:
 *                 type: string
 *               zoneId:
 *                 type: string
 *               installedAt:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *               sensor1:
 *                 type: string
 *               sensor2:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dispositivo actualizado
 */
router.patch("/:id", async (req, res) => {
  try {
    const respuesta = await service.patch(req.params.id, req.body);
    res.status(200).json(respuesta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/devices/{id}:
 *   delete:
 *     tags:
 *       - Devices
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Dispositivo eliminado
 */
router.delete("/:id", async (req, res) => {
  try {
    const respuesta = await service.delete(req.params.id);
    res.status(200).json(respuesta);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;

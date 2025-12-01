const express = require("express");
const router = express.Router();

const sensorsService = require("../services/sensorsService");
const service = new sensorsService();

/**
 * @swagger
 * /api/sensors:
 *   get:
 *     tags:
 *       - Sensors
 *     responses:
 *       200:
 *         description: Lista de sensores
 */
router.get("/", async (req, res) => {
  const data = await service.getAll();
  res.status(200).json(data);
});

/**
 * @swagger
 * /api/sensors/{id}:
 *   get:
 *     tags:
 *       - Sensors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sensor encontrado
 */
router.get("/:id", async (req, res) => {
  try {
    const data = await service.getById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/sensors:
 *   post:
 *     tags:
 *       - Sensors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               unit:
 *                 type: string
 *               model:
 *                 type: string
 *               location:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Sensor creado
 */
router.post("/", async (req, res) => {
  try {
    const data = await service.post(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/sensors/{id}:
 *   patch:
 *     tags:
 *       - Sensors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               unit:
 *                 type: string
 *               model:
 *                 type: string
 *               location:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Sensor actualizado
 */
router.patch("/:id", async (req, res) => {
  try {
    const data = await service.patch(req.params.id, req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/sensors/{id}:
 *   delete:
 *     tags:
 *       - Sensors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sensor eliminado
 */
router.delete("/:id", async (req, res) => {
  try {
    const data = await service.delete(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

const ReadingService = require("../services/readingsService");
const service = new ReadingService();

/**
 * @swagger
 * /api/readings:
 *   get:
 *     tags:
 *       - Readings
 *     responses:
 *       200:
 *         description: Lista de lecturas registradas
 */
router.get("/", async (req, res) => {
  const respuesta = await service.getAll();
  res.status(200).json(respuesta);
});

/**
 * @swagger
 * /api/readings/{id}:
 *   get:
 *     tags:
 *       - Readings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lectura encontrada
 */
router.get("/:id", async (req, res) => {
  const respuesta = await service.getById(req.params.id);
  res.status(200).json(respuesta);
});

/**
 * @swagger
 * /api/readings:
 *   post:
 *     tags:
 *       - Readings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sensorId:
 *                 type: string
 *               time:
 *                 type: string
 *                 format: date-time
 *               value:
 *                 type: number
 *     responses:
 *       200:
 *         description: Lectura creada
 */
router.post("/", async (req, res) => {
  try {
    const respuesta = await service.post(req.body);
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/readings/{id}:
 *   patch:
 *     tags:
 *       - Readings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sensorId:
 *                 type: string
 *               time:
 *                 type: string
 *                 format: date-time
 *               value:
 *                 type: number
 *     responses:
 *       200:
 *         description: Lectura actualizada
 */
router.patch("/:id", async (req, res) => {
  try {
    const respuesta = await service.patch(req.params.id, req.body);
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/readings/{id}:
 *   delete:
 *     tags:
 *       - Readings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lectura eliminada
 */
router.delete("/:id", async (req, res) => {
  const respuesta = await service.delete(req.params.id);
  res.status(200).json(respuesta);
});

module.exports = router;

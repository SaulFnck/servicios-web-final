const express = require("express");
const router = express.Router();

const ZoneService = require("../services/zonesService");
const service = new ZoneService();

/**
 * @swagger
 * /api/zones:
 *   get:
 *     summary: Obtener todas las zonas
 *     tags:
 *       - Zones
 *     responses:
 *       200:
 *         description: Lista de zonas registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   isActive:
 *                     type: boolean
 */
router.get("/", async (req, res) => {
  try {
    const zonas = await service.getAll();
    res.json(zonas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/zones/{id}:
 *   get:
 *     summary: Obtener una zona por ID
 *     tags:
 *       - Zones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la zona
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Zona encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 isActive:
 *                   type: boolean
 *       404:
 *         description: Zona no encontrada
 */
router.get("/:id", async (req, res) => {
  try {
    const zona = await service.getById(req.params.id);
    res.json(zona);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/zones:
 *   post:
 *     summary: Crear una nueva zona
 *     tags:
 *       - Zones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Zona creada correctamente
 */
router.post("/", async (req, res) => {
  try {
    const newZone = await service.post(req.body);
    res.status(201).json(newZone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/zones/{id}:
 *   patch:
 *     summary: Actualizar una zona por ID
 *     tags:
 *       - Zones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la zona
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Zona actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Zona no encontrada
 */
router.patch("/:id", async (req, res) => {
  try {
    const updatedZone = await service.update(req.params.id, req.body);
    res.json(updatedZone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/zones/{id}:
 *   delete:
 *     summary: Eliminar una zona por ID
 *     tags:
 *       - Zones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la zona a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Zona eliminada correctamente
 *       404:
 *         description: Zona no encontrada
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await service.delete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;

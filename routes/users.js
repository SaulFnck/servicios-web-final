const express = require("express");
const router = express.Router();

const userService = require("../services/usersService");
const service = new userService();

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Obtiene una lista de usuarios
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: Lista de usuarios
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  name:
 *                    type: string
 *                  username:
 *                    type: string
 *                  password:
 *                    type: string
 */
router.get("/", async (req, res) => {
  const respuesta = await service.getAll();
  res.status(200).json(respuesta);
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 */
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const respuesta = await service.getById({ _id: id });
  res.status(200).json(respuesta);
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags:
 *      - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario Creado
 */
router.post("/", async (req, res) => {
  const data = req.body;
  const newUser = await service.post(data);
  res.status(201).json(newUser);
});

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Actualiza un usuario por ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *           example:
 *             name: "Juan Pérez"
 *             email: "juan@example.com"
 *             password: "123456"
 *             role: "admin"
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Datos inválidos enviados
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const userUpdated = await service.update({ _id: id }, data);
  res.status(200).json(userUpdated);
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: usuario Eliminado
 */
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const respuesta = await service.delete({ _id: id });
  res.status(200).json(respuesta);
});

module.exports = router;

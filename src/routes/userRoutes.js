/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Операции с пользователями
 * /api/users:
 *   get:
 *     summary: Получить всех пользователей
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Успешный ответ
 *       500:
 *         description: Ошибка сервера
 * /api/users/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешный ответ
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка сервера
 *   put:
 *     summary: Обновить пользователя
 *     description: id пользователя указывается в url , обновляет email,firstName,lastName
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешный ответ
 *       400:
 *         description: Неверный запрос
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка сервера
 */



const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../config/multer');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', upload.single('profilePhoto'), userController.updateUser);

module.exports = router;

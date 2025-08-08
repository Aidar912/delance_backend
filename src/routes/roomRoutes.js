/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Операции с комнатами чата
 * /api/rooms/{userId}:
 *   get:
 *     summary: Получить список комнат, в которых присутствует определенный пользователь
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Идентификатор пользователя
 *     responses:
 *       200:
 *         description: Успешный ответ
 *       404:
 *         description: Не найдены комнаты для указанного пользователя
 *       500:
 *         description: Ошибка сервера
 /api/rooms:
 *   post:
 *     summary: Создать комнату между двумя пользователями
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId1:
 *                 type: integer
 *                 description: Идентификатор первого пользователя
 *               userId2:
 *                 type: integer
 *                 description: Идентификатор второго пользователя
 *             required:
 *               - userId1
 *               - userId2
 *     responses:
 *       201:
 *         description: Комната успешно создана
 *       400:
 *         description: Неверный запрос
 *       500:
 *         description: Ошибка сервера
 */


const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Эндпоинт для получения списка комнат, в которых есть определенный пользователь
router.get('/:userId', roomController.getRoomsByUserId);
router.post('/', roomController.createRoom);
router.get('/:roomId/messages', roomController.getAllMessagesByRoomId);
router.post('/messages', roomController.createMessage);

module.exports = router;

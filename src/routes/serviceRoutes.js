/**
 * @swagger
 * tags:
 *   name: Service
 *   description: Операции с услугами
 * /api/services:
 *   post:
 *     summary: Создать услугу
 *     tags: [Service]
 *     description: title , description , minprice(от ),maxprice(до),duration,status,seller(id),category(id),files(список файлов)
 *     responses:
 *       200:
 *         description: Успешное создание услуги
 *
 *       400:
 *         description: Ошибка валидации или переданы некорректные данные
 *       500:
 *         description: Ошибка сервера
 *
 *   get:
 *      summary: Получить все услуги
 *      tags: [Service]
 *      responses:
 *        200:
 *          description: Успешный ответ
 *        500:
 *          description : Ошибка сервера
 * /api/services/{id}:
 *   get:
 *     summary: Получить услугу по ID
 *     tags: [Service]
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
 *         description: Заказ не найден
 *       500:
 *         description: Ошибка сервера
 *   put:
 *     summary: Обновить услугу
 *     tags: [Service]
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
 *         description: Заказ не найден
 *       500:
 *         description: Ошибка сервера
 *   delete:
 *     summary: Удалить услугу
 *     tags: [Service]
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
 *         description: Заказ не найден
 *       500:
 *         description: Ошибка сервера

 */



const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.post('/',serviceController.createService);
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;

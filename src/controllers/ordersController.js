const Order = require('../models/orderModel');
const File = require('../models/fileModel');
const fs = require('fs');
const util = require('util');
const sequelize = require("../db/db");
const Category = require("../models/CategoryModel");
const User = require("../models/userModel");
const unlinkAsync = util.promisify(fs.unlink);

async function createOrder(req, res) {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        const orderData = {
            ...req.body,
            orderImageUrl: req.files.orderImage ? req.files.orderImage[0].path : null
        };
        const order = await Order.create(orderData, {transaction});

        if (req.files.files && req.files.files.length > 0) {
            const filesData = req.files.files.map(file => ({
                orderId: order.id, // связываем файлы с только что созданным заказом
                name: file.originalname,
                path: file.path,
                type: file.mimetype
            }));
            await File.bulkCreate(filesData, {transaction});
        }

        // Фиксация транзакции
        await transaction.commit();

        // Отправка ответа клиенту
        res.status(201).json(order);
    } catch (error) {
        // Откат транзакции в случае ошибки
        if (transaction) await transaction.rollback();
        console.error('Ошибка при создании заказа:', error);
        res.status(400).json({message: 'Ошибка при создании заказа', error: error.message});
    }
}

async function updateOrder(req, res) {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        const order = await Order.findByPk(req.params.id, {transaction});
        if (!order) {
            await transaction.rollback();
            return res.status(404).send('Order not found');
        }

        const updateData = {
            ...req.body,
            orderImageUrl: req.files && req.files.orderImage ? req.files.orderImage[0].path : order.orderImageUrl
        };

        await order.update(updateData, {transaction});

        if (req.files && req.files.otherFiles && req.files.otherFiles.length > 0) {
            const files = req.files.otherFiles.map(file => ({
                name: file.originalname,
                path: file.path,
                type: file.mimetype,
                orderId: order.id
            }));
            await File.bulkCreate(files, {transaction});
        }

        await transaction.commit();
        res.status(200).send(order);
    } catch (error) {
        if (transaction) await transaction.rollback();
        res.status(400).send(error);
    }
}


// Get all orders
async function getAllOrders(req, res) {
    try {
        const orders = await Order.findAll({
            include: [{
                model: File,
                as: 'files'
            }, {
                model: Category,
                as: 'category'
            },
                {model:User,
                as: 'client'}]
        });
        res.status(200).send(orders);
    } catch (error) {
        res.status(400).send(error);
    }
}


// Get a single order by ID
async function getOrderById(req, res) {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [{
                model: File,
                as: 'files'
            }, {
                model: Category,
                as: 'category'
            },
                {model:User,
                    as: 'client'}]
        });
        if (order) {
            res.status(200).send(order);
        } else {
            res.status(404).send({message: 'Order not found'});
        }
    } catch (error) {
        res.status(400).send(error);
    }
}


// Delete an order
async function deleteOrder(req, res) {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [File]
        });
        if (order) {
            if (order.Files && order.Files.length > 0) {
                for (const file of order.Files) {
                    try {
                        await unlinkAsync(file.path);
                        await file.destroy();
                    } catch (fsError) {
                        console.error(`Error deleting file ${file.path}: ${fsError}`);
                    }
                }
            }
            await order.destroy();
            res.status(204).send({message: 'Order and associated files deleted'});
        } else {
            res.status(404).send({message: 'Order not found'});
        }
    } catch (error) {
        res.status(400).send(error);
    }
}


module.exports = {
    createOrder,
    updateOrder,
    getAllOrders,
    getOrderById,
    deleteOrder
};
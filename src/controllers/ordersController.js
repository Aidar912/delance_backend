const { Order } = require('../models/orderModel');

// Create a new order
async function createOrder(req, res) {
    try {
        const order = await Order.create(req.body);
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
}

// Get all orders
async function getAllOrders(req, res) {
    try {
        const orders = await Order.findAll();
        res.status(200).send(orders);
    } catch (error) {
        res.status(400).send(error);
    }
}

// Get a single order by ID
async function getOrderById(req, res) {
    try {
        const order = await Order.findByPk(req.params.id);
        if (order) {
            res.status(200).send(order);
        } else {
            res.status(404).send({message: 'Order not found'});
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

// Update an order
async function updateOrder(req, res) {
    try {
        const order = await Order.findByPk(req.params.id);
        if (order) {
            await order.update(req.body);
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
        const order = await Order.findByPk(req.params.id);
        if (order) {
            await order.destroy();
            res.status(204).send({message: 'Order deleted'});
        } else {
            res.status(404).send({message: 'Order not found'});
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};

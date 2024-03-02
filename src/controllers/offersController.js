const Offers = require('../models/offersModel');
const File = require('../models/fileModel');
const User = require('../models/userModel');
const fs = require('fs');
const util = require('util');
const sequelize = require("../db/db");
const unlinkAsync = util.promisify(fs.unlink);

async function createOffer (req, res){
    let transaction;
    try {
        transaction = await sequelize.transaction();

        const order = await Offers.create(req.body, { transaction });

        if (req.files && req.files.length > 0) {
            const files = req.files.map(file => ({
                name: file.originalname,
                path: file.path,
                type: file.mimetype
            }));
            await File.bulkCreate(files, { transaction });
        }

        await transaction.commit();
        res.status(201).send(order);
    } catch (error) {
        if (transaction) await transaction.rollback();
        res.status(400).send(error);
    }
}

// Контроллер для обновления заказа
async function updateOffer (req, res) {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        const offer = await Offers.findByPk(req.params.id, {transaction});
        if (!offer) {
            await transaction.rollback();
            return res.status(404).send('Order not found');
        }

        await offer.update(req.body, {transaction});

        if (req.files && req.files.length > 0) {
            const files = req.files.map(file => ({
                name: file.originalname,
                path: file.path,
                type: file.mimetype
            }));
            await File.bulkCreate(files, {transaction});
        }

        await transaction.commit();
        res.status(200).send(offer);
    } catch (error) {
        if (transaction) await transaction.rollback();
        res.status(400).send(error);
    }
}

// Get all orders
async function getAllOffers(req, res) {
    try {
        const offer = await Offers.findAll({
            include: [{
                model:File,
                as:'files'
            }]
        });
        res.status(200).send(offer);
    } catch (error) {
        res.status(400).send(error);
    }
}


// Get a single order by ID
async function getOffersById(req, res) {
    try {
        const offer = await Offers.findByPk(req.params.id, {
            include: [
                {
                    model:File,
                    as : 'files'
                }
            ]
        });
        if (offer) {
            res.status(200).send(offer);
        } else {
            res.status(404).send({ message: 'Offer not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
}



// Delete an order
async function deleteOffers(req, res) {
    try {
        const offer = await Offers.findByPk(req.params.id, {
            include: [
                {
                    model:File,
                    as : 'files'
                }
            ]
        });
        if (offer) {
            if (offer.Files && offer.Files.length > 0) {
                for (const file of offer.Files) {
                    try {
                        await unlinkAsync(file.path);
                        await file.destroy();
                    } catch (fsError) {
                        console.error(`Error deleting file ${file.path}: ${fsError}`);
                    }
                }
            }
            await offer.destroy();
            res.status(204).send({ message: 'Order and associated files deleted' });
        } else {
            res.status(404).send({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

async function listOffersForOrder  (req, res)  {
    try {
        const { orderId } = req.params;

        const offers = await Offers.findAll({
            where: { orderId: orderId },
            include: [
                { model: User, as: 'freelance' },
                { model: File, as: 'files' }
            ]
        });

        res.json(offers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving offers.' });
    }
}


module.exports = {
    createOffer,
    updateOffer,
    getAllOffers,
    getOffersById,
    deleteOffers,
    listOffersForOrder
};
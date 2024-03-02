const Service = require('../models/serviceModel')
const File = require("../models/fileModel");
const fs = require('fs');
const util = require('util');
const sequelize = require("../db/db");
const unlinkAsync = util.promisify(fs.unlink);


async function createService(req, res) {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        const serviceImageData = req.files.serviceImage ? req.files.serviceImage[0] : null;

        const serviceData = {
            ...req.body,
            serviceImageUrl: serviceImageData ? serviceImageData.path : null
        };

        const service = await Service.create(serviceData, { transaction });

        if (req.files.otherFiles && req.files.otherFiles.length > 0) {
            const files = req.files.otherFiles.map(file => ({
                name: file.originalname,
                path: file.path,
                type: file.mimetype,
                serviceId: service.id
            }));
            await File.bulkCreate(files, { transaction });
        }

        await transaction.commit();
        res.status(201).send(service);
    } catch (error) {
        if (transaction) await transaction.rollback();
        res.status(400).send(error);
    }
}


async function getAllServices(req, res) {
    try {
        const services = await Service.findAll({
            include: [{
                model:File,
                as:'files'
            }]
        });
        res.status(200).send(services);
    } catch (error) {
        res.status(400).send(error);
    }
}


// Get a single order by ID
async function getServiceById(req, res) {
    try {
        const service = await Service.findByPk(req.params.id, {
            include: [{
                model:File,
                as:'files'
            }]
        });
        if (service) {
            res.status(200).send(service);
        } else {
            res.status(404).send({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

async function updateService(req, res) {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        const service = await Service.findByPk(req.params.id, { transaction });
        if (!service) {
            await transaction.rollback();
            return res.status(404).send('Service not found');
        }

        const updateData = {
            ...req.body,
            serviceImageUrl: req.files && req.files.serviceImage ? req.files.serviceImage[0].path : service.serviceImageUrl
        };

        await service.update(updateData, { transaction });

        if (req.files && req.files.otherFiles && req.files.otherFiles.length > 0) {
            const files = req.files.otherFiles.map(file => ({
                name: file.originalname,
                path: file.path,
                type: file.mimetype,
                serviceId: service.id
            }));
            await File.bulkCreate(files, { transaction });
        }

        await transaction.commit();
        res.status(200).send(service);
    } catch (error) {
        if (transaction) await transaction.rollback();
        res.status(400).send(error);
    }
}


// Удаление услуги
async function deleteService(req, res) {
    try {
        const service = await Service.findByPk(req.params.id, {
            include: [File]
        });
        if (service) {
            if (service.Files && service.Files.length > 0) {
                for (const file of service.Files) {
                    try {
                        await unlinkAsync(file.path);
                        await file.destroy();
                    } catch (fsError) {
                        console.error(`Error deleting file ${file.path}: ${fsError}`);
                    }
                }
            }
            await service.destroy();
            res.status(204).send({ message: 'Service and associated files deleted' });
        } else {
            res.status(404).send({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

// Экспорт функций
module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
};
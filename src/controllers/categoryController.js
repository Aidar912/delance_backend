const Category = require('../models/CategoryModel');

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).send(category);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).send(categories);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            res.status(200).send(category);
        } else {
            res.status(404).send({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            await category.update(req.body);
            res.status(200).send(category);
        } else {
            res.status(404).send({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            await category.destroy();
            res.status(204).send({ message: 'Category deleted' });
        } else {
            res.status(404).send({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

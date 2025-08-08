const Review  = require('../models/reviewModel');
const sequelize = require("../db/db");
const User = require("../models/userModel");


function createReview(req, res) {
    Review.create(req.body)
        .then(review => res.status(201).json(review))
        .catch(error => res.status(400).json({ message: error.message }));
}

function getAllReviews(req, res) {
    Review.findAll()
        .then(reviews => res.status(200).json(reviews))
        .catch(error => res.status(500).json({ message: error.message }));
}

function getReviewById(req, res) {
    Review.findByPk(req.params.id)
        .then(review => {
            if (review) {
                res.status(200).json(review);
            } else {
                res.status(404).json({ message: 'Review not found' });
            }
        })
        .catch(error => res.status(500).json({ message: error.message }));
}

function updateReview(req, res) {
    Review.findByPk(req.params.id)
        .then(review => {
            if (review) {
                review.update(req.body)
                    .then(updatedReview => res.status(200).json(updatedReview))
                    .catch(error => res.status(400).json({ message: error.message }));
            } else {
                res.status(404).json({ message: 'Review not found' });
            }
        })
        .catch(error => res.status(500).json({ message: error.message }));
}

function deleteReview(req, res) {
    Review.findByPk(req.params.id)
        .then(review => {
            if (review) {
                review.destroy()
                    .then(() => res.status(200).json({ message: 'Review deleted' }))
                    .catch(error => res.status(400).json({ message: error.message }));
            } else {
                res.status(404).json({ message: 'Review not found' });
            }
        })
        .catch(error => res.status(500).json({ message: error.message }));
}

async function getUserAverageRating (req, res) {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId, {
            include: [{
                model: Review,
                as: 'reviews',
                attributes: [] // Не возвращаем атрибуты самих отзывов
            }],
            attributes: [
                [sequelize.fn('AVG', sequelize.col('reviews.rating')), 'averageRating']
            ],
            group: ['User.id'] // Группировка необходима для корректного вычисления среднего значения
        });

        if (user) {
            res.json({ userId: user.id, averageRating: user.dataValues.averageRating || 0 });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user average rating:', error);
        res.status(500).send('Internal server error');
    }
}

// Получение списка средних рейтингов всех пользователей
async function getAllUsersAverageRatings (req, res) {
    try {
        const users = await User.findAll({
            include: [{
                model: Review,
                as: 'reviews',
                attributes: []
            }],
            attributes: [
                'id',
                [sequelize.cast(sequelize.fn('AVG', sequelize.col('reviews.rating')), 'float'), 'averageRating']
            ],

            group: ['User.id']
        });

        const usersAverageRatings = users.map(user => ({
            userId: user.id,
            averageRating: user.dataValues.averageRating || 0
        }));

        res.json(usersAverageRatings);
    } catch (error) {
        console.error('Error fetching all users average ratings:', error);
        res.status(500).send('Internal server error');
    }
}

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
    getAllUsersAverageRatings,
    getUserAverageRating
};

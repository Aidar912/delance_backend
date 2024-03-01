const { Review } = require('../models/reviewModel');

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

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
};

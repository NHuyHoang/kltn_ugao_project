'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _models = require('../models');

var _products = require('./products.service');

var _products2 = _interopRequireDefault(_products);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    findOne: function findOne(id) {
        return _findOne(id);
    },
    findCustomerByReviewId: function findCustomerByReviewId(reviewId) {
        return _products2.default.findProductByReviewId(reviewId).catch(function (err) {
            return err;
        }).then(function (product) {
            var resultReview = void 0;
            if (product.reviews === null || product.reviews.length === 0) return [];
            product.reviews.forEach(function (review) {
                if (review._id.toString() === reviewId.toString()) {
                    resultReview = review;
                    return;
                }
            });
            return _models.Customers.findOne({ _id: resultReview.customerId });
        });
    }
};


var _findOne = function _findOne(id) {
    return _models.Reviews.findOne({ _id: id });
};
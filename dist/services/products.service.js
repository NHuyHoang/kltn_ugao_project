'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    findOne: function findOne(id) {
        return _findOne(id);
    },
    findAll: function findAll() {
        return _findAll();
    },
    findMany: function findMany(ids) {
        return _findMany(ids);
    },
    findByInvoiceId: function findByInvoiceId(invoice_id) {
        return _models.Invoices.findOne(invoice_id).catch(function (err) {
            return err;
        }).then(function (invoice) {
            if (invoice.productId.length === 0) return [];
            return _findMany(invoice.productId);
        });
    },
    findProductByReviewId: function findProductByReviewId(reviewId) {
        return _models.Products.findOne({ reviews: { $elemMatch: { _id: reviewId } } });
    }

};


var _findOne = function _findOne(id) {
    return _models.Products.findOne({ _id: id });
};

var _findAll = function _findAll(id) {
    return _models.Products.find();
};

var _findMany = function _findMany(ids) {
    return _models.Products.find({ _id: { $in: ids } });
};
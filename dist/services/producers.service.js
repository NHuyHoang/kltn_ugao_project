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
    findAll: function findAll() {
        return _models.Producers.find();
    },
    findMany: function findMany(ids) {
        return _models.Producers.find({
            _id: { $in: ids }
        });
    },
    findProducts: function findProducts(id) {
        return _findOne(id).catch(function (err) {
            return err;
        }).then(function (producer) {
            if (producer.productId === null || producer.productId.length === 0) return [];
            return _products2.default.findMany(producer.productId);
        });
    },
    findByProductId: function findByProductId(pid) {
        return _models.Producers.findOne({ productId: pid });
    }
};


var _findOne = function _findOne(id) {
    return _models.Producers.findOne({ _id: id });
};
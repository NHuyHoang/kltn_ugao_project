'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _models = require('../models');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    findAll: function findAll() {
        return _models.Invoices.find({});
    },
    findMany: function findMany(ids) {
        return _findMany(ids);
    },
    findOne: function findOne(id) {
        return _findOne(id);
    },
    findUserInvoices: function findUserInvoices(userId, modelName) {
        var model = void 0;
        if (modelName === 'Customers') model = _models.Customers;else model = _models.Shippers;
        return model.findOne({ _id: userId }).catch(function (err) {
            return err;
        }).then(function (user) {
            var invoicesCount = user.invoiceId.length;
            return _findMany(user.invoiceId);
        });
    }
};


var _findOne = function _findOne(id) {
    return _models.Invoices.findOne({ _id: id });s;
};

var _findMany = function _findMany(ids) {
    if (ids.length === 0) return [];
    return _models.Invoices.find({ _id: { $in: ids } });
};
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
    },
    insertOne: function insertOne(invoice, customer_id, store_id) {
        return _models.Invoices.create(invoice).then(function (result) {
            var storePromise = _models.Stores.update({ _id: store_id }, { $push: { invoiceId: result._id } });
            var customerPromise = _models.Customers.update({ _id: customer_id }, { $push: { invoiceId: result._id } });
            return Promise.all([storePromise, customerPromise]).then(function (value) {
                return { _id: result._id };
            });
        });
    }
};


var _findOne = function _findOne(id) {
    return _models.Invoices.findOne({ _id: id });
};

var _findMany = function _findMany(ids) {
    if (ids.length === 0) return [];
    return _models.Invoices.find({ _id: { $in: ids } });
};
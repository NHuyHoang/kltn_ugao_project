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
    findAll: function findAll(id) {
        return _models.Shippers.find();
    },
    findMany: function findMany(ids) {
        return _models.Shippers.find({ _id: { $in: ids } });
    },
    findShipperByInvoiceId: function findShipperByInvoiceId(invoice_Id) {
        return _models.Shippers.findOne({ invoiceId: invoice_Id });
    }
};


var _findOne = function _findOne(id) {
    return _models.Shippers.findOne({ _id: id });
};
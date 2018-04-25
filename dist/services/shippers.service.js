'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _models = require('../models');

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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
    },
    findByEmailPass: function findByEmailPass(email, pass) {
        return _models.Shippers.findOne({ email: email }).lean().then(function (shipper) {
            return _bcryptjs2.default.compare(pass, shipper.pass).then(function (res) {
                if (res) return _lodash2.default.omit(shipper, ['pass']);else return null;
            });
        }).catch(function (err) {
            return console.log(err);
        });
    }
};


var _findOne = function _findOne(id) {
    return _models.Shippers.findOne({ _id: id });
};
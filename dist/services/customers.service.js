'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _models = require('../models');

var _invoices = require('./invoices.service');

var _invoices2 = _interopRequireDefault(_invoices);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    findAll: function findAll() {
        return _models.Customers.find({});
    },
    findOne: function findOne(id) {
        return _models.Customers.findOne({ _id: id });
    },
    findByEmailPass: function findByEmailPass(email, pass) {
        return _models.Customers.findOne({ email: email }).lean().then(function (customer) {
            return _bcryptjs2.default.compare(pass, customer.pass).then(function (res) {
                if (res) return _lodash2.default.omit(customer, ['pass']);else return null;
            });
        }).catch(function (err) {
            return console.log(err);
        });
    },
    findCustomerByInvoiceId: function findCustomerByInvoiceId(invoice_Id) {
        return _models.Customers.findOne({ invoiceId: invoice_Id });
    },
    insert: function insert(obj) {
        if (obj.pass) obj.pass = _bcryptjs2.default.hashSync(obj.pass, 10);
        var customer = new _models.Customers(obj);
        return customer.save();
    },
    update: function update(obj) {
        return new Promise(function (resolve, reject) {
            if (!obj._id) reject("id is required for update");
            return _models.Customers.findOneAndUpdate({ _id: obj._id }, _lodash2.default.omit(obj, ['_id'])).then(function (data) {
                return resolve({ success: true });
            }).catch(function (err) {
                return reject({ success: false });
            });
        });
    },
    remove: function remove(id) {
        return _models.Customers.findByIdAndRemove({ _id: id });
    }
};
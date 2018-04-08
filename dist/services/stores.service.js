'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

var _services = require('../services');

exports.default = {
    findOne: function findOne(id) {
        return _findOne(id);
    },
    findAll: function findAll() {
        return _models.Stores.find();
    },
    findInvoices: function findInvoices(id) {
        return _findOne(id).then(function (store) {
            return _services.invoicesService.findMany(store.invoiceId);
        });
    },
    findShippers: function findShippers(id) {
        return _findOne(id).then(function (store) {
            return _services.shippersService.findMany(store.shipperId);
        });
    },
    findByInvoiceId: function findByInvoiceId(id) {
        return _models.Stores.findOne({ invoiceId: id });
    },
    findProduct: function findProduct(id) {
        return _findOne(id).then(function (store) {
            if (store.storage.length === 0) return [];
            var promiseArr = [];
            store.storage.forEach(function (item) {
                promiseArr.push(_services.productsService.findOne(item.productId));
            });
            return Promise.all(promiseArr).then(function (values) {
                var result = [];
                values.forEach(function (value, i) {
                    var resultItem = {
                        product: Object.assign({}, value._doc),
                        amount: store.storage[i].amount,
                        receipt_date: store.storage[i].receipt_date
                    };
                    result.push(resultItem);
                });
                return result;
            });
        });
    }
};


var _findOne = function _findOne(id) {
    return _models.Stores.findOne({ _id: id });
};
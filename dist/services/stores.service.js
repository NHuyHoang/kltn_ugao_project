'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

var _services = require('../services');

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    findowners: function findowners(id) {
        return _findOne(id).then(function (store) {
            return _services.ownersService.findMany(store.ownerId);
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
    },
    findOwner: function findOwner(email, pass) {
        return _models.Stores.findOne({ "owner.email": email }).lean().then(function (store) {
            return store.owner;
        }).then(function (owner) {
            return _bcryptjs2.default.compare(pass, owner.pass).then(function (res) {
                if (res) return _lodash2.default.omit(owner, ['pass']);else return null;
            });
        }).catch(function (err) {
            return console.log(err);
        });
    },
    findByOwnerId: function findByOwnerId(id) {
        return _models.Stores.findOne({ "owner._id": id }).lean().then(function (store) {
            return _lodash2.default.omit(store, ['owner']);
        }).catch(function (err) {
            return console.log(err);
        });
    },
    findShippers: function findShippers(id) {
        return _findOne(id).then(function (store) {
            return _services.shippersService.findMany(store.shipperId);
        });
    }

};


var _findOne = function _findOne(id) {
    return _models.Stores.findOne({ _id: id });
};
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require("../models");

var _ = require("lodash");
var faker = require("faker");


var MAX_STORE = 3;

var createStores = function createStores() {
    return _models.Invoices.find({}, { _id: true }).then(function (invoices_id) {
        return setStorage().then(function (storages) {
            var result = [];
            for (var i = 0; i < MAX_STORE; i++) {
                var coord = faker.helpers.userCard().address.geo;
                var invoiceId = setInvoice(invoices_id);
                var resultItem = {
                    name: faker.lorem.words(),
                    location: {
                        address: faker.address.streetAddress(),
                        lat: parseFloat(coord.lat),
                        lng: parseFloat(coord.lng)
                    },
                    invoiceId: invoiceId[i],
                    owner: {
                        email: faker.internet.email(),
                        name: faker.name.findName(),
                        token: faker.internet.password(),
                        pass: faker.internet.password(),
                        phone: faker.phone.phoneNumber()
                    },
                    storage: storages[i],
                    shipperId: []
                };
                result.push(resultItem);
            }
            return result;
        });
    });
};

exports.default = function () {
    return createStores().then(function (stores) {
        _models.Stores.insertMany(stores);
    });
};

var setInvoice = function setInvoice(ids) {
    var result = [];
    var resultItem = [];
    for (var i = 1; i <= 17; i++) {
        resultItem.push(ids[i - 1]._id);
    }
    result.push(resultItem);
    resultItem = [];
    for (var _i = 18; _i <= 35; _i++) {
        resultItem.push(ids[_i - 1]._id);
    }
    result.push(resultItem);
    resultItem = [];
    for (var _i2 = 36; _i2 <= 50; _i2++) {
        resultItem.push(ids[_i2 - 1]._id);
    }
    result.push(resultItem);
    return result;
};

var setStorage = function setStorage() {
    var result = [];
    return _models.Products.find({}, { _id: true }).then(function (products_id) {
        for (var i = 0; i < MAX_STORE; i++) {
            var resultItem = SetStorageItem(products_id);
            result.push(resultItem);
        }
        return result;
    });
};

var SetStorageItem = function SetStorageItem(products) {
    var result = [];
    for (var i = 0; i < products.length; i++) {
        var resultItem = {
            productId: products[i]._id,
            amount: _.random(50, 200),
            receipt_date: faker.date.recent()
        };
        result.push(resultItem);
    }
    return result;
};
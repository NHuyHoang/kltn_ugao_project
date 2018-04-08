'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

var _ = require("lodash");
var faker = require('faker');


var MAX_INVOICE = 50;

exports.default = function () {
    _models.Invoices.find().count().then(function (count) {
        if (count >= 50) return;
        createInvoices().then(function (invoices) {
            _models.Invoices.insertMany(invoices);
        });
    }).catch(function (err) {
        return console.log(err);
    });
};

var createInvoices = function createInvoices() {
    //const createInvoice = () => {
    var result = [];
    return _models.Products.find({}, { _id: true }).then(function (products) {
        for (var i = 0; i < MAX_INVOICE; i++) {
            var coord = faker.helpers.userCard().address.geo;
            var resultItem = {
                order_date: faker.date.past(),
                paid: faker.random.boolean(),
                price: _.random(50, 500),
                payment_method: faker.lorem.words(),
                products: selectProduct(products, _.random(1, 3)),
                tasks: {
                    receipt_date: faker.date.future(),
                    location: {
                        address: faker.address.streetAddress(),
                        lat: parseFloat(coord.lat),
                        lng: parseFloat(coord.lng)
                    }
                }
            };
            result.push(resultItem);
        }
        return result;
    }).catch(function (err) {
        return console.log(err);
    });
};

var selectProduct = function selectProduct(ids, totalProduct) {
    var productIds = [];
    for (var i = 0; i < totalProduct; i++) {
        var randomProduct = null;
        do {
            randomProduct = ids[_.random(0, ids.length - 1)]._id;
        } while (productIds.indexOf(randomProduct) != -1 && productIds.length != 0);
        productIds.push(randomProduct);
    }

    var result = [];
    productIds.forEach(function (id) {
        var resultItem = { _id: id, quantity: _.random(1, 2) };
        result.push(resultItem);
    });
    return result;
};
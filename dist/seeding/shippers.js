'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

var _ = require('lodash');
var faker = require('faker');


var MAX_SHIPPER = 3;

exports.default = function () {
    return _models.Stores.find({}).then(function (invoice_id) {
        var result = [];
        invoice_id.forEach(function (store, index) {
            var resultItem = assignInvoice(store.invoiceId);
            result[index] = resultItem;
            result[index].forEach(function (element) {
                createShipper(store._id, element);
            });
        });
    });
};

var assignInvoice = function assignInvoice(invoices) {

    var result = [];
    var quantity = 0;
    for (var i = 0; i < MAX_SHIPPER; i++) {
        var pivot = parseInt(invoices.length / MAX_SHIPPER + quantity);

        if (i === MAX_SHIPPER - 1) {
            pivot = invoices.length;
        }
        var resultItem = [];
        for (var j = quantity; j < pivot; j++) {
            resultItem.push(invoices[j]);
        }
        result.push(resultItem);
        quantity = pivot;
    }
    return result;
};

var createShipper = function createShipper(store_id, invoices) {
    var shipper = {
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        token: faker.internet.password(),
        email: faker.internet.email(),
        pass: faker.internet.password(),
        img: faker.image.avatar(),
        invoiceId: invoices
    };
    return _models.Shippers.create(shipper).then(function (data) {
        _models.Stores.findOneAndUpdate({ _id: store_id }, { "$push": { "shipperId": data._id } }).then(function (res) {
            return console.log(res);
        });
    }).catch(function (err) {
        return console.log(err);
    });
};
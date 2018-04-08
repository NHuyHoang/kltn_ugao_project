"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require("../models");

var _ = require("lodash");
var faker = require("faker");
var LIMIT = 10;
var MAX_CUSTOMER = 5;

exports.default = function () {
    var skip = 0;
    for (var i = 0; i < MAX_CUSTOMER; i++) {
        getInvoices(skip).then(function (data) {
            createCustomer(data);
        });
        skip += LIMIT;
    }
};

var createCustomer = function createCustomer(invoices) {
    var coord = faker.helpers.userCard().address.geo;
    var customer = {
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        img: faker.image.avatar(),
        token: faker.internet.password(),
        email: faker.internet.email(),
        pass: faker.internet.password(),
        location: {
            address: faker.address.streetAddress(),
            lat: parseFloat(coord.lat),
            lng: parseFloat(coord.lng)
        },
        invoiceId: invoices
    };
    return _models.Customers.create(customer);
};
var getInvoices = function getInvoices(skip) {
    var result = [];
    return _models.Invoices.find({}, { _id: true }).skip(skip).limit(LIMIT).then(function (invoices) {
        invoices.forEach(function (invoice) {
            result.push(invoice._id);
        });
        return result;
    });
};
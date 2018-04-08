'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

var faker = require('faker');
var lorem = faker.lorem;
var words = lorem.words;
var sentence = lorem.sentence;
var sentences = lorem.sentences;
var productFile = require('./dummy/product.json');

exports.default = function () {
    return _models.Products.insertMany(productItem()).then(function (result) {
        return console.log(result);
    }).catch(function (err) {
        return console.log(err);
    });
};

var productItem = function productItem() {
    var result = [];
    productFile.forEach(function (item) {
        var resultItem = {
            name: item.name,
            type: words(),
            img: item.img,
            description: sentence(),
            info: sentences(),
            price: item.price,
            weight: item.weight
        };
        result.push(resultItem);
    });
    return result;
};
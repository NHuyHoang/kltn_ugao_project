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


var producers = [{
    name: "Hạt Ngọc Trời",
    img: "http://gaosach58.vn/wp-content/uploads/2016/06/logo-hat-ngoc-troi.png",
    products: ["5ac86776e9b19a17ccfaab5c", "5ac86776e9b19a17ccfaab6a", "5ac86776e9b19a17ccfaab6d", "5ac86776e9b19a17ccfaab6e", "5ac86776e9b19a17ccfaab5d", "5ac86776e9b19a17ccfaab7e", "5ac86776e9b19a17ccfaab6c", "5ac86776e9b19a17ccfaab7f", "5ac86776e9b19a17ccfaab80", "5ac86776e9b19a17ccfaab81", "5ac86776e9b19a17ccfaab6b", "5ac86776e9b19a17ccfaab82", "5ac86776e9b19a17ccfaab70", "5ac86776e9b19a17ccfaab71", "5ac86776e9b19a17ccfaab7a", "5ac86776e9b19a17ccfaab6f", "5ac86776e9b19a17ccfaab72", "5ac86776e9b19a17ccfaab7d"]
}, {
    name: "Hoa Lúa Rice",
    img: "http://gaosach58.vn/wp-content/uploads/2016/06/logo-hoa-lua.png",
    products: ["5ac86776e9b19a17ccfaab5a", "5ac86776e9b19a17ccfaab67", "5ac86776e9b19a17ccfaab68", "5ac86776e9b19a17ccfaab69", "5ac86776e9b19a17ccfaab7b", "5ac86776e9b19a17ccfaab7c"]
}, {
    name: "Happy Trade",
    img: "http://gaosach58.vn/wp-content/uploads/2017/08/hp2-680x238.jpg",
    products: ["5ac86776e9b19a17ccfaab58", "5ac86776e9b19a17ccfaab61", "5ac86776e9b19a17ccfaab5f", "5ac86776e9b19a17ccfaab63", "5ac86776e9b19a17ccfaab62"]
}, {
    name: "Gạo VFarm",
    img: null,
    products: ["5ac86776e9b19a17ccfaab62"]
}, {
    name: "Gạo ITA RICE",
    img: "http://gaosach58.vn/wp-content/uploads/2016/06/logo-gao-sach.png",
    products: ["5ac86776e9b19a17ccfaab74", "5ac86776e9b19a17ccfaab77", "5ac86776e9b19a17ccfaab73", "5ac86776e9b19a17ccfaab75", "5ac86776e9b19a17ccfaab78", "5ac86776e9b19a17ccfaab78", "5ac86776e9b19a17ccfaab76"]
}];

/* 1 */

var createProducers = function createProducers() {
    var result = [];
    producers.forEach(function (producer) {
        var resultItem = {
            name: producer.name,
            address: faker.address.streetAddress(),
            phone: faker.phone.phoneNumber(),
            email: faker.internet.email(),
            description: sentences(),
            img: producer.img,
            productId: producer.products
        };
        result.push(resultItem);
    });
    return result;
};

exports.default = function () {
    return _models.Producers.insertMany(createProducers()).then(function (data) {
        return console.log(data);
    }).catch(function (err) {
        return console.log(err);
    });
};
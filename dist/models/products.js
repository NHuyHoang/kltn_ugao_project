'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Products = exports.productsSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _reviews = require('./reviews');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var productsSchema = exports.productsSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String },
    description: { type: String },
    info: { type: String },
    weight: { type: Number },
    img: { type: String, required: true },
    price: { type: Number, required: true }
});

var Products = exports.Products = _mongoose2.default.model('Products', productsSchema);
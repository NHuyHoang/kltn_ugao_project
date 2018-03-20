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
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    description: { type: String },
    img: { type: String, required: true },
    rating: { type: Number, default: 0 },
    price: { type: Number, required: true },
    reviews: [_reviews.reviewsSchema]
});

var Products = exports.Products = _mongoose2.default.model('Products', productsSchema);
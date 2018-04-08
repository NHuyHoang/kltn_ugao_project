'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Producers = exports.producersSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var producersSchema = exports.producersSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    email: { type: String, required: true },
    description: { type: String },
    img: { type: String },
    productId: [String]
});

var Producers = exports.Producers = _mongoose2.default.model('Producers', producersSchema);
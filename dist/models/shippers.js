'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Shippers = exports.shippersSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var shippersSchema = exports.shippersSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    img: { type: String, required: true },
    invoiceId: [String]
});

var Shippers = exports.Shippers = _mongoose2.default.model('Shippers', shippersSchema);
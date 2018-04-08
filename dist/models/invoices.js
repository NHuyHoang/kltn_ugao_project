'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Invoices = exports.invoiceSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _tasks = require('./tasks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var invoiceSchema = exports.invoiceSchema = new Schema({
    order_date: { type: Date, required: true },
    paid: { type: Boolean, default: false },
    price: { type: Number, required: true },
    payment_method: { type: String },
    products: [Schema.Types.Mixed],
    tasks: _tasks.tasksSchema
});

var Invoices = exports.Invoices = _mongoose2.default.model('Invoices', invoiceSchema);
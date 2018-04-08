'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Customers = exports.customersSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _locations = require('./locations');

var _locations2 = _interopRequireDefault(_locations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var customersSchema = exports.customersSchema = new Schema({
	email: {
		type: String,
		required: [true, 'email is required']
	},
	name: {
		type: String,
		required: [true, 'name is required']
	},
	pass: {
		type: String,
		required: [true, 'pass is required']
	},
	img: String,
	phone: {
		type: String,
		required: true
	},
	token: String,
	location: _locations2.default,
	invoiceId: [String]
});

var Customers = exports.Customers = _mongoose2.default.model('Customers', customersSchema);
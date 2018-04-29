'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ownersSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _locations = require('./locations');

var _locations2 = _interopRequireDefault(_locations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ownersSchema = exports.ownersSchema = new Schema({
	email: {
		type: String,
		required: [true, 'email is required']
	},
	img: String,
	name: {
		type: String,
		required: [true, 'name is required']
	},
	pass: {
		type: String,
		required: [true, 'pass is required']
	},
	token: {
		type: String
	},
	phone: {
		type: String,
		required: true
	}
});
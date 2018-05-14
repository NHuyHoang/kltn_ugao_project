'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tasks = exports.tasksSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _locations = require('./locations');

var _locations2 = _interopRequireDefault(_locations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var tasksSchema = exports.tasksSchema = new Schema({
    address: { type: String },
    receipt_date: { type: Date },
    location: _locations2.default
});

var Tasks = exports.Tasks = _mongoose2.default.model('Tasks', tasksSchema);
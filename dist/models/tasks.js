'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tasks = exports.tasksSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var tasksSchema = exports.tasksSchema = new Schema({
    address: { type: String, required: true },
    date_recieved: { type: Date, required: true },
    date_delivered: { type: Date, required: true },
    dest_lat: { type: Number },
    dest_log: { type: Number }
});

var Tasks = exports.Tasks = _mongoose2.default.model('Tasks', tasksSchema);
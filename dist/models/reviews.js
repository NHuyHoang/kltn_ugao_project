'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Reviews = exports.reviewsSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var reviewsSchema = exports.reviewsSchema = new Schema({
    content: { type: String, required: true },
    customerId: { type: String, required: true },
    date_review: { type: Date, required: true }
});

var Reviews = exports.Reviews = _mongoose2.default.model('Reviews', reviewsSchema);
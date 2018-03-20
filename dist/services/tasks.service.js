'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _invoices = require('./invoices.service');

var _invoices2 = _interopRequireDefault(_invoices);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    findOne: function findOne(id) {
        return _findOne();
    }
};


var _findOne = function _findOne() {
    return _models.Tasks.findOne({ _id: id });
};
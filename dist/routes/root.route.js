'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _customers = require('./customers.route');

var _customers2 = _interopRequireDefault(_customers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootRouter = _express2.default.Router();

rootRouter.use('/customers/', _customers2.default);
rootRouter.get("", function (req, res) {
  return res.send("Home page");
});

exports.default = rootRouter;
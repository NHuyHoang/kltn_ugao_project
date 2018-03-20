'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _customers = require('../controllers/customers.controller');

var _customers2 = _interopRequireDefault(_customers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router({ mergeParams: true });
router.get("", _customers2.default.findAll).post("", _customers2.default.insert).put("", _customers2.default.update).delete("/:id", _customers2.default.remove).get("/:id", _customers2.default.findOne);

exports.default = router;
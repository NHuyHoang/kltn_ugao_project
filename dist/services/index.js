'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invoices = require('./invoices.service');

Object.defineProperty(exports, 'invoicesService', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_invoices).default;
  }
});

var _customers = require('./customers.service');

Object.defineProperty(exports, 'customersService', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_customers).default;
  }
});

var _shippers = require('./shippers.service');

Object.defineProperty(exports, 'shippersService', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_shippers).default;
  }
});

var _products = require('./products.service');

Object.defineProperty(exports, 'productsService', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_products).default;
  }
});

var _reviews = require('./reviews.service');

Object.defineProperty(exports, 'reviewsService', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_reviews).default;
  }
});

var _producers = require('./producers.service');

Object.defineProperty(exports, 'producersService', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_producers).default;
  }
});

var _stores = require('./stores.service');

Object.defineProperty(exports, 'storesService', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stores).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
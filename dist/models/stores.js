'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Stores = exports.storesSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _locations = require('./locations');

var _locations2 = _interopRequireDefault(_locations);

var _shippers = require('./shippers');

var _owners = require('./owners');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var storesSchema = exports.storesSchema = new Schema({
    location: _locations2.default,
    name: String,
    invoiceId: [String],
    owner: _owners.ownersSchema,
    storage: [Schema.Types.Mixed],
    shipperId: [String]
});

var Stores = exports.Stores = _mongoose2.default.model('Stores', storesSchema);
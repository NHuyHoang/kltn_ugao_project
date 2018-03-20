'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _customers = require('../services/customers.service');

var _customers2 = _interopRequireDefault(_customers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    findAll: function findAll(req, res) {
        _customers2.default.findAll().catch(function (err) {
            return res.sendStatus(404).send(err);
        }).then(function (data) {
            return res.send(data);
        });
    },
    findOne: function findOne(req, res) {
        if (!req.params.id) res.send('id is required');
        _customers2.default.findOne(req.params.id).catch(function (err) {
            return res.sendStatus(404).send(err);
        }).then(function (data) {
            return res.send(data);
        });
    },
    insert: function insert(req, res) {
        if (!req.body) res.send('input not found');
        _customers2.default.insert(req.body).catch(function (err) {
            return res.sendStatus(404).send(err);
        }).then(function (data) {
            return res.send(data);
        });
    },
    update: function update(req, res) {
        if (!req.body || !req.body.id) res.send('invalid input');
        _customers2.default.update(req.body).catch(function (err) {
            return res.sendStatus(404).send(err);
        }).then(function (data) {
            return res.send(data);
        });
    },
    remove: function remove(req, res) {
        if (!req.params.id) res.send('id is required');
        _customers2.default.remove(req.params.id).catch(function (err) {
            return res.sendStatus(404).send(err);
        }).then(function (data) {
            return res.send(data);
        });
    }
};
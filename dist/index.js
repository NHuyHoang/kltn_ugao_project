'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _root = require('./routes/root');

var _root2 = _interopRequireDefault(_root);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(_config2.default.local_db_uri).then(function () {
    console.log('Connected to db at ', _config2.default.local_db_uri);
    return _mongoose2.default.connection;
}).catch(function (err) {
    console.log('Fail to connect at ' + err);
});

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.use('/', _root2.default);

app.listen(8000, function () {
    console.log('listening on port 8000');
});
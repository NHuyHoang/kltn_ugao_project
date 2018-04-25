'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _root = require('./routes/root.route');

var _root2 = _interopRequireDefault(_root);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _grapql = require('./schema/grapql.schema');

var _grapql2 = _interopRequireDefault(_grapql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 8000;
var app = (0, _express2.default)();

//fixing deploy
//update heroku please
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(_config2.default.db_uri).then(function (err, client) {
    console.log('Connected to db at ', _config2.default.db_uri);
    return _mongoose2.default.connection;
}).catch(function (err) {
    console.log('Fail to connect at ' + err);
});

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.use('/', _root2.default);

app.use('/graphql', (0, _expressGraphql2.default)({
    schema: _grapql2.default,
    graphiql: true
}));

app.listen(PORT, function () {
    console.log('listening on port ', PORT);
});

/* import customers from './seeding/customer';
customers();  */

/* import bcrypt from 'bcryptjs';

var hash = bcrypt.hashSync('kltnugao', 10);

console.log(hash);


var hash = bcrypt.hashSync('kltnugao', 10);

console.log(hash);
var hash = bcrypt.hashSync('kltnugao', 10);

console.log(hash);
var hash = bcrypt.hashSync('kltnugao', 10);

console.log(hash);
var hash = bcrypt.hashSync('kltnugao', 10);

console.log(hash);
var hash = bcrypt.hashSync('kltnugao', 10);

console.log(hash);
var hash = bcrypt.hashSync('kltnugao', 10);

console.log(hash);
var hash = bcrypt.hashSync('kltnugao', 10);

console.log(hash);
var hash = bcrypt.hashSync('kltnugao', 10);

console.log(hash);*/

/* bcrypt.compare('kltnugao', "$2a$10$SoTEHnUCdIu0awzoTXOXw.DsI6ww.Gcu2SRbhz9H8fWuwgyoD0dG6").then((res) => {
    console.log(res)
}); */
/* import { customersService } from './services';
customersService.findByEmailPass('bluegasus@gmail.com', 'huyhoang3562927')
    .then(result => console.log(result))
    .catch(result => console.log(result))
 */
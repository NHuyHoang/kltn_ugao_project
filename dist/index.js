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

var _grapql = require('./grapql.schema');

var _grapql2 = _interopRequireDefault(_grapql);

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

app.use('/graphql', (0, _expressGraphql2.default)({
    schema: _grapql2.default,
    graphiql: true
}));

app.listen(8000, function () {
    console.log('listening on port 8000');
});

/* import { customersService } from './services';

customersService.findCustomerByInvoiceId('5aa935af0c7e801290fbb843')
    .then(data => console.log(data))
    .catch(data => console.log(data)) */
/* import { Producers } from './models';

let producer = new Producers({
    name:"producer 2",
    address: "23 Duis suscipit str",
    phone: "(623)456-125",
    email: "producer2@gmail.com",
    descripttion: "Duis suscipit bibendum nisi. Curabitur luctus vel nisi sed pellentesque. Suspendisse interdum mauris a tempor luctus. Integer finibus sit amet ipsum ac sagittis. Pellentesque ac posuere diam. Ut commodo felis ut mi pulvinar, ullamcorper semper felis tempor. Nunc mattis imperdiet justo, rhoncus tempor nisl bibendum id. Donec euismod eu eros non laoreet. Nullam mollis bibendum lacus et auctor. Aenean augue libero, ullamcorper sit amet egestas at, ultricies quis est. ",
    img: [
        "https://beebom-redkapmedia.netdna-ssl.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg",
        "https://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg"
    ],
    productId:[
        "5aaa47136fa27337b0bc21a4",
    ]
})

producer.save().then(data => console.log(data)) */
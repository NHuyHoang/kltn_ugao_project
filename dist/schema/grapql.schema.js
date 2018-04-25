'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _args;

var _services = require('../services');

var services = _interopRequireWildcard(_services);

var _schema = require('./schema');

var Type = _interopRequireWildcard(_schema);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var graphql = require('graphql');
var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLFloat = graphql.GraphQLFloat,
    GraphQLID = graphql.GraphQLID,
    GraphQLList = graphql.GraphQLList,
    GraphQLSchema = graphql.GraphQLSchema,
    GraphQLNonNull = graphql.GraphQLNonNull;


var RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: Type.CustomerType,
            args: { id: { type: GraphQLString } },
            resolve: function resolve(parentValue, args) {
                return services.customersService.findOne(args.id);
            }
        },
        customers: {
            type: GraphQLList(Type.CustomerType),
            resolve: function resolve(parentValue, args) {
                return services.customersService.findAll();
            }
        },
        authenticatedCustomer: {
            type: Type.CustomerType,
            args: {
                email: { type: GraphQLString },
                pass: { type: GraphQLString }
            },
            resolve: function resolve(parentValue, args) {
                return services.customersService.findByEmailPass(args.email, args.pass);
            }
        },
        invoice: {
            type: Type.InvoiceType,
            args: { id: { type: GraphQLString } },
            resolve: function resolve(parentValue, args) {
                return services.invoicesService.findOne(args.id);
            }
        },
        invoices: {
            type: GraphQLList(Type.InvoiceType),
            resolve: function resolve(parentValue, args) {
                return services.invoicesService.findAll();
            }
        },
        shipper: {
            type: Type.ShipperType,
            args: { id: { type: GraphQLString } },
            resolve: function resolve(parentValue, args) {
                return services.shippersService.findOne(args.id);
            }
        },
        authenticatedShipper: {
            type: Type.ShipperType,
            args: {
                email: { type: GraphQLString },
                pass: { type: GraphQLString }
            },
            resolve: function resolve(parentValue, args) {
                return services.shippersService.findByEmailPass(args.email, args.pass);
            }
        },
        shippers: {
            type: GraphQLList(Type.ShipperType),
            resolve: function resolve(parentValue, args) {
                return services.shippersService.findAll();
            }
        },
        product: {
            type: Type.ProductType,
            args: { id: { type: GraphQLString } },
            resolve: function resolve(parentValue, args) {
                return services.productsService.findOne(args.id);
            }
        },
        products: {
            type: GraphQLList(Type.ProductType),
            resolve: function resolve(parentValue, args) {
                return services.productsService.findAll();
            }
        },
        producer: {
            type: Type.ProducerType,
            args: { id: { type: GraphQLString } },
            resolve: function resolve(parentValue, args) {
                return services.producersService.findOne(args.id);
            }
        },
        producers: {
            type: GraphQLList(Type.ProducerType),
            resolve: function resolve(parentValue, args) {
                return services.producersService.findAll();
            }
        },
        store: {
            type: Type.StoreType,
            args: { id: { type: GraphQLString } },
            resolve: function resolve(parentValue, args) {
                return services.storesService.findOne(args.id);
            }
        },
        stores: {
            type: GraphQLList(Type.StoreType),
            resolve: function resolve(parentValue, args) {
                return services.storesService.findAll();
            }
        },
        authenticatedOwner: {
            type: Type.OwnerType,
            args: {
                email: { type: GraphQLString },
                pass: { type: GraphQLString }
            },
            resolve: function resolve(parentValue, args) {
                return services.storesService.findOwner(args.email, args.pass);
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'MutationType',
    fields: {
        addCustomer: {
            type: Type.CustomerType,
            args: (_args = {
                email: { type: GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLNonNull(GraphQLString) },
                pass: { type: GraphQLNonNull(GraphQLString) },
                img: { type: GraphQLString },
                phone: { type: GraphQLNonNull(GraphQLString) }
            }, _defineProperty(_args, 'email', { type: GraphQLNonNull(GraphQLString) }), _defineProperty(_args, 'address', { type: GraphQLNonNull(GraphQLString) }), _args),
            resolve: function resolve(parentValue, args) {
                console.log(args);
                return services.customersService.insert(Object.assign({}, args));
            }
        }
    }
});

exports.default = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _services = require('./services');

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


var TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: {
        address: { type: GraphQLString },
        date_recieved: { type: GraphQLString },
        date_delivered: { type: GraphQLString },
        dest_lat: { type: GraphQLFloat },
        dest_log: { type: GraphQLFloat }
    }
});

var InvoiceType = new GraphQLObjectType({
    name: 'Invoice',
    fields: function fields() {
        return {
            _id: { type: GraphQLString },
            date_order: { type: GraphQLString },
            amount: { type: GraphQLString },
            paid: { type: GraphQLBoolean },
            price: { type: GraphQLInt },
            payment_method: { type: GraphQLString },
            tasks: { type: TaskType },
            products: {
                type: GraphQLList(ProductType),
                resolve: function resolve(parentValue, args) {
                    return _services.productsService.findByInvoiceId(parentValue._id);
                }
            },
            customer: {
                type: CustomerType,
                resolve: function resolve(parentValue, args) {
                    return _services.customersService.findCustomerByInvoiceId(parentValue._id.toString());
                }
            },
            shipper: {
                type: ShipperType,
                resolve: function resolve(parentValue, args) {
                    return _services.shippersService.findShipperByInvoiceId(parentValue._id.toString());
                }
            }
        };
    }
});

var ShipperType = new GraphQLObjectType({
    name: 'Shipper',
    fields: function fields() {
        return {
            _id: { type: GraphQLString },
            name: { type: GraphQLString },
            phone: { type: GraphQLString },
            address: { type: GraphQLBoolean },
            email: { type: GraphQLString },
            pass: { type: GraphQLString },
            img: { type: GraphQLString },
            invoices: {
                type: new GraphQLList(InvoiceType),
                resolve: function resolve(parentValue, args) {
                    return _services.invoicesService.findUserInvoices(parentValue._id, 'Shippers');
                }
            }
        };
    }
});

var CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: function fields() {
        return {
            _id: { type: GraphQLString },
            email: { type: GraphQLString },
            name: { type: GraphQLString },
            pass: { type: GraphQLString },
            img: { type: GraphQLString },
            phone: { type: GraphQLString },
            address: { type: GraphQLString },
            invoices: {
                type: new GraphQLList(InvoiceType),
                resolve: function resolve(parentValue, args) {
                    return _services.invoicesService.findUserInvoices(parentValue._id, 'Customers');
                }
            }
        };
    }
});

var ReviewType = new GraphQLObjectType({
    name: 'Review',
    fields: function fields() {
        return {
            _id: { type: GraphQLString },
            date_review: { type: GraphQLString },
            content: { type: GraphQLString },
            customer: {
                type: CustomerType,
                resolve: function resolve(parentValue, args) {
                    return _services.reviewsService.findCustomerByReviewId(parentValue._id);
                }
            }
        };
    }
});

var ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: function fields() {
        return {
            _id: { type: GraphQLString },
            name: { type: GraphQLString },
            amount: { type: GraphQLFloat },
            type: { type: GraphQLString },
            img: { type: GraphQLString },
            description: { type: GraphQLString },
            rating: { type: GraphQLInt },
            price: { type: GraphQLInt },
            producer: {
                type: ProducerType,
                resolve: function resolve(parentValue, args) {
                    return _services.producersService.findByProductId(parentValue._id);
                }
            },
            reviews: {
                type: new GraphQLList(ReviewType)
            }
        };
    }
});

var ProducerType = new GraphQLObjectType({
    name: 'Producer',
    fields: function fields() {
        return {
            _id: { type: GraphQLString },
            name: { type: GraphQLString },
            address: { type: GraphQLString },
            phone: { type: GraphQLString },
            email: { type: GraphQLString },
            description: { type: GraphQLString },
            img: { type: GraphQLList(GraphQLString) },
            products: {
                type: GraphQLList(ProducerType),
                resolve: function resolve(parentValue, args) {
                    return _services.producersService.findProducts(parentValue._id);
                }
            }
        };
    }
});

var RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: { id: { type: GraphQLString } },
            resolve: function resolve(parentValue, args) {
                return _services.customersService.findOne(args.id);
            }
        },
        customers: {
            type: GraphQLList(CustomerType),
            resolve: function resolve(parentValue, args) {
                return _services.customersService.findAll();
            }
        },
        invoice: {
            type: InvoiceType,
            args: { id: { type: GraphQLString } },
            resolve: function resolve(parentValue, args) {
                return _services.invoicesService.findOne(args.id);
            }
        },
        invoices: {
            type: GraphQLList(InvoiceType),
            resolve: function resolve(parentValue, args) {
                return _services.invoicesService.findAll();
            }
        },
        shipper: {
            type: ShipperType,
            args: { id: { type: GraphQLString } },
            resolve: function resolve(parentValue, args) {
                return _services.shippersService.findOne(args.id);
            }
        },
        shippers: {
            type: GraphQLList(ShipperType),
            resolve: function resolve(parentValue, args) {
                return _services.shippersService.findAll();
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLString } },
            resolve: function resolve(parentValue, args) {
                return _services.productsService.findOne(args.id);
            }
        },
        products: {
            type: GraphQLList(ProductType),
            resolve: function resolve(parentValue, args) {
                return _services.productsService.findAll();
            }
        },
        producer: {
            type: ProducerType,
            args: { id: { type: GraphQLString } },
            resolve: function resolve(parentValue, args) {
                return _services.producersService.findOne(args.id);
            }
        }
    }
});

exports.default = new GraphQLSchema({
    query: RootQuery
});
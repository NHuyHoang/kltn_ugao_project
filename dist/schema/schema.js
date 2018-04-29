'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.storageItemType = exports.OwnerType = exports.StoreType = exports.ProducerType = exports.ProductType = exports.CustomerType = exports.ShipperType = exports.InvoiceType = exports.InvoiceProductType = exports.LocationType = exports.TaskType = undefined;

var _services = require('../services');

var services = _interopRequireWildcard(_services);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
var TaskType = exports.TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: function fields() {
        return {
            receipt_date: { type: GraphQLString },
            location: {
                type: LocationType

            }
        };
    }
});

var LocationType = exports.LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: function fields() {
        return {
            address: { type: GraphQLString },
            lat: { type: GraphQLFloat },
            lng: { type: GraphQLFloat }
        };
    }
});

var InvoiceProductType = exports.InvoiceProductType = new GraphQLObjectType({
    name: 'ProductAndQuantity',
    fields: function fields() {
        return {
            product: { type: ProductType },
            quantity: { type: GraphQLInt }
        };
    }
});

var InvoiceType = exports.InvoiceType = new GraphQLObjectType({
    name: 'Invoice',
    fields: function fields() {
        return {
            _id: { type: GraphQLString },
            order_date: { type: GraphQLString },
            paid: { type: GraphQLBoolean },
            price: { type: GraphQLInt },
            payment_method: { type: GraphQLString },
            tasks: { type: TaskType },
            products: {
                type: GraphQLList(InvoiceProductType),
                resolve: function resolve(parentValue, args) {
                    return services.productsService.findByInvoiceId(parentValue._id);
                }
            },
            customer: {
                type: CustomerType,
                resolve: function resolve(parentValue, args) {
                    return services.customersService.findCustomerByInvoiceId(parentValue._id.toString());
                }
            },
            shipper: {
                type: ShipperType,
                resolve: function resolve(parentValue, args) {
                    return services.shippersService.findShipperByInvoiceId(parentValue._id.toString());
                }
            },
            store: {
                type: StoreType,
                resolve: function resolve(parentValue, args) {
                    return services.storesService.findByInvoiceId(parentValue._id);
                }
            }
        };
    }
});

var ShipperType = exports.ShipperType = new GraphQLObjectType({
    name: 'Shipper',
    fields: function fields() {
        return {
            _id: { type: GraphQLString },
            token: { type: GraphQLString },
            name: { type: GraphQLString },
            phone: { type: GraphQLString },
            address: { type: GraphQLString },
            email: { type: GraphQLString },
            pass: { type: GraphQLString },
            img: { type: GraphQLString },
            invoices: {
                type: new GraphQLList(InvoiceType),
                resolve: function resolve(parentValue, args) {
                    return services.invoicesService.findUserInvoices(parentValue._id, 'Shippers');
                }
            }
        };
    }
});

var CustomerType = exports.CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: function fields() {
        return {
            _id: { type: GraphQLString },
            token: { type: GraphQLString },
            email: { type: GraphQLString },
            name: { type: GraphQLString },
            pass: { type: GraphQLString },
            img: { type: GraphQLString },
            phone: { type: GraphQLString },
            invoices: {
                type: new GraphQLList(InvoiceType),
                resolve: function resolve(parentValue, args) {
                    return services.invoicesService.findUserInvoices(parentValue._id, 'Customers');
                }
            },
            location: {
                type: LocationType
            }
        };
    }
});

var ProductType = exports.ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: function fields() {
        return {
            _id: { type: GraphQLString },
            name: { type: GraphQLString },
            type: { type: GraphQLString },
            img: { type: GraphQLString },
            description: { type: GraphQLString },
            info: { type: GraphQLString },
            price: { type: GraphQLFloat },
            weight: { type: GraphQLFloat },
            producer: {
                type: ProducerType,
                resolve: function resolve(parentValue, args) {
                    return services.producersService.findByProductId(parentValue._id);
                }
            }
        };
    }
});

var ProducerType = exports.ProducerType = new GraphQLObjectType({
    name: 'Producer',
    fields: function fields() {
        return {
            _id: { type: GraphQLString },
            name: { type: GraphQLString },
            address: { type: GraphQLString },
            phone: { type: GraphQLString },
            email: { type: GraphQLString },
            description: { type: GraphQLString },
            img: { type: GraphQLString },
            products: {
                type: GraphQLList(ProductType),
                resolve: function resolve(parentValue, args) {
                    return services.producersService.findProducts(parentValue._id);
                }
            }
        };
    }
});

var StoreType = exports.StoreType = new GraphQLObjectType({
    name: 'Store',
    fields: function fields() {
        return {
            _id: { type: GraphQLString },
            name: { type: GraphQLString },
            location: { type: LocationType },
            invoices: {
                type: GraphQLList(InvoiceType),
                resolve: function resolve(parentValue, args) {
                    return services.storesService.findInvoices(parentValue._id);
                }
            },
            owner: { type: OwnerType },
            storage: {
                type: GraphQLList(storageItemType),
                resolve: function resolve(parentValue, args) {
                    return services.storesService.findProduct(parentValue._id);
                }
            },
            shippers: {
                type: GraphQLList(ShipperType),
                resolve: function resolve(parentValue, args) {
                    return services.storesService.findShippers(parentValue._id);
                }
            }
        };
    }
});

var OwnerType = exports.OwnerType = new GraphQLObjectType({
    name: 'Owner',
    fields: function fields() {
        return {
            _id: { type: GraphQLString },
            email: { type: GraphQLString },
            name: { type: GraphQLString },
            pass: { type: GraphQLString },
            phone: { type: GraphQLString },
            token: { type: GraphQLString },
            img: { type: GraphQLString }
        };
    }
});

var storageItemType = exports.storageItemType = new GraphQLObjectType({
    name: 'StorageItem',
    fields: function fields() {
        return {
            product: { type: ProductType },
            amount: { type: GraphQLFloat },
            receipt_date: { type: GraphQLString }
        };
    }
});
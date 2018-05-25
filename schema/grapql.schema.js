const graphql = require('graphql');
import * as services from '../services';
import GraphQLJSON from 'graphql-type-json';
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLFloat,
    GraphQLID,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} = graphql;
import * as Type from './schema'

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: Type.CustomerType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return services.customersService.findOne(args.id)
            }

        },
        customers: {
            type: GraphQLList(Type.CustomerType),
            resolve(parentValue, args) {
                return services.customersService.findAll()
            }
        },
        authenticatedCustomer: {
            type: Type.CustomerType,
            args: {
                email: { type: GraphQLString },
                pass: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return services.customersService
                    .findByEmailPass(args.email, args.pass)
            }
        },
        invoice: {
            type: Type.InvoiceType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return services.invoicesService.findOne(args.id)
            }
        },
        invoices: {
            type: GraphQLList(Type.InvoiceType),
            resolve(parentValue, args) {
                return services.invoicesService.findAll()
            }
        },
        shipper: {
            type: Type.ShipperType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return services.shippersService.findOne(args.id)
            }
        },
        authenticatedShipper: {
            type: Type.ShipperType,
            args: {
                email: { type: GraphQLString },
                pass: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return services.shippersService
                    .findByEmailPass(args.email, args.pass)
            }
        },
        shippers: {
            type: GraphQLList(Type.ShipperType),
            resolve(parentValue, args) {
                return services.shippersService.findAll()
            }
        },
        product: {
            type: Type.ProductType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return services.productsService.findOne(args.id)
            }
        },
        products: {
            type: GraphQLList(Type.ProductType),
            resolve(parentValue, args) {
                return services.productsService.findAll()
            }
        },
        producer: {
            type: Type.ProducerType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return services.producersService.findOne(args.id)
            }
        },
        producers: {
            type: GraphQLList(Type.ProducerType),
            resolve(parentValue, args) {
                return services.producersService.findAll()
            }
        },
        store: {
            type: Type.StoreType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return services.storesService.findOne(args.id)
            }
        },
        stores: {
            type: GraphQLList(Type.StoreType),
            resolve(parentValue, args) {
                return services.storesService.findAll()
            }
        },
        authenticatedOwner: {
            type: Type.OwnerType,
            args: {
                email: { type: GraphQLString },
                pass: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return services.storesService
                    .findOwner(args.email, args.pass)
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'MutationType',
    fields: {
        addCustomer: {
            type: Type.CustomerType,
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLNonNull(GraphQLString) },
                pass: { type: GraphQLNonNull(GraphQLString) },
                img: { type: GraphQLString },
                phone: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, args) {
                console.log(args);
                return services.customersService.insert(Object.assign({}, args))
            }

        },
        addInvoice: {
            type: GraphQLJSON,
            args: {
                invoice: { type: GraphQLNonNull(GraphQLJSON) },
                customerId: { type: GraphQLNonNull(GraphQLString) },
                storeId: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, args) {
                return services.invoicesService.insertOne(args.invoice, args.customerId, args.storeId);
            }
        },
        updateCustomer:{
            type: GraphQLJSON,
            args:{
                updateInfo: {type:GraphQLNonNull(GraphQLJSON)},
            },
            resolve(parentValue,args){
                return services.customersService.update(args.updateInfo);
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation,
})


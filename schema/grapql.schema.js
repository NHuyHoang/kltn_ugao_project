const graphql = require('graphql');
import * as services from '../services'
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
        invoice: {
            type: Type.InvoiceType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return invoicesService.findOne(args.id)
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
                return shippersService.findOne(args.id)
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
                return productsService.findOne(args.id)
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

        }
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation,
})


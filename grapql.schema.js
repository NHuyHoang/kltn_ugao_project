const graphql = require('graphql');
import { invoicesService, customersService } from './services'
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLSchema,
} = graphql;

const InvoiceType = new GraphQLObjectType({
    name: 'Invoice',
    fields: {
        _id: { type: GraphQLString },
        date_order: { type: GraphQLString },
        amount: { type: GraphQLString },
        paid: { type: GraphQLBoolean },
        price: { type: GraphQLInt },
        payment_method: { type: GraphQLString },
        productId: { type: GraphQLList(GraphQLString) },
        //tasks
    }
});

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: {
        _id: { type: GraphQLString },
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        pass: { type: GraphQLString },
        img: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
        invoices: {
            type: new GraphQLList(InvoiceType),
            resolve(parentValue, args) {
                return invoicesService.findCustomerInvoices(parentValue._id)
            }
        }
    }
});



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return customersService.findOne(args.id)
            }

        },
        customers: {
            type: GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return customersService.findAll()
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery
})


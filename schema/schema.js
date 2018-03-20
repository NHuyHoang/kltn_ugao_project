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

export const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: {
        address: { type: GraphQLString },
        date_recieved: { type: GraphQLString },
        date_delivered: { type: GraphQLString },
        dest_lat: { type: GraphQLFloat, },
        dest_log: { type: GraphQLFloat }
    }
})

export const InvoiceType = new GraphQLObjectType({
    name: 'Invoice',
    fields: () => ({
        _id: { type: GraphQLString },
        date_order: { type: GraphQLString },
        amount: { type: GraphQLString },
        paid: { type: GraphQLBoolean },
        price: { type: GraphQLInt },
        payment_method: { type: GraphQLString },
        tasks: { type: TaskType },
        products: { 
            type: GraphQLList(ProductType),
            resolve(parentValue, args) {
                return services.productsService.findByInvoiceId(parentValue._id);
            }
        },
        customer: {
            type: CustomerType,
            resolve(parentValue, args) {
                return services.customersService.findCustomerByInvoiceId(parentValue._id.toString())
            }
        },
        shipper: {
            type: ShipperType,
            resolve(parentValue, args) {
                return services.shippersService.findShipperByInvoiceId(parentValue._id.toString())
            }
        },
    })
});

export const ShipperType = new GraphQLObjectType({
    name: 'Shipper',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLBoolean },
        email: { type: GraphQLString },
        pass: { type: GraphQLString },
        img: { type: GraphQLString },
        invoices: {
            type: new GraphQLList(InvoiceType),
            resolve(parentValue, args) {
                return services.invoicesService.findUserInvoices(parentValue._id, 'Shippers')
            }
        }
    })
});


export const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
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
                return services.invoicesService.findUserInvoices(parentValue._id, 'Customers')
            }
        }
    })
});

export const ReviewType = new GraphQLObjectType({
    name: 'Review',
    fields: () => ({
        _id: { type: GraphQLString },
        date_review: { type: GraphQLString },
        content:  { type: GraphQLString },
        customer:{
            type:CustomerType,
            resolve(parentValue,args){
                return services.eviewsService.findCustomerByReviewId(parentValue._id);
            }
        }
    })
});

export const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        amount: { type: GraphQLFloat },
        type: { type: GraphQLString },
        img: { type: GraphQLString },
        description: { type: GraphQLString },
        rating: { type: GraphQLInt },
        price: { type: GraphQLInt },
        producer:{
            type: ProducerType,
            resolve(parentValue, args){
                return services.producersService.findByProductId(parentValue._id)
            }
        },
        reviews: {
            type: new GraphQLList(ReviewType),
        }
    })
});

export const ProducerType = new GraphQLObjectType({
    name: 'Producer',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        description:  { type: GraphQLString },
        img: { type: GraphQLList(GraphQLString) },
        products: {
            type: GraphQLList(ProducerType),
            resolve(parentValue, args){
                return services.producersService.findProducts(parentValue._id);
            }
        }
    })
});
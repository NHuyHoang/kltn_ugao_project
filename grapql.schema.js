const graphql = require('graphql');
import { 
    invoicesService, 
    customersService, 
    shippersService, 
    reviewsService, 
    productsService, 
    producersService 
} from './services'
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

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: {
        address: { type: GraphQLString },
        date_recieved: { type: GraphQLString },
        date_delivered: { type: GraphQLString },
        dest_lat: { type: GraphQLFloat, },
        dest_log: { type: GraphQLFloat }
    }
})

const InvoiceType = new GraphQLObjectType({
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
                return productsService.findByInvoiceId(parentValue._id);
            }
        },
        customer: {
            type: CustomerType,
            resolve(parentValue, args) {
                return customersService.findCustomerByInvoiceId(parentValue._id.toString())
            }
        },
        shipper: {
            type: ShipperType,
            resolve(parentValue, args) {
                return shippersService.findShipperByInvoiceId(parentValue._id.toString())
            }
        },
    })
});

const ShipperType = new GraphQLObjectType({
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
                return invoicesService.findUserInvoices(parentValue._id, 'Shippers')
            }
        }
    })
});


const CustomerType = new GraphQLObjectType({
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
                return invoicesService.findUserInvoices(parentValue._id, 'Customers')
            }
        }
    })
});

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    fields: () => ({
        _id: { type: GraphQLString },
        date_review: { type: GraphQLString },
        content:  { type: GraphQLString },
        customer:{
            type:CustomerType,
            resolve(parentValue,args){
                return reviewsService.findCustomerByReviewId(parentValue._id);
            }
        }
    })
});

const ProductType = new GraphQLObjectType({
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
                return producersService.findByProductId(parentValue._id)
            }
        },
        reviews: {
            type: new GraphQLList(ReviewType),
        }
    })
});

const ProducerType = new GraphQLObjectType({
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
                return producersService.findProducts(parentValue._id);
            }
        }
    })
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
        },
        invoice: {
            type: InvoiceType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return invoicesService.findOne(args.id)
            }
        },
        invoices: {
            type: GraphQLList(InvoiceType),
            resolve(parentValue, args) {
                return invoicesService.findAll()
            }
        },
        shipper: {
            type: ShipperType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return shippersService.findOne(args.id)
            }
        },
        shippers: {
            type: GraphQLList(ShipperType),
            resolve(parentValue, args) {
                return shippersService.findAll()
            }
        },
        product:{
            type: ProductType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return productsService.findOne(args.id)
            }
        },
        products:{
            type: GraphQLList(ProductType),
            resolve(parentValue, args){
                return productsService.findAll()
            }
        },
        producer:{
            type: ProducerType,
            args: { id: { type: GraphQLString }},
            resolve(parentValue, args){
                return producersService.findOne(args.id)
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery
})


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
    GraphQLNonNull,
} = graphql;

export const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        receipt_date: { type: GraphQLString },
        delivered_date: { type: GraphQLString },
        location: {
            type: LocationType,

        }
    })
})

export const LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: () => ({
        address: { type: GraphQLString },
        dest_lat: { type: GraphQLFloat },
        dest_log: { type: GraphQLFloat }
    })
})

export const InvoiceType = new GraphQLObjectType({
    name: 'Invoice',
    fields: () => ({
        _id: { type: GraphQLString },
        order_date: { type: GraphQLString },
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
        store: {
            type: StoreType,
            resolve(parentValue, args){
                return services.storesService.findByInvoiceId(parentValue._id)
            }
        }
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
        invoices: {
            type: new GraphQLList(InvoiceType),
            resolve(parentValue, args) {
                return services.invoicesService.findUserInvoices(parentValue._id, 'Customers')
            }
        },
        location: {
            type: LocationType
        }
    })
});



export const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        img: { type: GraphQLString },
        description: { type: GraphQLString },
        info: { type: GraphQLString },
        price: { type: GraphQLInt },
        producer: {
            type: ProducerType,
            resolve(parentValue, args) {
                return services.producersService.findByProductId(parentValue._id)
            }
        },
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
        description: { type: GraphQLString },
        img: { type: GraphQLList(GraphQLString) },
        products: {
            type: GraphQLList(ProducerType),
            resolve(parentValue, args) {
                return services.producersService.findProducts(parentValue._id);
            }
        }
    })
});

export const StoreType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        location: { type: LocationType },
        invoices: {
            type: GraphQLList(InvoiceType),
            resolve(parentValue, args) {
                return services.storesService.findInvoices(parentValue._id)
            }
        },
        owner: { type: ownerType },
        storage: { type: GraphQLList(storageItemType) },
        shippers: {
            type: GraphQLList(ShipperType),
            resolve(parentValue, args) {
                return services.storesService.findShippers(parentValue._id);
            }
        }
    })
})

export const ownerType = new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({
        _id: { type: GraphQLString },
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        pass: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
});

export const storageItemType = new GraphQLObjectType({
    name: 'StorageItem',
    fields: () => ({
        productId: { type: GraphQLString },
        product: {
            type: ProductType,
            resolve(parentValue, args) {
                return services.productsService.findOne(parentValue.productId)
            }
        },
        amount: { type: GraphQLFloat },
        receipt_date: { type: GraphQLString }
    })
})
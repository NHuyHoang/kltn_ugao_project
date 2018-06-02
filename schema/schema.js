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
        estimationTime: { type: GraphQLString },
        location: {
            type: LocationType,

        }
    })
})

export const LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: () => ({
        address: { type: GraphQLString },
        lat: { type: GraphQLFloat },
        lng: { type: GraphQLFloat }
    })
})

export const InvoiceProductType = new GraphQLObjectType({
    name: 'ProductAndQuantity',
    fields: () => ({
        product: { type: ProductType },
        quantity: { type: GraphQLInt }
    })
})

export const InvoiceType = new GraphQLObjectType({
    name: 'Invoice',
    fields: () => ({
        _id: { type: GraphQLString },
        order_date: { type: GraphQLString },
        paid: { type: GraphQLBoolean },
        price: { type: GraphQLFloat },
        payment_method: { type: GraphQLString },
        tasks: { type: TaskType },
        products: {
            type: GraphQLList(InvoiceProductType),
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
            resolve(parentValue, args) {
                return services.storesService.findByInvoiceId(parentValue._id)
            }
        }
    })
});

export const ShipperType = new GraphQLObjectType({
    name: 'Shipper',
    fields: () => ({
        _id: { type: GraphQLString },
        token: { type: GraphQLString },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
        email: { type: GraphQLString },
        pass: { type: GraphQLString },
        img: { type: GraphQLString },
        licensePlate: { type: GraphQLString },
        invoices: {
            type: new GraphQLList(InvoiceType),
            resolve(parentValue, args) {
                return services.invoicesService.findUserInvoices(parentValue._id, 'Shippers')
            }
        },
        unPaidInvoices: {
            type: new GraphQLList(InvoiceType),
            resolve(parentValue, args) {
                return services.invoicesService.findUserInvoices(parentValue._id, 'Shippers', true)
            }
        }
    })
});


export const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        _id: { type: GraphQLString },
        token: { type: GraphQLString },
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
        price: { type: GraphQLFloat },
        weight: { type: GraphQLFloat },
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
        img: { type: GraphQLString },
        products: {
            type: GraphQLList(ProductType),
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
        owner: { type: OwnerType },
        storage: {
            type: GraphQLList(storageItemType),
            resolve(parentValue, args) {
                return services.storesService.findProduct(parentValue._id)
            }
        },
        shippers: {
            type: GraphQLList(ShipperType),
            resolve(parentValue, args) {
                return services.storesService.findShippers(parentValue._id);
            }
        }
    })
})

export const OwnerType = new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({
        _id: { type: GraphQLString },
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        pass: { type: GraphQLString },
        phone: { type: GraphQLString },
        token: { type: GraphQLString },
        img: { type: GraphQLString },
        store: {
            type: StoreType,
            resolve(parentValue, args) {
                return services.storesService.findByOwnerId(parentValue._id);
            }
        }
    })
});

export const storageItemType = new GraphQLObjectType({
    name: 'StorageItem',
    fields: () => ({
        product: { type: ProductType },
        amount: { type: GraphQLFloat },
        receipt_date: { type: GraphQLString }
    })
})
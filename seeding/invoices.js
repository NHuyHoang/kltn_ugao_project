const _ = require("lodash");
const faker = require('faker');
import { Products, Invoices } from '../models';

const MAX_INVOICE = 50
export default () => {
    Invoices.find().count()
        .then(count => {
            if (count >= 50) return;
            createInvoices()
                .then(invoices => {
                    Invoices.insertMany(invoices);
                })
        })
        .catch(err => console.log(err));
}
const createInvoices = () => {
    //const createInvoice = () => {
    let result = [];
    return Products.find({}, { _id: true })
        .then(products => {
            for (let i = 0; i < MAX_INVOICE; i++) {
                let coord = faker.helpers.userCard().address.geo;
                let resultItem = {
                    order_date: faker.date.past(),
                    paid: faker.random.boolean(),
                    price: _.random(50, 500),
                    payment_method: faker.lorem.words(),
                    products: selectProduct(products, _.random(1, 3)),
                    tasks: {
                        receipt_date: faker.date.future(),
                        location: {
                            address: faker.address.streetAddress(),
                            lat: parseFloat(coord.lat),
                            lng: parseFloat(coord.lng)
                        }
                    },
                }
                result.push(resultItem)
            }
            return result;
        })
        .catch(err => console.log(err))
}

const selectProduct = (ids, totalProduct) => {
    let productIds = []
    for (let i = 0; i < totalProduct; i++) {
        let randomProduct = null;
        do {
            randomProduct = ids[_.random(0, ids.length - 1)]._id;

        } while (productIds.indexOf(randomProduct) != -1 && productIds.length != 0);
        productIds.push(randomProduct);
    }

    let result = [];
    productIds.forEach(id => {
        let resultItem = { _id: id, quantity: _.random(1, 2) };
        result.push(resultItem);
    })
    return result;
}
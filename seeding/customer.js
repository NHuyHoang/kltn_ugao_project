const _ = require("lodash");
const faker = require("faker");
const LIMIT = 10;
const MAX_CUSTOMER = 5;
import { Invoices, Customers } from '../models'


export default () => {
    let skip = 0;
    for (let i = 0; i < MAX_CUSTOMER; i++) {
        getInvoices(skip)
            .then(data => {
                createCustomer(data)
            })
        skip += LIMIT;
    }
}

const createCustomer = (invoices) => {
    let coord = faker.helpers.userCard().address.geo;
    let customer = {
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        img: faker.image.avatar(),
        token: faker.internet.password(),
        email: faker.internet.email(),
        pass: faker.internet.password(),
        location: {
            address: faker.address.streetAddress(),
            lat: parseFloat(coord.lat),
            lng: parseFloat(coord.lng)
        },
        invoiceId: invoices
    }
    return Customers.create(customer)
}
const getInvoices = (skip) => {
    let result = [];
    return Invoices.find({}, { _id: true }).skip(skip).limit(LIMIT)
        .then(invoices => {
            invoices.forEach(invoice => {
                result.push(invoice._id)
            })
            return result;
        })
}
const _ = require("lodash");
const faker = require("faker");
import { Invoices, Stores, Products } from '../models';

const MAX_STORE = 3;

const createStores = () => {
    return Invoices.find({}, { _id: true })
        .then((invoices_id) => {
            return setStorage()
                .then(storages => {
                    let result = [];
                    for (let i = 0; i < MAX_STORE; i++) {
                        let coord = faker.helpers.userCard().address.geo;
                        let invoiceId = setInvoice(invoices_id);
                        let resultItem = {
                            name: faker.lorem.words(),
                            location: {
                                address: faker.address.streetAddress(),
                                lat: parseFloat(coord.lat),
                                lng: parseFloat(coord.lng)
                            },
                            invoiceId: invoiceId[i],
                            owner: {
                                email: faker.internet.email(),
                                name: faker.name.findName(),
                                token: faker.internet.password(),
                                pass: faker.internet.password(),
                                phone: faker.phone.phoneNumber(),
                            },
                            storage: storages[i],
                            shipperId: []
                        }
                        result.push(resultItem);
                    }
                    return result;
                })
        })
}

export default () => {
    return createStores().then(stores => {
        Stores.insertMany(stores)
    })
}


const setInvoice = (ids) => {
    let result = [];
    let resultItem = [];
    for (let i = 1; i <= 17; i++) {
        resultItem.push(ids[i - 1]._id);
    }
    result.push(resultItem);
    resultItem = [];
    for (let i = 18; i <= 35; i++) {
        resultItem.push(ids[i - 1]._id);
    }
    result.push(resultItem);
    resultItem = [];
    for (let i = 36; i <= 50; i++) {
        resultItem.push(ids[i - 1]._id);
    }
    result.push(resultItem);
    return result;
}

const setStorage = () => {
    let result = [];
    return Products.find({}, { _id: true })
        .then((products_id) => {
            for (let i = 0; i < MAX_STORE; i++) {
                let resultItem = SetStorageItem(products_id);
                result.push(resultItem);
            }
            return result;
        })
}

const SetStorageItem = (products) => {
    let result = [];
    for (let i = 0; i < products.length; i++) {
        let resultItem = {
            productId: products[i]._id,
            amount: _.random(50, 200),
            receipt_date: faker.date.recent()
        };
        result.push(resultItem);
    }
    return result;
}
const _ = require('lodash');
const faker = require('faker');
import { Stores, Shippers } from '../models';

const MAX_SHIPPER = 3;


export default () => {
    return Stores.find({})
        .then((invoice_id) => {
            let result = [];
            invoice_id.forEach((store, index) => {
                let resultItem = assignInvoice(store.invoiceId);
                result[index] = resultItem;
                result[index].forEach((element) => {
                    createShipper(store._id, element);
                })
            })
        })
}

const assignInvoice = (invoices) => {

    let result = [];
    let quantity = 0;
    for (let i = 0; i < MAX_SHIPPER; i++) {
        let pivot = parseInt(invoices.length / MAX_SHIPPER + quantity);

        if (i === MAX_SHIPPER - 1) {
            pivot = invoices.length;
        }
        let resultItem = [];
        for (let j = quantity; j < pivot; j++) {
            resultItem.push(invoices[j]);
        }
        result.push(resultItem);
        quantity = pivot;
    }
    return result;
}

const createShipper = (store_id, invoices) => {
    let shipper = {
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        token: faker.internet.password(),
        email: faker.internet.email(),
        pass: faker.internet.password(),
        img: faker.image.avatar(),
        invoiceId: invoices
    };
    return Shippers.create(shipper)
        .then(data => {
            Stores.findOneAndUpdate({ _id: store_id }, { "$push": { "shipperId": data._id } }).then(res => console.log(res))
        })
        .catch(err => console.log(err))
}
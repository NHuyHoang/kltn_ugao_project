import { Stores } from '../models';
import { invoicesService, ownersService, productsService, shippersService } from '../services';
import bcrypt from 'bcryptjs';
import _ from 'lodash';

export default {
    findOne: (id) => {
        return findOne(id);
    },
    findAll: () => {
        return Stores.find()
    },
    findInvoices: (id) => {
        return findOne(id)
            .then(store => {
                return invoicesService.findMany(store.invoiceId)
            })
    },
    findowners: (id) => {
        return findOne(id)
            .then(store => {
                return ownersService.findMany(store.ownerId)
            })
    },
    findByInvoiceId: (id) => {
        return Stores.findOne({ invoiceId: id })
    },
    findProduct: (id) => {
        return findOne(id)
            .then(store => {
                if (store.storage.length === 0) return [];
                let promiseArr = [];
                store.storage.forEach(item => {
                    promiseArr.push(productsService.findOne(item.productId))
                })
                return Promise.all(promiseArr)
                    .then(values => {
                        let result = []
                        values.forEach((value, i) => {
                            let resultItem = {
                                product: Object.assign({}, value._doc),
                                amount: store.storage[i].amount,
                                receipt_date: store.storage[i].receipt_date
                            }
                            result.push(resultItem)
                        })
                        return result
                    })
            })
    },
    findOwner: (email, pass) => {
        return Stores.findOne({ "owner.email": email })
            .lean()
            .then(store => store.owner)
            .then(owner => {
                return bcrypt.compare(pass, owner.pass).then((res) => {
                    if (res) return _.omit(owner, ['pass']);
                    else return null;
                });
            })
            .catch(err => console.log(err))
    },
    findShippers: (id) => {
        return findOne(id)
            .then(store => {
                return shippersService.findMany(store.shipperId);
            })
    }

}

const findOne = (id) => {
    return Stores.findOne({ _id: id })
}
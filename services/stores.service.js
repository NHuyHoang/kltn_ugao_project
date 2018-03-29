import { Stores } from '../models';
import { invoicesService, shippersService, productsService } from '../services'
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
    findShippers: (id) => {
        return findOne(id)
            .then(store => {
                return shippersService.findMany(store.shipperId)
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
    }
}

const findOne = (id) => {
    return Stores.findOne({ _id: id })
}
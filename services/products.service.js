import mongoose from 'mongoose';
import { Invoices, Products } from '../models';

export default {
    findOne: (id) => {
        return findOne(id);
    },
    findAll: () => {
        return findAll();
    },
    findMany: (ids) => {
        return findMany(ids);
    },
    findByInvoiceId: (invoice_id) => {
        return Invoices.findOne(invoice_id)
            .catch(err => err)
            .then(invoice => {
                if (invoice.products.length === 0) return [];
                let result = [];
                let promiseArr = [];
                invoice.products.forEach((product) => {
                    promiseArr.push(findOne(product._id));
                })
                return Promise.all(promiseArr)
                    .then(values => {
                        let result = []
                        values.forEach((value, i) => {
                            let resultItem = {
                                product: Object.assign({}, value._doc),
                                quantity: invoice.products[i].quantity
                            };
                            result.push(resultItem)
                        })
                        return result
                    })
            })

    },
    findProductByReviewId: (reviewId) => {
        return Products.findOne({ reviews: { $elemMatch: { _id: reviewId } } });
    },

}

const findOne = (id) => {
    return Products.findOne({ _id: id });
}

const findAll = (id) => {
    return Products.find();
}

const findMany = (ids) => {
    return Products.find({ _id: { $in: ids } })
}

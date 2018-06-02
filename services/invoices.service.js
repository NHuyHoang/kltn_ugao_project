import { Invoices, Customers, Shippers, Stores } from '../models';
import FCMService from './firebaseAdmin.services';
import _ from 'lodash';

export default {
    findAll: () => {
        return Invoices.find({});
    },
    findMany: (ids) => {
        return findMany(ids);
    },
    findOne: (id) => {
        return findOne(id);
    },
    findUserInvoices: (userId, modelName, getUnPaidInvoices) => {
        let model;
        if (modelName === 'Customers')
            model = Customers
        else
            model = Shippers
        return model.findOne({ _id: userId })
            .catch(err => err)
            .then(user => {
                const invoicesCount = user.invoiceId.length;
                if (getUnPaidInvoices === undefined)
                    return findMany(user.invoiceId);
                else
                    return findMany(user.invoiceId, true);
            });
    },
    insertOne: (invoice, customer_id, store_id) => {
        FCMService();
        return Invoices.create(invoice)
            .then(result => {
                let storePromise = Stores.update(
                    { _id: store_id },
                    { $push: { invoiceId: result._id } }
                )
                let customerPromise = Customers.update(
                    { _id: customer_id },
                    { $push: { invoiceId: result._id } }
                )
                return Promise.all([storePromise, customerPromise])
                    .then(value => {
                        return { _id: result._id };
                    })
            });
    }
}

const findOne = (id) => {
    return Invoices.findOne({ _id: id });
}

const findMany = (ids, unPaidInvoices) => {
    if (ids.length === 0) return [];
    if (unPaidInvoices === undefined)
        return Invoices.find({ _id: { $in: ids } }).sort({ order_date: -1 })
    else {
        return Invoices.find({ _id: { $in: ids }, paid: false }).sort({ order_date: -1 })
    }

}
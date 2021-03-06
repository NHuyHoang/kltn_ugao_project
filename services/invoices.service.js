import { Invoices, Customers, Shippers, Stores } from '../models';
import { notifyCustomer } from './firebaseAdmin.services';
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
        return Invoices.create(invoice)
            .then(result => {
                console.log(result);
                let storePromise = Stores.update(
                    { _id: store_id },
                    { $push: { invoiceId: result._id } }
                ).catch(err => console.log(err));
                let customerPromise = Customers.update(
                    { _id: customer_id },
                    { $push: { invoiceId: result._id } }
                ).catch(err => console.log(err));
                return Promise.all([storePromise, customerPromise])
                    .then(value => {
                        notifyCustomer({ invoiceId: (result._id).toString() });
                        return { _id: result._id };
                    })
            });
    },
    update: (_id, updateObj) => {
        return new Promise((resolve, reject) => {
            if (!_id) reject("invoice id is required for update");
            return Invoices
                .findOneAndUpdate({ _id }, updateObj)
                .then(data => resolve({ success: true }))
                .catch(err => reject({ success: false }))
        })
    },
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
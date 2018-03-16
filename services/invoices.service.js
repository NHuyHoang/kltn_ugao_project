import mongoose from 'mongoose';
import { Invoices, Customers, Shippers } from '../models';
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
    findUserInvoices: (userId, modelName) => {
        let model;
        if(modelName === 'Customers')
            model = Customers
        else
            model = Shippers
        return model.findOne({ _id: userId })
            .catch(err => err)
            .then(user => {
                const invoicesCount = user.invoiceId.length;
                return findMany(user.invoiceId);
            });
    }
}

const findOne = (id) => {
    return Invoices.findOne({ _id: id });s
}

const findMany = (ids) => {
    if (ids.length === 0) return [];
    return  Invoices.find({ _id: { $in: ids } })
}
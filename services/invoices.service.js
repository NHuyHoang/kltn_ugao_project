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
    return Invoices.findOne({ _id: id });
}

const findMany = (ids) => {
    if (ids.length === 0) return [];
    return new Promise((resolve, reject) => {
        let result = [];
        let founded = 0;
        ids.forEach(id => {
            findOne(id)
                .catch(err => {
                    console.log(err);
                    founded++;
                    if (founded === ids.length)
                        resolve(result);
                })
                .then(invoice => {
                    let obj = Object.assign({}, invoice._doc);
                    result.push(obj);
                    founded++;
                    if (founded === ids.length)
                        resolve(result);
                })
        })
    })
}
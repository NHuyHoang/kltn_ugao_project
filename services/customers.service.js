import mongoose from 'mongoose';
import { Customers } from '../models';
import invoicesService from './invoices.service'
import bcrypt from 'bcryptjs';
import _ from 'lodash';

export default {
    findAll: () => {
        return Customers.find({});
    },
    findOne: (id) => {
        return Customers.findOne({ _id: id });
    },
    findByEmailPass: (email, pass) => {
        return Customers.findOne({ email })
            .lean()
            .then(customer => {
                return bcrypt.compare(pass, customer.pass).then((res) => {
                    if (res) return _.omit(customer, ['pass']);
                    else return null;
                });
            })
            .catch(err => console.log(err))
    },
    findCustomerByInvoiceId: (invoice_Id) => {
        return Customers.findOne({ invoiceId: invoice_Id })
    },
    insert: (obj) => {
        if (obj.pass) obj.pass = bcrypt.hashSync(obj.pass, 10);
        const customer = new Customers(obj);
        return customer.save();
    },
    update: (obj) => {
        return new Promise((resolve, reject) => {
            if (!obj.id) reject("id is required for update");
            return Customers
                .findOneAndUpdate({ _id: obj.id }, _.omit(obj, ['id']))
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    },
    remove: (id) => {
        return Customers.findByIdAndRemove({ _id: id });
    }
}

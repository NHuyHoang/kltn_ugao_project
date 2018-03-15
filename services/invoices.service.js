import mongoose from 'mongoose';
import { Invoices, Customers } from '../models';
import _ from 'lodash';

export default {
    findAll: () => {
        return Invoices.find({});
    },
    findCustomerInvoices: (customerId) => {
        return Customers.find({ _id: customerId })
            .catch(err => err)
            .then(customers => customers[0])
            .then(customer => {/* 
                return new Promise((resolve,reject) => {
                    setTimeout(() => {
                        resolve([{_id:'1',price:'2'},{_id:'3',price:'4'}])
                    },1000)
                }) */
                const invoicesCount = customer.invoiceId.length;
                if (invoicesCount === 0)
                    return [];
                const results = [];
                return new Promise((resolve, reject) => {
                        customer.invoiceId.forEach((id, index) => {
                            findOne(id)
                                .then(invoice => {
                                    const result = Object.assign({}, invoice);
                                    results.push(result._doc);
                                    if (results.length === invoicesCount)
                                        resolve(results)
                                })
                                .catch(err => err)

                        })
                })
            });
    }
}

const findOne = (id) => {
    return Invoices.findOne({ _id: id });
}   
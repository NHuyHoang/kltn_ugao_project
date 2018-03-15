import mongoose from 'mongoose';
import { Customers } from '../models';
import invoicesService from './invoices.service'
import bcrypt from 'bcryptjs';
import _ from 'lodash';

export default {
    findAll:() => {
        return Customers.find({});
    },
    findOne:(id) => {
        return Customers.findOne({_id:id});
    },
    findCustomerByInvoiceId:(invoice_Id) => {
        return Customers.find()
            .then(customers => {
                let result = null;
                customers.forEach((customer) => {
                    if(customer.invoiceId.length === 0) return null;
                    customer.invoiceId.forEach((id) => {
                        if(id === invoice_Id){
                            result = Object.assign({}, customer._doc);
                            
                            return;
                        }
                    });
                    if(result !== null) return;
                })
                return result;
            })
            .catch(err => err)
    },
    insert:(obj) => {
        if(obj.pass) obj.pass = bcrypt.hashSync(obj.pass, 10);
        const customer = new Customers(obj);
        return customer.save();
    },
    update:(obj) => {
        return new Promise((resolve,reject) => {
            if(!obj.id) reject("id is required for update");
            return Customers
                .findOneAndUpdate({_id:obj.id},_.omit(obj,['id']))
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    },
    remove:(id) => {
        return Customers.findByIdAndRemove({_id:id});
    }
}

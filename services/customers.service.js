import mongoose from 'mongoose';
import { Customers } from '../models';
import bcrypt from 'bcryptjs';
import _ from 'lodash';

export default {
    findAll:() => {
        return Customers.find({});
    },
    findOne:(id) => {
        return Customers.find({_id:id})
                .then(data => data[0]);
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
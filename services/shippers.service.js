import mongoose from 'mongoose';
import { Shippers } from '../models';
import bcrypt from 'bcryptjs';
import _ from 'lodash';


export default {
    findOne: (id) => {
        return findOne(id);
    },
    findAll: (id) => {
        return Shippers.find();
    },
    findMany: (ids) => {
        return Shippers.find({ _id: { $in: ids } })
    },
    findShipperByInvoiceId: (invoice_Id) => {
        return Shippers.findOne({ invoiceId: invoice_Id })
    },
    findByEmailPass: (email, pass) => {
        return Shippers.findOne({ email })
            .lean()
            .then(shipper => {
                return bcrypt.compare(pass, shipper.pass).then((res) => {
                    if (res) return _.omit(shipper, ['pass']);
                    else return null;
                });
            })
            .catch(err => console.log(err))
    },
}

const findOne = (id) => {
    return Shippers.findOne({ _id: id });
}


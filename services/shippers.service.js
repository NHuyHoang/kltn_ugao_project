import mongoose from 'mongoose';
import { Shippers } from '../models';

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
}

const findOne = (id) => {
    return Shippers.findOne({ _id: id });
}


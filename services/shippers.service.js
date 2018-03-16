import mongoose from 'mongoose';
import { Shippers } from '../models';

export default {
    findOne:(id)=> {
        return findOne(id);
    },
    findAll:(id) => {
        return Shippers.find();
    },
    findShipperByInvoiceId:(invoice_Id) => {
        return Shippers.findOne({invoiceId:invoice_Id})
    },
}

const findOne = (id) => {
    return Shippers.findOne({_id:id});
}
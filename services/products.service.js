import mongoose from 'mongoose';
import { Invoices ,Products } from '../models';

export default {
    findOne:(id)=>{
        return findOne(id);
    },
    findAll:()=>{
        return findAll();
    },
    findMany:(ids) => {
        return findMany(ids);
    },
    findByInvoiceId:(invoice_id) => {
        return Invoices.findOne(invoice_id)
            .catch(err => err)
            .then(invoice => {
                if(invoice.productId.length === 0 ) return [];
                return findMany(invoice.productId);
            })
    },
    findProductByReviewId:(reviewId) => {
        return Products.findOne({ reviews: {$elemMatch:{_id:reviewId}} });
    },
    
}

const findOne = (id) => {
    return Products.findOne({_id:id});
}

const findAll = (id) => {
    return Products.find();
}

const findMany = (ids) => {
    return Products.find({ _id:{ $in: ids }})
}

import mongoose from 'mongoose';
import { Products } from '../models';

export default {
    findOne:(id)=>{
        return findOne(id);
    },
    findAll:()=>{
        return findAll();
    },
    findProductByReviewId:(reviewId) => {
        return Products.findOne({ reviews: {$elemMatch:{_id:reviewId}} });
    }
}

const findOne = (id) => {
    return Products.findOne({_id:id});
}

const findAll = (id) => {
    return Products.find();
}
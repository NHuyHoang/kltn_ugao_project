import mongoose from 'mongoose';
import { Reviews, Customers } from '../models';
import productsSerivce from './products.service';

export default {
    findOne:(id) => {
        return findOne(id);
    },
    findCustomerByReviewId:(reviewId) => {
        return productsSerivce.findProductByReviewId(reviewId)
            .catch(err => err)
            .then(product => {
                let resultReview;
                product.reviews.forEach(review => {
                    if(review._id.toString() === reviewId.toString())
                    {
                        resultReview = review;
                        return;
                    }
                })
                return Customers.findOne({_id:resultReview.customerId})
            })
    }
}

const findOne = (id) => {
    return Reviews.findOne({_id:id})
}
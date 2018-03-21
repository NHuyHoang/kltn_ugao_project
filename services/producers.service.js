import mongoose from 'mongoose';
import { Producers } from '../models';
import  productsService  from './products.service'

export default {
    findOne:(id) => {
        return findOne(id);
    },
    findAll:() => {
        return Producers.find();
    },
    findMany:(ids) => {
        return Producers.find({ 
            _id:{ $in: ids }
        })
    },
    findProducts:(id) => {
        return findOne(id)
            .catch(err => err)
            .then(producer => {
                if(producer.productId === null || producer.productId.length === 0)
                    return [];
                return productsService.findMany(producer.productId)
            })
    },
    findByProductId:(pid) => {
        return Producers.findOne({productId:pid})
    }
}

const findOne = (id) => {
    return Producers.findOne({_id:id});
}
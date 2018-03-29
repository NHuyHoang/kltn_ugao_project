import mongoose from 'mongoose';
import { reviewsSchema } from './reviews'
const Schema = mongoose.Schema;

export const productsSchema = new Schema({
    name: { type: String, required: true },
    type: { type:String },
    description: { type: String },
    info: { type: String},
    weight: { type: Number },
    img: { type: String, required: true },
    price: { type: Number, required: true },
});

export const Products = mongoose.model('Products', productsSchema);

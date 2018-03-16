import mongoose from 'mongoose';
import { reviewsSchema } from './reviews'
const Schema = mongoose.Schema;

export const productsSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    description: { type: String },
    img: { type: String, required: true },
    rating: { type: Number, default: 0 },
    price: { type: Number, required: true },
    reviews: [reviewsSchema]
});

export const Products = mongoose.model('Products', productsSchema);

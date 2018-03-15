import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const reviewsSchema = new Schema({
    content: { type: String, required: true },
    customerId: { type: String, required: true},
    date_review: { type: Date, required: true },
});

export const Reviews = mongoose.model('Reviews', reviewsSchema);

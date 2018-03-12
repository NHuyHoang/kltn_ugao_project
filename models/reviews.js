import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const reviewsSchema = new Schema({
    content: { type: String, required: true },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'customers',
        required: true
    },
    date_review: { type: Date, required: true },
});

export const Reviews = mongoose.model('Reviews', reviewsSchema);

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const producersSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    email: { type: String, required: true },
    description: { type: String },
    img:  { type: String },
    productId:[ String ]
});

export const Producers = mongoose.model('Producers', producersSchema);

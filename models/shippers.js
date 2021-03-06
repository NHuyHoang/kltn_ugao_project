import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const shippersSchema = new Schema({
    name: { type: String, required: true },
    token: { type: String },
    phone: { type: String, required: true },
    address: { type: String },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    img: { type: String, required: true },
    licensePlate: { type: String },
    invoiceId: [String]
});

export const Shippers = mongoose.model('Shippers', shippersSchema);

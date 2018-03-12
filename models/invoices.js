import mongoose from 'mongoose';
import { tasksSchema } from './index'
const Schema = mongoose.Schema;

export const invoiceSchema = new Schema({
    date_order: {type: Date, required: true },
    amount: { type:Number, required: true },
    paid: { type: Boolean, default: false},
    price: { type: Number, required: true},
    payment_method: { type: String },
    productId:[Schema.Types.ObjectId],
    tasks: tasksSchema
});

export const Invoices = mongoose.model('Invoices', invoiceSchema);

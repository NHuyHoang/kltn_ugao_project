import mongoose from 'mongoose';
import { tasksSchema } from './tasks'
const Schema = mongoose.Schema;

export const invoiceSchema = new Schema({
    order_date: {type: Date, required: true },
    paid: { type: Boolean, default: false},
    price: { type: Number, required: true},
    payment_method: { type: String },
    products:[Schema.Types.Mixed],
    tasks: tasksSchema
});

export const Invoices = mongoose.model('Invoices', invoiceSchema);

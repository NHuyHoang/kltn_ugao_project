import mongoose from 'mongoose';
import locationSchema from './locations';
const Schema = mongoose.Schema;

export const tasksSchema = new Schema({
    address: { type: String },
    receipt_date: { type: Date, required: true },
    location: locationSchema
});

export const Tasks = mongoose.model('Tasks', tasksSchema);

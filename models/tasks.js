import mongoose from 'mongoose';
import locationSchema from './locations';
const Schema = mongoose.Schema;

export const tasksSchema = new Schema({
    receipt_date: { type: Date },
    estimationTime: { type: Number },
    location: locationSchema
});

export const Tasks = mongoose.model('Tasks', tasksSchema);

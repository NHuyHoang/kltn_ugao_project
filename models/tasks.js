import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const tasksSchema = new Schema({
    address: { type: String, required: true },
    date_recieved: { type: Date, required: true },
    date_delivered: { type: Date, required: true },
    dest_lat: { type: Number },
    dest_log: { type: Number },
});

export const Tasks = mongoose.model('Tasks', tasksSchema);

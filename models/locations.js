import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default new Schema({
    address: {
        type: String,
        required: true,
    },
    dest_lat: { type: Number },
    dest_log: { type: Number },
});

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default new Schema({
    address: {
        type: String,
        required: true,
    },
    lat: { type: Number },
    lng: { type: Number },
});

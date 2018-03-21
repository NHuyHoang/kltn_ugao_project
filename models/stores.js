import mongoose from 'mongoose';
import locationSchema from './locations';
import { shippersSchema } from './shippers';
import { ownersSchema } from './owners';
const Schema = mongoose.Schema;

export const storesSchema = new Schema({
    location: locationSchema,
    name:String,
    invoiceId:[String],
    owner: ownersSchema,
    storage:[Schema.Types.Mixed],
    shipperId:[String]
});

export const Stores = mongoose.model('Stores', storesSchema);

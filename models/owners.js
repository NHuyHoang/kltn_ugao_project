import mongoose from 'mongoose';
import locationSchema from './locations'
const Schema = mongoose.Schema;

export const ownersSchema = new Schema({
	email:{
		type: String,
		required: [true, 'email is required'],
	},
	name: { 
		type: String, 
		required: [true, 'name is required']
	},
	pass: {
		type: String, 
		required: [true, 'pass is required']
	},
    phone:{
        type:String,
        required:true,
    },
});



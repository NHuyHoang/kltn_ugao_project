import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const customersSchema = new Schema({
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
	img: String,
    phone:{
        type:String,
        required:true,
    },
    address:String,
    invoiceId:[String]
});

export const Customers = mongoose.model('Customers', customersSchema);

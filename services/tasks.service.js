import mongoose from 'mongoose';
import invoicesService from './invoices.service';
import { Tasks } from '../models';

export default {
    findOne:(id) => {
        return findOne();
    },
}

const findOne = () => {
    return Tasks.findOne({_id:id});
}

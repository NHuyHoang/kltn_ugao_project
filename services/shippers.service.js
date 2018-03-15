import mongoose from 'mongoose';
import { Shippers } from '../models';

export default {
    findOne:(id)=> {
        return findOne(id);
    },
    findAll:(id) => {
        return Shippers.find();
    },
    findShipperByInvoiceId:(invoice_Id) => {
        return Shippers.find()
            .then(shippers => {
                let result = null;
                shippers.forEach((shipper) => {
                    if(shipper.invoiceId.length === 0) return null;
                    shipper.invoiceId.forEach((id) => {
                        if(id === invoice_Id){
                            result = Object.assign({}, shipper._doc);
                            return;
                        }
                    });
                    if(result !== null) return;
                })
                return result;
            })
            .catch(err => err)
    },
}

const findOne = (id) => {
    return Shippers.findOne({_id:id});
}
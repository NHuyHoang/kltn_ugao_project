import { Stores } from '../models';
import { invoicesService, shippersService } from '../services'
export default {
    findOne: (id) => {
        return findOne(id);
    },
    findAll: () => {
        return Stores.find()
    },
    findInvoices: (id) => {
        return findOne(id)
            .then(store => {
                return invoicesService.findMany(store.invoiceId)
            })
    },
    findShippers:(id) => {
        return findOne(id)
            .then(store => {
                return shippersService.findMany(store.shipperId)
            })
    },
    findByInvoiceId:(id) => {
        return Stores.findOne({ invoiceId:id })
    }
}

const findOne = (id) => {
    return Stores.findOne({ _id: id })
}
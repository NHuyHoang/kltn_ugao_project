import { shippersService, invoicesService } from '../services';
import { notifyCustomer } from '../services/firebaseAdmin.services';

export default {
    acceptInvoice: (req, res) => {
        const { shipperId, invoiceId, estimationTime } = req.body
        shippersService.findShipperByInvoiceId(invoiceId)
            .then(
                shipper => {
                    if (shipper) {
                        res.send({ success: false, message: "this task have been assigned" });
                        return;
                    }
                    invoicesService
                        .findOne(invoiceId)
                        .then(invoice => {
                            let estTime = invoice.tasks.estimationTime ? invoice.tasks.estimationTime : 0;
                            estTime += estimationTime;
                            shippersService.pushInvoice(shipperId, invoice._id)
                                .then(_ => {
                                    invoicesService.update(invoiceId, { $set: { "tasks.estimationTime": estTime } })
                                        .then(result => {
                                            res.send(result);
                                            notifyCustomer({ invoiceId, estimationTime: estTime })
                                        })
                                })
                                .catch(err => res.status(400).send({ success: false, message: err }))
                        })
                })
            .catch(err => res.status(400).send({ success: false, message: err }))

    }
}
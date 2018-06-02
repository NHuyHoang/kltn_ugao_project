import express from 'express';
import customersRouter from './customers.route';

import invoiceController from '../controllers/invoice.controller';

const rootRouter = express.Router();

rootRouter.use('/customers/', customersRouter);
rootRouter.get("", (req, res) => res.send("graphql link: https://gentle-dawn-11577.herokuapp.com/graphql"));

rootRouter.post('/accept/invoice', invoiceController.acceptInvoice);

export default rootRouter;
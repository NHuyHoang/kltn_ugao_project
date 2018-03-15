import express from 'express';
import customersRouter from './customers.route'
const rootRouter = express.Router();

rootRouter.use('/customers/',customersRouter);
rootRouter.get("",(req,res) => res.send("Home page"));

export default rootRouter;
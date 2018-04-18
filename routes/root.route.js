import express from 'express';
import customersRouter from './customers.route'
const rootRouter = express.Router();

rootRouter.use('/customers/',customersRouter);
rootRouter.get("",(req,res) => res.send("graphql link: https://gentle-dawn-11577.herokuapp.com/graphql"));

export default rootRouter;
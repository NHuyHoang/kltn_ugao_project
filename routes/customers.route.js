import express from 'express'
import controller from '../controllers/customers.controller';

const router = express.Router({ mergeParams: true });
router
    .get("", controller.findAll)
    .post("", controller.insert)
    .put("", controller.update)
    .delete("/:id", controller.remove)
    .get("/:id", controller.findOne)

export default router;
const express = require("express");
const router = express.Router();
const ordersController  = require("../controllers/orders");

router.get('/', ordersController.list);
router.get('/create', ordersController.create);
router.post('/', ordersController.store);
router.get('/:id/edit', ordersController.edit);
router.post('/:id', ordersController.update);
router.post('/:id/delete', ordersController.delete);
router.get('/search', ordersController.search);

module.exports = router;
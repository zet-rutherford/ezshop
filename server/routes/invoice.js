const express = require("express");
const router = express.Router();

const InvoiceController = require("../controllers/api/invoice.controller");

router.post("/", InvoiceController.createInvoice);
router.get("/customer-invoice/:id", InvoiceController.getCustomerInvoices);
router.get("/customer-invoice-detail/:id", InvoiceController.getCustomerInvoiceDetail);

module.exports = router;

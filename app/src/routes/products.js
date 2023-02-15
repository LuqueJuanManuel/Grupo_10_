/* Requires */
const express = require("express");
const router = express.Router();
const controller = require("../controllers/productsController");
const { uploadImageProduct } = require('../middlewares/upload');

/* Ruta a Products */
router.get("/", controller.index);

/* Ruta a ProductDetail */
router.get("/productDetail", controller.productDetail); 

/* Ruta a ProductCart */
router.get("/productCart", controller.productCart);






module.exports = router;
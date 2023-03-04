const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const controller = require("../controllers/usersController");
const autMiddleware = require("../middlewares/autMiddleware");
/*  */
const guestMiddleware = require("../middlewares/guestMiddleware");


/* Ruta a Register */ //
router.get("/register", controller.register);

// Ruta a Login //
router.get("/login" , controller.login);
/*autMiddleware
router.post("/login", [
   check("email").isEmail(),
   check("password").isLength({min:8}).withMessage("la contraseña debe tener mas de 8 caracteres") 
]
, controller.processLogin)

 */


/* pre visualizacion de las vistas*/
router.get('/userHome', controller.userHome);

router.get('/userEdit', controller.userEdit);

module.exports = router;
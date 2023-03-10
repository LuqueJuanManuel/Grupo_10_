const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { processLogin, login, register, processRegister, userHome, userEdit, userEditUpdate } = require("../controllers/usersController");
const { avatarUsers } = require("../middlewares/avatarUsers");
const registerValidator = require("../validations/registerValidator");
const userInSession = require("../middlewares/userInSession");
const loginValidator = require("../validations/loginValidator");
const userEditValidator = require('../validations/userEditValidator');

// Ruta a Login //
router.get("/login",  login);

/* post login user */
router.post("/login", loginValidator,  processLogin);

/* Ruta a Register */
router.get("/register", register);

/* ruta a post register */
router.post("/register", avatarUsers.single("avatar"), registerValidator, processRegister);

/* pre visualizacion de las vistas  */
router.get('/userHome', userHome);
/* get edit form */
router.get('/userHome/userEdit', userEdit);
/* put user edit update */
router.put('/userHome/userEdit',avatarUsers.single("avatar"),userEditValidator, userEditUpdate)

module.exports = router;
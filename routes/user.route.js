const { userRegister, userLogin } = require("../controllers/user.controller");

const router = require("express").Router();

//register route
router.post("/register", userRegister);
router.post("/login", userLogin);

module.exports = router;

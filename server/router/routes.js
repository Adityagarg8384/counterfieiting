const express= require("express");
const {login}= require("../controller/login");
const {register}= require("../controller/register");
const {encrypt}= require("../controller/encrypt");

const router= express.Router();

router.post("/login",login);
router.post("/register", register);
router.post("/encrypt", encrypt);

module.exports=router;
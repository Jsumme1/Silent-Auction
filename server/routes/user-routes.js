const router = require('express').Router();
const { User } = require('../models');
var passport = require("../config/passport");

router.post("/signup", async (req, res) => {
    try {
        let newUser = await User.create(req.body);
        res.json(newUser)
    } catch (error) {
        console.log(error)
    }
})

router.get("/data", function (req, res) {
    if (!req.user) {
        res.json("no user here");
    } else {
        res.json(req.user);
    }
});

module.exports = router
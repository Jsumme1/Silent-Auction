const express = require('express');
const router = express.Router();
const userRoutes = require("./user-routes");
const authRoutes = require("./auth-routes");
const itemRoutes = require("./item-routes");
const eventRoutes = require("./event-routes");

router.use("/item", itemRoutes)
router.use("/event", eventRoutes)
router.use("/user", userRoutes);
router.use("/auth", authRoutes);

module.exports = router
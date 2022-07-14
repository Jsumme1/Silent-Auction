const router = require('express').Router();
//requires express router

//declares variables for each of the route files
const userRoutes = require("./user-routes");
const authRoutes = require("./auth-routes");
const itemRoutes = require("./item-routes");
const eventRoutes = require("./event-routes");

//tells the router in which instance to use the routes
router.use("/item", itemRoutes)
router.use("/event", eventRoutes)
router.use("/user", userRoutes);
router.use("/auth", authRoutes);

//exports the built router
module.exports = router
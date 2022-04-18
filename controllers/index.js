const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

// Set up endpoints for the user and thought routes
router.use("/api/users", userRoutes);
router.use("/api/thoughts", thoughtRoutes);

module.exports = router;
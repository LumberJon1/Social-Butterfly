const router = require("express").Router();
const userRoutes = require("./user-routes");

// Set up endpoints for the user and thought routes
router.use("/api/users", userRoutes);

module.exports = router;
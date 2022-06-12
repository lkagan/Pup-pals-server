const router = require("express").Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const dogRoutes = require("./dog.routes");
const auth = require("../middleware/auth");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/dog", auth, dogRoutes);

module.exports = router;

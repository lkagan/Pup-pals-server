const router = require("express").Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const dogRoutes = require("./dog.routes");
const auth = require("../middleware/auth");
const matchesRoutes = require("./matches.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/user", auth, userRoutes);
router.use("/dog", auth, dogRoutes);
router.use("/matches", auth, matchesRoutes);

module.exports = router;

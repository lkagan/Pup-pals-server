const router = require("express").Router();
const Dog = require("../models/Dog.model");

router.get("/", (req, res, next) => {
    Dog.find()
    .then((dogs) => {
        res.status(200).json(dogs);
    })
    .catch((err) => {
        console.log(err);
    })
})

module.exports = router;
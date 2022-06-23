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

router.get("/find", (req, res, next) => {
    // TODO: filter out own dog and dogs that have already been viewed
    Dog.aggregate([
        { $sample: { size:  1 }},
    ])
    .then((dogs) => {
        res.status(200).json(dogs[0]);
    })
    .catch((err) => {
        console.log(err);
    })
})

module.exports = router;
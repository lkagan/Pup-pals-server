const router = require("express").Router();
const User = require("../models/User.model");
// const fileUploader = require('../config/cloudinary.config');


router.get("/:userID", (req, res) => {
    User.findById(req.params.userID)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.post("/:userID", (req, res) => {
    const { name, age, gender, about } = req.body;
    User.findOneAndUpdate( {_id: req.params.userID},
      { name, age, gender, about },
      { runValidators: true, new: true }
    )
      .then((updatedUser) => {
        res.status(201).json(updatedUser);
      })
      .catch((err) => {
        if (err.errors) {
          res.status(400).json(err.errors);
        };

        res.status(500).send();
      });
  });

  module.exports = router;

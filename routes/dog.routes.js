const router = require("express").Router();
const Dog = require("../models/Dog.model");
const fileUploader = require('../config/cloudinary.config');


/*
- Get the dog - GET -  /dogs/:id 
- Create the dog - POST - : /dogs/
- Update the dog - PUT / PATCH: /dogs/:id
- Delete the dog - DELETE - : /dogs/:id
*/

// Create the dog
router.post("/", (req, res) => {
  const { name, age, size, gender, breed, about } = req.body;
  
  // Create the document 
  Dog.create({ name, age, size, gender, breed, about, user: req.user._id } )
  .then((dog) => {
    res.status(201).json(dog);
  })
  .catch((err) => {
    if (err.errors) {
      res.status(400).json(err.errors);
    };
    res.status(500).send();
  })
})

// Get the dog
router.get("/:dogID", (req, res) => {
    Dog.findById(req.params.dogID)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
      });
  });

// Update the dog
router.put("/:dogID", (req, res) => {
    const { name, age, size, gender, breed, about } = req.body;
   
    Dog.findByIdAndUpdate(
      req.params.dogID,
      { name, age, size, gender, breed, about },
      { new: true }
    )
      .then((updatedDog) => {
        res.status(200).json(updatedDog);
      })
      .catch((err) => {
        if (err.errors) {
          res.status(400).json(err.errors);
        };
        res.status(500).send();
      })
  });

  

  module.exports = router;
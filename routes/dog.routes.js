const router = require("express").Router();
const Dog = require("../models/Dog.model");
// const fileUploader = require('../config/cloudinary.config');


/*
- Get the dog - GET -  /dogs/:id 
- Create the dog - POST - : /dogs/
- Update the dog - PUT / PATCH: /dogs/:id
- Delete the dog - DELETE - : /dogs/:id
*/

// Create the dog
router.post("/", (req, res) => {
  const { name, age, size, gender, breed, about } = req.body;

  // Validate the data
  if (age < 0 || age > 20) {
    res.status(400).json({ message: 'Invalid age' });
  }

  if (breed.length > 100) {
    res.status(400).json({ message: 'Invalid breed' });
  }

  if (about.length > 10000) {
    res.status(400).json({ message: '"About" exceeds maximum length' });
  }

  
  // Create the document 
  Dog.create({ name, age, size, gender, breed, about, user: req.user._id } )
  .then((dog) => {
    console.log(user);
    res.status(201).json(user);
  })
  .catch((err) => {
    res.status(500).send();
    console.log(err);
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
        res.status(201).json(updatedDog);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  module.exports = router;
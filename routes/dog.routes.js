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
  const { imageUrl, name, age, size, gender, breed, about } = req.body;
  console.log(req.body)
  // Create the document 
  Dog.create({imageUrl, name, age, size, gender, breed, about, user: req.user._id } )
  .then((dog) => {
    console.log(dog)
    res.status(201).json(dog);
  })
  .catch((err) => {
    if (err.errors) {
      res.status(400).json(err.errors);
    };
    res.status(500).send();
  })
})

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file);

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});


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
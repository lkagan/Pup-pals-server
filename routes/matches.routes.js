const router = require("express").Router();
const Dog = require("../models/Dog.model");
const View = require("../models/View.model");

router.get("/", async (req, res, next) => {
    try {
        // Get the user's dog.
        const usersDog = await Dog.findOne({ user: req.user._id });

        // Get the dogs' IDs that the owner likes
        const likedViews = await View.find({
            liked: true,
            viewed_for: usersDog._id
        });

        // Get an array of liked dogs ID's
        const likedDogsIds = likedViews.map(dog => dog.viewed_by.toString());

        // Get the liked dogs
        const likedDogs = await Dog.find({ _id: { $in: likedDogsIds } })

        // TODO: Filter liked dogs to those who also liked the user's dog.

        return res.status(200).json(likedDogs);
    } catch (e) {
        console.log(e);
    }

})

router.get("/find", async (req, res, next) => {
    // TODO: filter out dogs that have already been viewed
    try {
        const usersDog = await Dog.findOne({ user: req.user._id });

        // Don't include the user's own dog
        const dogs = await Dog.aggregate([
            { $match: { _id: { $ne: usersDog._id } } },
            { $sample: { size: 1 } }
        ]);

        res.status(200).json(dogs[0]);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.post("/like", async (req, res, next) => {
    console.log('reviewed', req.body);
    try {
        dog = await Dog.findOne({ user: req.user._id });

        await View.create({
            viewed_by: dog._id,
            viewed_for: req.body.dog_id,
            liked: req.body.status === 'liked'
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }

    res.sendStatus(204);
});

module.exports = router;
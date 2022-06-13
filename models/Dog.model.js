const { Schema, model } = require("mongoose");


const dogSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    profilePicture: {
      type: String,
      default: "https://res.cloudinary.com/dticyzm8v/image/upload/v1650121606/profile-picture2_lpzldl.jpg",
    },
    name: {
      type: String,
      unique: true
    },
    age: Number,
    size: {type: String, enum: ["miniature", "small", "medium", "large", "very large"]},    
    gender: {type: String, enum: ["male", "female"]},
    breed: String,
    about: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Dog = model("Dog", dogSchema);

module.exports = Dog;

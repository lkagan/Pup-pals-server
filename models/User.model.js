const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: [true, "Email is required"]},
    password: {type: String, required: [true, "Password is required"]},
   
    name: {type: String},
    age: {type: Number, min: [0, "Age must be greater than 0"], max: 100},
    gender: { type: String, enum: ["male", "female"] },
    about: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

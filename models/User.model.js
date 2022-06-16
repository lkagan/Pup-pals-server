const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: [true, "Emaila is required"]},
    password: {type: String, required: [true, "Password is required"]},
   
    name: {type: String, required: [true, "Name is required"]},
    age: {type: Number, min: [0, "Age must be greater than 0"], max: 100, required: [true, "Age is required"]},
    gender: { type: String, enum: ["Male", "Female"] },
    about: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  addedMovies: [
    {
      type: String,
    },
  ],
});

export default mongoose.model("Admin", adminSchema);

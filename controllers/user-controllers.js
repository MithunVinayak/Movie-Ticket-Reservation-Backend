import User from "../models/User";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find();
  } catch (err) {
    return next(err);
  }

  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occurred!" });
  }

  return res.status(200).json({ users });
};

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }
  const hashedpassword = bcrypt.hashSync(password);
  let user;

  try {
    user = new User({ name, email, password: hashedpassword });
    user = await user.save();
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occurred!" });
  }

  return res.status(201).json({ user });
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }
  const hashedpassword = bcrypt.hashSync(password);
  let user;

  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedpassword,
    });
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occurred!" });
  }
  return res.status(200).json({ message: "Updated Successfully" });
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occurred!" });
  }
  return res.status(200).json({ message: "Removed Successfully" });
};

export const loginUser = async (req, res, next) => {
  const id = req.params.id;
  const { email, password } = req.body;

  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Data" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User Not found" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Password" });
  }

  return res.status(200).json({ message: "Logged In Successfully" });
};

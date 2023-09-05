import Admin from "../models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminSignup = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Data" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingAdmin) {
    return res.status(400).json({ messasge: "Admin Already Exists" });
  }

  let admin;
  const hashedPassword = bcrypt.hashSync(password);
  try {
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (err) {
    return console.log(err);
  }

  if (!admin) {
    return res.status(500).json({ message: "Unable to Store Admin" });
  }

  return res.status(201).json({ admin });
};

export const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Data" });
  }

  let existingadmin;

  try {
    existingadmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (!existingadmin) {
    return res.status(400).json({ message: "Admin not Found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingadmin.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  const token = jwt.sign({ id: existingadmin._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res
    .status(200)
    .json({ message: "Authentication Complete", token, id: existingadmin._id });
};

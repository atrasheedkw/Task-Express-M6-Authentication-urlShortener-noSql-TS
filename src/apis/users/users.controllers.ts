import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT = 10;
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    //steps
    //

    //The user gives an email and password.
    const { username, password } = req.body;

    //let's check if user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
    }

    if (!password) {
      res.status(400).json({ message: "Password is required" });
    }

    //The app transforms the password into a secure, scrambled version (hash).
    // const password = newUser.password;

    const hash = await bcrypt.hash(password, SALT);
    //The app stores the user’s email and hashed password.
    const createdUser = await User.create({
      username,
      password: hash,
    });

    //The app creates a JWT (JSON Web Token) — like a special digital pass.
    const payload = { userId: createdUser._id, username: createdUser.username };
    const secret = process.env.JWT_SECRET!;
    const options = { expiresIn: "1h" };
    const token = jwt.sign({ userId: createdUser._id }, secret, {
      expiresIn: "1h",
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: createdUser, token });

    //The token is sent back to the user.
  } catch (err) {
    next(err);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};

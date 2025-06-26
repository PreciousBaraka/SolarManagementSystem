import { UserType } from "@prisma/client";
import { prisma } from "../config/db.js";
import { userLoginSchema, userSchema } from "../schema/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (req, res) => {
  const { userType } = req.query;

  if (
    !["installer", "manager", "admin", "inventory_officer"].includes(userType)
  ) {
    return res.status(400).json({ message: "Invalid user type" });
  }

  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { fullName, email, password, phoneNumber } = value;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        phoneNumber,
        password: hashedPassword,
        userType:
          userType === "installer"
            ? UserType.INSTALLER
            : userType === "manager"
            ? UserType.MANAGER
            : userType === "admin"
            ? UserType.ADMIN
            : userType === "inventory_officer" && UserType.INVENTORY_OFFICER,
      },
    });
    return res.status(201).json(user);
    // Handle other user types
  } catch (err) {
    console.log("Error registering user:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
export const loginUser = async (req, res) => {
  const { error, value } = userLoginSchema.validate(req.body);
  if (error) {
    console.log("Validation error:", error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }
  const { email, password } = value;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    if (!existingUser.isActive) {
      return res.status(403).json({ message: "User is inactive" });
    }

    const user = {
      id: existingUser.id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      phoneNumber: existingUser.phoneNumber,
      userType: existingUser.userType,
    };

    const token = generateToken(user);
    return res.status(200).json({ token, user });
  } catch (err) {
    console.log("Error logging in user:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        userType: true,
        isActive: true,
      },
    });
    return res.status(200).json(users);
  } catch (err) {
    console.log("Error fetching users:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        installations: true,
        stockOuts: true, 
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log("Error fetching user:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    console.log("Validation error:", error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id },
      include: {
        installations: true,
        stockOuts: true,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        fullName: value.fullName || existingUser.fullName,
        email: value.email || existingUser.email,
        phoneNumber: value.phoneNumber || existingUser.phoneNumber,
      },
      include: {
        installations: true,
        stockOuts: true,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log("Error updating user:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

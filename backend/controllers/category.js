import { prisma } from "../config/db.js";
import { categorySchema } from "../schema/category.js";

export const createCategory = async (req, res) => {
  try {
    const { error, value } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0] });
    }
    const { name } = value;
    const existingCategory = await prisma.category.findFirst({
      where: { name },
    });
    if (existingCategory) {
      return res.staus(400).json({ message: "Category already Exists" });
    }
    const category = await prisma.category.create({
      data: { name },
    });
    return res.status(201).json(category);
  } catch (error) {
    console.log("Error creating Category:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

export const listCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({});
    return res.status(200).json(categories);
  } catch (error) {
    console.log("Error listing categories:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = categorySchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name } = value;
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not Found" });
    }
    const updateCategory = await prisma.category.update({
      where: { id },
      data: { name },
    });
    return res.status(200).json(updateCategory);
  } catch (error) {
    console.log("Error updating category:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not Found" });
    }
    await prisma.category.delete({
      where: { id },
    });
    res.status(204).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log("Error deleting category:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

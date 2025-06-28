import { prisma } from "../config/db.js";
import { productSchema } from "../schema/product.js";

export const createProduct = async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, unit, unitPrice, quantity } = value;
    const existingProduct = await prisma.product.findUnique({
      where: { name },
    });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const product = await prisma.product.create({
      data: {
        name,
        unit,
        unitPrice,
        quantity,
      },
    });
    return res.status(201).json(product);
  } catch (err) {
    console.log("Error creating product:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}
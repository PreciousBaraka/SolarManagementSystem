import { prisma } from "../config/db.js";
import { productSchema } from "../schema/product.js";

export const createProduct = async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, unit, unitPrice, quantity, categoryId } = value;
    const existingProduct = await prisma.product.findFirst({
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
        category: {
          connect: { id: categoryId },
        },
      },
    });
    return res.status(201).json(product);
  } catch (err) {
    console.log("Error creating product:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

export const listProducts = async (req, res) => {
  try {
    const { search, page, limit } = req.query;
    const currentPage = Number(page) || 1;
    const pageSize = Number(limit) || 10;
    const skip = (currentPage - 1) * pageSize;
    let whereClause = {};
    if (search) {
      whereClause = {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            category:{
              name:{
                contains: search,
              }
            }
          }
        ],
      };
    }

    const totalProducts = await prisma.product.count({
      where: whereClause,
    })
    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        category: true,
        supplier: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: pageSize,
    });
    res.status(200).json({totalProducts, products, currentPage, pageSize });
  } catch (error) {
    console.log("Error listing products:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

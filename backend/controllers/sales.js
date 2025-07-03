import { prisma } from "../config/db.js";
import { salesSchema } from "../schema/sales.js";

export const createSale = async (req, res) => {
  try {
    const { error, value } = salesSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const {
      customerId,
      customerName,
      customerPhoneNumber,
      salesPersonId,
      products,
    } = value;

    if (!salesPersonId) {
      return res.status(400).json({ error: "Sales person ID is required" });
    }

    const salesProducts = await Promise.all(
      products.map(async (product) => {
        const { productId, quantity } = product;

        const productDetails = await prisma.product.findUnique({
          where: { id: productId },
        });
        if (!productDetails) {
          return null;
        }
        return {
          productId: productDetails.id,
          quantity,
          price: productDetails.unitPrice,
          totalPrice: productDetails.unitPrice * quantity,
        };
      })
    );

    console.log("sales product", salesProducts);

    // Create the sale
    const newSale = await prisma.sales.create({
      data: {
        customer: customerId ? { connect: { id: customerId } } : undefined,
        customerName: customerName || null,
        customerPhoneNumber: customerPhoneNumber || null,
        salesPerson: { connect: { id: salesPersonId } },
        salesProducts: {
          create: salesProducts
            .filter((prod) => prod !== null)
            .map((product) => ({
              product: { connect: { id: product.productId } },
              quantity: product.quantity,
              price: product.price,
              totalPrice: product.totalPrice,
            })),
        },
      },
      include: {
        salesProducts: true,
      },
    });

    return res.status(201).json(newSale);
  } catch (error) {
    console.error("Error creating sale:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getSales = async (req, res) => {
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
            category: {
              name: {
                contains: search,
              },
            },
          },
        ],
      };
    }

    const totalSales = await prisma.sales.count({
      where: whereClause,
    });
    const sales = await prisma.sales.findMany({
      where: whereClause,
      include: {
        salesProducts: true,
        customer: true,
        salesPerson: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: pageSize,
    });
    res.status(200).json({ totalSales, sales, currentPage, pageSize });
  } catch (error) {
    console.error("Error fetching sales:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await prisma.sales.findUnique({
      where: { id },
      include: {
        salesProducts:{
            include:{
                product:true,
            },
        },
        customer: true,
        salesPerson: true,
      },
    });

    if (!sale) {
      return res.status(404).json({ error: "Sale not found" });
    }

    return res.status(200).json(sale);
  } catch (error) {
    console.error("Error fetching sale:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSale = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSale = await prisma.sales.delete({
      where: { id },
    });

    return res.status(200).json(deletedSale);
  } catch (error) {
    console.error("Error deleting sale:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getSalesBySalesPerson = async (req, res) => {
  const { salesPersonId } = req.params;

  try {
    const sales = await prisma.sales.findMany({
      where: { salesPersonId },
      include: {
        salesProducts :{
            include:{
                product: true,
            }
        },
        customer: true,
        salesPerson: true,
      },
    });

    return res.status(200).json(sales);
  } catch (error) {
    console.error("Error fetching sales by sales person:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getSalesByCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    const sales = await prisma.sales.findMany({
      where: { customerId },
      include: {
        salesProducts: true,
        customer: true,
        salesPerson: true,
      },
    });

    return res.status(200).json(sales);
  } catch (error) {
    console.error("Error fetching sales by customer:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getSalesByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const sales = await prisma.sales.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: {
        salesProducts: true,
        customer: true,
        salesPerson: true,
      },
    });

    return res.status(200).json(sales);
  } catch (error) {
    console.error("Error fetching sales by date range:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

import express from 'express';
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from '../controllers/product.js';

const productRouter = express.Router();

productRouter.post("/create",createProduct)
productRouter.get("/",listProducts);
productRouter.get("/:id", getProductById)
productRouter.put("/:id/update", updateProduct)
productRouter.delete("/:id/delete", deleteProduct)

export default productRouter;
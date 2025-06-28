import express from 'express';
import { createProduct, listProducts } from '../controllers/product.js';

const productRouter = express.Router();

productRouter.post("/create",createProduct)
productRouter.get("/",listProducts);

export default productRouter;
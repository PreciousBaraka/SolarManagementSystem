import express from 'express';
import { createProduct } from '../controllers/product';

const productRouter = express.Router();

productRouter.post("/create",createProduct)

export default productRouter;
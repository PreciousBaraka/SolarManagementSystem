import express from 'express';
import { createCategory, deleteCategory, listCategories, updateCategory } from '../controllers/category.js';

const categoryRouter = express.Router();

categoryRouter.post("/create", createCategory)
categoryRouter.get("/" ,listCategories)
categoryRouter.put("/:id/update", updateCategory)
categoryRouter.delete("/:id/delete",deleteCategory)
export default categoryRouter;
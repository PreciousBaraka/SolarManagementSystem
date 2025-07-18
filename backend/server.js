import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import categoryRouter from "./routes/category.js";
import salesRouter from "./routes/sales.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("The application is running!");
});

// ROUTES
app.use("/api/users", userRouter); 
app.use("/api/products", productRouter);
app.use("/api/categories",categoryRouter);
app.use("/api/sales", salesRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import ExpressError from "./utils/ExpressError.js";
import router from "./routers/chat.js";
import authRoutes from "./routers/auth.js";

const app = express();
const PORT = process.env.PORT || 8080;

main()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => console.log(err));

async function main() {
  try {
    console.log(process.env.MONGOOSE_URL);
    await mongoose.connect(process.env.MONGOOSE_URL);
  } catch (error) {
    console.log("Filed to connect with DB\n" + error);
  }
}
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
// app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api", router);

app.all("*path", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  let { message = "server error not found", statusCode = 500 } = err;
  console.log(err);
  res.status(statusCode).send(message);
});

app.listen(PORT, () => {
  console.log(`server listening port ${PORT}`);
});

import dotenv from "dotenv";
import express from "express";
import vechicle from "./routes/vehicle";
import user from "./routes/user";
import login from "./routes/login";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/", vechicle);
app.use("/", user);
app.use("/", login);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

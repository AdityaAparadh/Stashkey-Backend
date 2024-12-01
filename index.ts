import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.listen(process.env.BACKEND_PORT, () =>
  console.log(`Server Started on port ${process.env.BACKEND_PORT} `),
);

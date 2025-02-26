import express from "express";
import cors from "cors";
import https from "https";
import fs from "fs";
import db from "./db/db";
import AuthRouter from "./routes/AuthRouter";
import VaultRouter from "./routes/VaultRouter";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json()); //For JSON Parsing

db();

//----------------------------------------

app.get("/", (req, res) => {
  res.send("Hello There");
});

app.use("/auth", AuthRouter);
app.use("/vault", VaultRouter);

//----------------------------------------

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Server live at ${process.env.BACKEND_PORT}`);
});

// const sslConfig = {
//   key: fs.readFileSync("certificates/server.key"),
//   cert: fs.readFileSync("certificates/server.crt"),
// };

// const server = https.createServer(sslConfig, app);

// server.listen(process.env.BACKEND_PORT, () =>
//   console.log(`Server live at ${process.env.BACKEND_PORT}`),
// );

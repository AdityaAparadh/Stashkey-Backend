import express from "express";
import cors from "cors";
import https from "https";
import fs from "fs";
import db from "./db/db";
import AuthRouter from "./routes/AuthRouter";
import VaultRouter from "./routes/VaultRouter";

const app = express();

app.use(cors()); // Make sure to restrict CORS on Prod
app.use(express.json()); //For JSON Parsingj

db();

//----------------------------------------

app.get("/", (req, res) => {
  res.send("Hello There");
});

app.use("/auth", AuthRouter);
app.use("/vault", VaultRouter);

//----------------------------------------

const sslConfig = {
  key: fs.readFileSync("cert/server.key"),
  cert: fs.readFileSync("cert/server.crt"),
};

const server = https.createServer(sslConfig, app);

server.listen(process.env.BACKEND_PORT, () =>
  console.log(`Server live at ${process.env.BACKEND_PORT}`),
);

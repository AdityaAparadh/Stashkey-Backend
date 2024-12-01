import express from "express";
import cors from "cors";
import https from "https";
import fs from "fs";

const app = express();

app.use(cors()); // Restrict CORS on Prod

//----------------------------------------

app.get("/", (req, res) => {
  res.send("Hello There");
});

//----------------------------------------

let sslConfig = {
  key: fs.readFileSync("cert/server.key"),
  cert: fs.readFileSync("cert/server.crt"),
};

const server = https.createServer(sslConfig, app);

server.listen(process.env.BACKEND_PORT, () =>
  console.log(`Server live at ${process.env.BACKEND_PORT}`),
);

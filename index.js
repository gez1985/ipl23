const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require("./api/api");
const path = require("path");
require ('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

/* -------------- STATIC ASSETS ---------------- */

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

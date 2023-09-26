const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const connect = require("./config/dbConnection");
const app = express();
app.use(express.json()); // json data
app.use(express.urlencoded({ extended: true })); //form data
app.use(express.static(path.join(__dirname, "public")));
const port = process.env.PORT || 3000;
////////////////////////////////
const db = connect();
app.use(
  cors()
  // {
  // origin: [
  //   "http://localhost:3000",
  //   "http://localhost:5000",
  //   "http://localhost:5501/client/dist",
  // ],
  // credentials: true,
  // }
);
////////////////
app.get("/", (req, res) => {
  res.send({ greetings: "Welcome to our humble idea sharing App" });
});
const ideasRouter = require("./routes/ideasRoute");
app.use("/api/ideas/", ideasRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const cors = require("cors")

// Import routes
const postsRoute = require("./routes/posts");

app.use(cors());
app.use("/posts", postsRoute);
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("HI");
});

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });

app.listen(port);

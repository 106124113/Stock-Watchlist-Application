const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Stock Watchlist Backend Running");
});

const PORT = 5001;
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth",authRoutes);
const watchlistRoutes = require("./routes/watchlistRoutes");
app.use("/api/watchlists", watchlistRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
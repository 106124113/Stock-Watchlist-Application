const express = require("express");

const router = express.Router();

const {
    createWatchlist,
    getWatchlists,
    updateWatchlist,
    deleteWatchlist
} = require("../controllers/watchlistController");

// Authentication Middleware
const auth = require("../middleware/auth");

// Create Watchlist
router.post("/", auth, createWatchlist);

// Get All Watchlists
router.get("/", auth, getWatchlists);

// Update Watchlist
router.put("/:id", auth, updateWatchlist);

// Delete Watchlist
router.delete("/:id", auth, deleteWatchlist);

module.exports = router;
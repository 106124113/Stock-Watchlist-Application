const express = require("express");

const router = express.Router();

const {
    createWatchlist,
    getWatchlists,
    updateWatchlist,
    deleteWatchlist,
    addStock,
    getStocks,
    deleteStock
} = require("../controllers/watchlistController");

// Authentication Middleware
const { verifyToken } = require("../middleware/auth");

// Create Watchlist
router.post("/", verifyToken, createWatchlist);

// Get All Watchlists
router.get("/", verifyToken, getWatchlists);

// Update Watchlist
router.put("/:id", verifyToken, updateWatchlist);

// Delete Watchlist
router.delete("/:id", verifyToken, deleteWatchlist);

//add stocks
router.post("/:id/stocks",verifyToken,addStock);

//get stocks
router.get("/:id/stocks",verifyToken,getStocks);

//delete stock
router.delete("/:id/stocks/:stockId",verifyToken,deleteStock);
module.exports = router;
const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    stocks: [
        {
            symbol: {
                type: String,
                required: true
            },
            companyName: {
                type: String,
                required: true
            }
        }
    ]

});

module.exports = mongoose.model("Watchlist", watchlistSchema);
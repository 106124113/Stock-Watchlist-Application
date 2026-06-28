const Watchlist = require("../models/watchlist");

// Create Watchlist
exports.createWatchlist = async (req, res) => {
    try {

        const { name } = req.body;

        const watchlist = await Watchlist.create({
            name,
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Watchlist created successfully",
            watchlist
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// Get All Watchlists of Logged-in User
exports.getWatchlists = async (req, res) => {

    try {

        const watchlists = await Watchlist.find({
            user: req.user.id
        });

        res.status(200).json({
            success: true,
            watchlists
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Update Watchlist Name
exports.updateWatchlist = async (req, res) => {

    try {

        const watchlist = await Watchlist.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            {
                name: req.body.name
            },
            {
                new: true
            }
        );

        if (!watchlist) {

            return res.status(404).json({
                success: false,
                message: "Watchlist not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Watchlist updated",
            watchlist
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Delete Watchlist
exports.deleteWatchlist = async (req, res) => {

    try {

        const watchlist = await Watchlist.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!watchlist) {

            return res.status(404).json({
                success: false,
                message: "Watchlist not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Watchlist deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
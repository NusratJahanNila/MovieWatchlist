import express from "express";
import { addToWatchlist,   removeFromWatchlist, } from "../controllers/watchlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All watchlist routes require authentication
router.post("/", protect, addToWatchlist);

//update a watchlist item
router.put("/:id", protect, updateWatchlistItem);

//delete a movie from the watchlist
router.delete("/:id", protect, removeFromWatchlist); 
export default router;

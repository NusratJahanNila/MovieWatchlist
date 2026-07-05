import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
  try {
    const { status, rating, notes, movieId } = req.body;

    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = req.user.id;

    // Verify movie exists
    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Check if already added to watchlist using the composite unique key
    const existingWatchlist = await prisma.watchlistItem.findUnique({
      where: {
        userId_movieId: {
          userId: userId,
          movieId: movieId,
        },
      },
    });

    if (existingWatchlist) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

    // Create a new watchlist item
    const watchlistItem = await prisma.watchlistItem.create({
      data: {
        userId: userId,
        movieId: movieId,
        status: status || "PLANNED",
        rating: rating ? parseInt(rating) : null,
        notes: notes || null,
      },
    });

    res.status(201).json({
      status: "success",
      data: { watchlistItem },
    });
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to add movie to watchlist",
      error: error.message,
    });
  }
};

// update watchlist item
const updateWatchlistItem = async (req, res) => {
  const { status, rating, notes } = req.body;

  // Find watchlist item and verify ownership
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  // Ensure only owner can update
  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this watchlist item" });
  }

  // Build update data
  const updateData = {};
  if (status !== undefined) updateData.status = status.toUpperCase();
  if (rating !== undefined) updateData.rating = rating;
  if (notes !== undefined) updateData.notes = notes;

  // Update watchlist item
  const updatedItem = await prisma.watchlistItem.update({
    where: { id: req.params.id },
    data: updateData,
  });

  res.status(200).json({
    status: "success",
    data: {
      watchlistItem: updatedItem,
    },
  });
};

// delete a movie from the watchlist
const removeFromWatchlist = async (req, res) => {
  // Find watchlist item and verify ownership
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  // Ensure only owner can delete
  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this watchlist item" });
  }

  await prisma.watchlistItem.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({
    status: "success",
    message: "Movie removed from watchlist",
  });
};
export { addToWatchlist, removeFromWatchlist };
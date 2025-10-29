import { Request, Response } from "express";
import Movie from "../models/Movie";
import mongoose from "mongoose";

export const addMovie = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const movie = new Movie(payload);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: "Error adding movie", error: String(err) });
  }
};

export const getMovies = async (req: Request, res: Response) => {
  try {
    const page = parseInt((req.query.page as string) ?? "1", 10);
    const limit = Math.min(
      parseInt((req.query.limit as string) ?? "10", 10),
      100
    );

    const skip = (page - 1) * limit;
    const total = await Movie.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const movies = await Movie.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({
      data: movies,
      pagination: {
        page,
        totalPages,
        total,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching movies",
      error: String(err),
    });
  }
};


export const updateMovie = async (req: Request, res: Response) => {
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating movie", error: String(err) });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error deleting movie", error: String(err) });
  }
};

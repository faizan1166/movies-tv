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
    const limit = Math.min(
      parseInt((req.query.limit as string) ?? "20", 10),
      100
    );
    const cursor = req.query.cursor as string | undefined;
    const query: any = {};

    if (cursor && mongoose.Types.ObjectId.isValid(cursor)) {
      query._id = { $lt: new mongoose.Types.ObjectId(cursor) };
    }

    const docs = await Movie.find(query)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .lean();

    let nextCursor: string | null = null;
    if (docs.length > limit) {
      nextCursor = docs[limit]._id.toString();
      docs.splice(limit, 1);
    }

    res.json({ data: docs, nextCursor });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching movies", error: String(err) });
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

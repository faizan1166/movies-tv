import express from 'express';
import { addMovie, getMovies, updateMovie, deleteMovie, searchMovies } from '../controllers/movieController';

const router = express.Router();

router.post('/', addMovie);
router.get('/', getMovies);
router.get("/search", searchMovies);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;

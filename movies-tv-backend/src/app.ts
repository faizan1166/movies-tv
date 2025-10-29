import express from 'express';
import cors from 'cors';
import movieRoutes from './routes/movieRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Movies & TV Shows'));

app.use('/api/movies', movieRoutes);

export default app;

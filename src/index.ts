import express from 'express';
import errorMiddleware from '@/utils/errors/errorMiddleware';
import movieRoutes from '@/movies/movies.routes';

const app = express();

app.use(express.json());
app.use('/api/movie', movieRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT ?? 3000;

export const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "test") console.log(`server listening at ${PORT}`);
});
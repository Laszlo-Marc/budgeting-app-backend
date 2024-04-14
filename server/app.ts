import cors from 'cors';
import express from 'express';
import expenseRoutes from './routes/expenseRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', expenseRoutes);

export default app;

import express from 'express';
import {
    addExpense,
    deleteExpense,
    getExpenseBYID,
    getExpenses,
    updateExpense,
} from '../controller/expenseController';

const router = express.Router();
router.get('/expenses', getExpenses);
router.get('/expenses/:id', getExpenseBYID);
router.post('/expenses', addExpense);
router.put('/expenses/:id', updateExpense);
router.delete('/expenses/:id', deleteExpense);

export default router;

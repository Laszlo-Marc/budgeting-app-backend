import {Request, Response} from 'express';
import http from 'http';
import {expenses} from '../expenseStore';
import {Expense} from '../models/expense';
export const getExpenses = async (req: Request, res: Response) => {
    res.json(expenses);
};

export const getExpenseBYID = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const expense = expenses.find((expense) => expense.id === id);
    if (expense) {
        res.json(expense);
    } else {
        res.status(404).send('Expense not found');
    }
};

export const addExpense = async (req: Request, res: Response) => {
    try {
        const {category, amount, date, description, receiver, account} =
            req.body;
        if (
            !category ||
            !amount ||
            !date ||
            !description ||
            !receiver ||
            !account
        ) {
            return res.status(400).json({message: 'Invalid expense data'});
        } else {
            const newExpense = new Expense(
                expenses.length + 2,
                category,
                amount,
                new Date(date),
                description,
                receiver,
                account,
            );

            expenses.push(newExpense);
            return res.status(201).json(newExpense);
        }
    } catch (error) {
        console.error('Error adding device: ', error);
        return res.status(400).json({message: 'Error adding device'});
    }
};

export const updateExpense = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const expense = expenses.find((expense) => expense.getId() == id);
    if (expense) {
        const {category, amount, date, description, receiver, account} =
            req.body;
        expense.setCategory(category);
        expense.setAmount(amount);
        expense.setDate(new Date(date));
        expense.setDescription(description);
        expense.setReceiver(receiver);
        expense.setAccount(account);
    } else {
        res.status(404).send('Expense not found');
    }
};
export const deleteExpense = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = expenses.findIndex((expense) => expense.id === id);
    if (index > -1) {
        expenses.splice(index, 1);
        res.send('Expense deleted successfully');
    } else {
        res.status(404).send('Expense not found');
    }
};

export const checkInternet = async (req: Request, res: Response) => {
    const options = {
        hostname: 'www.google.com',
        port: 80,
        path: '/',
        method: 'GET',
    };

    const reqHttp = http.request(options, () => {
        res.json({isOnline: true});
    });

    reqHttp.on('error', () => {
        res.json({isOnline: false});
    });

    reqHttp.end();
};

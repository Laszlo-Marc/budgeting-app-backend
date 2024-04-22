/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request, Response} from 'express';
import http from 'http';
import {expenses} from '../stores/expenseStore';
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

        const newExpense = {
            id: expenses.length + 2,
            category: category,
            amount: amount,
            date: date,
            description: description,
            receiver: receiver,
            account: account,
        };
        expenses.push(newExpense);
        return res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error adding expense: ', error);
        return res.status(400).json({message: 'Error adding expense'});
    }
};

export const updateExpense = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const expense = expenses.find((expense) => expense.id == id);
    const {category, amount, date, description, receiver, account} = req.body;
    if (
        !category ||
        !amount ||
        !date ||
        !description ||
        !receiver ||
        !account ||
        isNaN(amount) ||
        typeof description !== 'string' ||
        typeof receiver !== 'string' ||
        typeof account !== 'string' ||
        !(new Date(date) instanceof Date)
    ) {
        return res.status(400).json({message: 'Invalid expense data'});
    } else {
        if (expense) {
            const updatedExpense = {
                id: id,
                category: category,
                amount: amount,
                date: date,
                description: description,
                receiver: receiver,
                account: account,
            };

            // Update the original expense object in the array
            const index = expenses.findIndex((exp) => exp.id === id);
            console.log('Index:', index);
            if (index !== -1) {
                expenses.splice(index, 1, updatedExpense);
            }

            res.status(200).json(updatedExpense);
        } else {
            // Handle case where expense with given id is not found
            res.status(404).json({message: 'Expense not found'});
        }
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

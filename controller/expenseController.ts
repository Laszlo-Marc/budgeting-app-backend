/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request, Response} from 'express';
import http from 'http';
import {ExpenseModel} from '../models/expenseModel';
import {ExpenseRepository} from '../repositories/expenseRepository';

export const expenses = new ExpenseRepository();

export const getExpenses = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 0;
        const allExpenses = await expenses.getExpenses(page);
        res.json(allExpenses);
    } catch (error) {
        console.error('Error getting expenses: ', error);
        return res.status(400).json({message: 'Error getting expenses'});
    }
};

export const getExpenseBYID = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const expense = await ExpenseModel.findById({id: id});
    if (expense) {
        res.json(expense);
    } else {
        res.status(404).send('Expense not found');
    }
};

export const addExpense = async (req: Request, res: Response) => {
    try {
        const {category, amount, date, description, receiver, account, userid} =
            req.body;

        const newExpense = {
            category: category,
            amount: amount,
            date: date,
            description: description,
            receiver: receiver,
            account: account,
            userid: userid,
        };
        expenses.addExpense(newExpense);
        return res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error adding expense: ', error);
        return res.status(400).json({message: 'Error adding expense'});
    }
};

export const updateExpense = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const expense: any = ExpenseModel.findById({id: id});
    const {category, amount, date, description, receiver, account, userid} =
        req.body;
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
            expense.category = category;
            expense.amount = amount;
            expense.date = date;
            expense.description = description;
            expense.receiver = receiver;
            expense.account = account;
            expense.userid = userid;
            await expense.save();
            res.status(200).json(expense);
        } else {
            // Handle case where expense with given id is not found
            res.status(404).json({message: 'Expense not found'});
        }
    }
};
export const deleteExpense = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const expense = ExpenseModel.findById({id: id});
    if (expense) {
        await expense.deleteOne();
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

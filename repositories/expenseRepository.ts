/* eslint-disable @typescript-eslint/no-explicit-any */
import {faker} from '@faker-js/faker';
import {Category, ExpenseModel, IExpense} from '../models/expenseModel';

export class ExpenseRepository {
    public async getExpenses(page: number): Promise<IExpense[]> {
        try {
            const pageSize = 50;
            const skip = page * pageSize;
            const expenses = await ExpenseModel.find({tags: '${uid}'})
                .skip(skip)
                .limit(pageSize);
            return expenses;
        } catch (error) {
            console.log('Error getting expenses: ', error);
            return [];
        }
    }
    public async addExpense(expenseData: unknown): Promise<IExpense> {
        const expense = new ExpenseModel(expenseData);
        await expense.save();
        return expense;
    }
    public async createExpense(): Promise<IExpense> {
        const categories = Object.values(Category);
        const randomCategoryIndex = Math.floor(
            Math.random() * categories.length,
        );
        const randomCategory = categories[randomCategoryIndex];
        const category = randomCategory;
        const amount = faker.number.int(300);
        const date = faker.date.past().toISOString().split('T')[0];
        const description = faker.finance.transactionDescription();
        const receiver = faker.company.name();
        const account = faker.finance.accountName();
        const userid = faker.number.int(100);
        const expenseInfo = {
            category: category,
            amount: amount,
            date: date,
            description: description,
            receiver: receiver,
            account: account,
            userid: userid,
        };
        const expense = new ExpenseModel(expenseInfo);
        await expense.save();
        return expense;
    }
}

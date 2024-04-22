/* eslint-disable @typescript-eslint/no-unused-vars */
import {faker} from '@faker-js/faker';
import {Category, Expense} from '../models/expense';
const generateExpense = () => {
    const categories = Object.values(Category);
    const randomCategoryIndex = Math.floor(Math.random() * categories.length);
    const randomCategory = categories[randomCategoryIndex];
    return {
        category: randomCategory,
        amount: faker.number.int(300),
        date: faker.date.past().toISOString().split('T')[0],
        description: faker.finance.transactionDescription(),
        receiver: faker.company.name(),
        account: faker.finance.accountName(),
    };
};
export const generateExpenses = () => {
    const expenses: Expense[] = [];
    const categories = Object.values(Category); // Get an array of enum values

    for (let i = 1; i <= 100; i++) {
        const expense: Expense = {
            id: i,
            ...generateExpense(),
        };

        expenses.push(expense);
    }

    return expenses;
};
export const expenses: Expense[] = generateExpenses();

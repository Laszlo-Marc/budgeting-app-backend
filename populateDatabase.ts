import {ExpenseRepository} from './repositories/expenseRepository';
import {UserRepository} from './repositories/userRepository';

export async function populateDatabase(
    userReposiory: UserRepository,
    expenseRepository: ExpenseRepository,
) {
    for (let i = 0; i < 1000; i++) {
        const user = await userReposiory.createUser();
        userReposiory.addUser(user);
    }
    for (let i = 0; i < 10000; i++) {
        const expense = await expenseRepository.createExpense();
        expenseRepository.addExpense(expense);
    }
}

import {faker} from '@faker-js/faker';
import {User} from '../models/user';
import {generateExpenses} from './expenseStore';

const generateUsers = () => {
    const users: User[] = [];

    for (let i = 1; i <= 100; i++) {
        const user = {
            id: i,
            name: faker.person.fullName(),
            age: faker.number.int(80),
            email: faker.internet.email(),
            password: faker.internet.password(),
            expenses: generateExpenses(),
        };
        users.push(user);
    }

    return users;
};
export const users: User[] = generateUsers();

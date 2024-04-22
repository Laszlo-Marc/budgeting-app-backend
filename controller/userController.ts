import { Request, Response } from 'express';
import { users } from '../stores/userStore';
export const getUsers = async (req: Request, res: Response) => {
    res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
};

export const addUser = async (req: Request, res: Response) => {
    try {
        const {name, age, email, password, expenses} = req.body;
        if (
            !name ||
            !age ||
            !email ||
            !password ||
            isNaN(age) ||
            typeof email !== 'string' ||
            typeof password !== 'string'
        ) {
            return res.status(400).json({message: 'Invalid user data'});
        } else {
            const newUser = {
                id: users.length + 2,
                name: name,
                age: age,
                email: email,
                password: password,
                expenses: expenses,
            };

            users.push(newUser);
            return res.status(201).json(newUser);
        }
    } catch (error) {
        console.error('Error adding user: ', error);
        return res.status(400).json({message: 'Error adding user'});
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id == id);
    const {name, age, email, password} = req.body;
    if (
        !name ||
        !age ||
        !email ||
        !password ||
        isNaN(age) ||
        typeof email !== 'string' ||
        typeof password !== 'string'
    ) {
        return res.status(400).json({message: 'Invalid user data'});
    } else {
        if (user) {
            user.name = name;
            user.age = age;
            user.email = email;
            user.password = password;

            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    }
};
export const deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index > -1) {
        users.splice(index, 1);
        res.send('User deleted successfully');
    } else {
        res.status(404).send('User not found');
    }
};

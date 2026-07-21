import bcrypt from 'bcrypt';
import { findUserByEmail, createUserRecord } from '../repositories/UserRepository';
import { IUser } from '../models/User';

/**
 * Create/Register a new user in the system.
 */
export const createUserService = async (data: Partial<IUser>): Promise<IUser> => {
    const { name, email, password } = data;

    if (!email || !password || !name) {
        throw new Error('Name, email, and password are required');
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error('Email is already registered');
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save the user
    const createdUser = await createUserRecord({
        name,
        email,
        password: hashedPassword
    });

    return createdUser;
};



export const signInUserService = async (email: string, password: string): Promise<IUser | null> => {
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string' || password.trim().length === 0 || email.trim().length === 0) {
        throw new Error('Please provide both email and password');
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email address');
    }

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
        return null;
    }

    if (!existingUser.password) {
        throw new Error('Password not set for this user');
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
        throw new Error('Invalid email and password');
    }

    return existingUser;
}



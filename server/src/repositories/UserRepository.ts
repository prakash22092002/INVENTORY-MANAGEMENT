import { User, IUser } from '../models/User';

/**
 * Find a user by their email address.
 */
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    return await User.findOne({ email });
};

/**
 * Create a new user in the database.
 */
export const createUserRecord = async (userData: Partial<IUser>): Promise<IUser> => {
    const newUser = new User(userData);
    return await newUser.save();
};


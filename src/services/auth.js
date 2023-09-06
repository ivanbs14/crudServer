import bcrypt from "bcryptjs";

/* Create password */
export const createPasswordHash = async (password) => {
    try {
        const hash = await bcrypt.hash(password, 8);
        return hash;
    } catch (error) {
        throw error;
    }
}

/* checking password */
export const checkPassword = (user, password) => bcrypt.compare(password, user.password);
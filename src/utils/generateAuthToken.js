import jwt from 'jsonwebtoken';

const generateAuthToken = (userId) => {
    return jwt.sign({ userId }, 'secret', { expiresIn: '7 days' });
};

export default generateAuthToken;
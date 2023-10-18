import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Models/UserModel.js'; // Adjust the import path as needed

dotenv.config();

export const userVerification = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ status: false });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
      if (err) {
        return res.json({ status: false });
      } else {
        // Use the decoded token to retrieve user information
        const user = await User.findById(decodedToken.id);

        if (user) {
          console.log("succesful");
        } else {
          return res.json({ status: false });
        }
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

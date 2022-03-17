import model from '../../models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { User } = model;

const login = (req, res) => {
  User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (!user) res.status(400).json({ message: 'User does not exist' });
    else {
      if (!req.body.password)
        res.status(400).json({ message: 'please enter the password' });
      else if (req.body.password != user.password)
        res.status(400).json({ message: 'please enter the valid password' });
      else {
        const token = jwt.sign({ id: user.id }, `${process.env.SECRET_TOKEN}`);
        const userId = user.id;

        res.cookie('userId', userId, {
          httpOnly: true,
          expiresIn: process.env.COOKIE_EXPIRES_IN,
        });
        res.cookie('token', token, {
          httpOnly: true,
          expiresIn: process.env.COOKIE_EXPIRES_IN,
        });
        res.status(200).json({
          message: 'you have successfully logged in',
          token: token,
        });
      }
    }
  });
};

export default login;

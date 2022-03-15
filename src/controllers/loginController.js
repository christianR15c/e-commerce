import model from '../../models';
import jwt from 'jsonwebtoken';

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
        res.header('Authorization', token).json({
          message: 'you have successfully logged in',
          token: token,
        });
      }
    }
  });
};

export default login;

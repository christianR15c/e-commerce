import model from '../../models';
import user from '../../models/user';

const { User } = model;

const register = (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  User.findOne({
    where: { email },
    attributes: {
      exclude: ['password'],
    },
  }).then((user) => {
    user
      ? res.status(400).json({ message: 'user already exist' })
      : User.create({
          name,
          email,
          password,
          isAdmin,
        })
          .then((userData) =>
            res.status(200).json({
              success: true,
              message: 'User successfully created',
              user: {
                name: userData.name,
                email: userData.email,
              },
            })
          )
          .catch((err) => {
            console.log(err), res.json(err);
          });
  });
};

const getAllUsers = (req, res) => {
  return User.findAll({
    attributes: {
      exclude: ['password'],
    },
  }).then((users) => {
    users.length === 0
      ? res.status(500).json({ message: 'No user saved in database' })
      : res.status(200).json({
          users,
        });
  });
};

const getSingleUser = (req, res) => {
  return User.findByPk(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(400).json({ message: `User not found` });
      }
    })
    .catch((error) => console.log(error));
};

const updateUser = (req, res) => {
  const { name } = req.body;
  return User.findByPk(req.params.userId)
    .then((user) => {
      user
        .update({
          name: name || user.name,
        })
        .then((updatedUser) => {
          res.status(200).json({
            message: `user successfully updated`,
            data: {
              user,
            },
          });
        })
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(400).json(error));
};

const deleteUser = (req, res) => {
  return User.findByPk(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: `User not found`,
        });
      } else {
        return user
          .destroy()
          .then(() =>
            res.status(200).json({
              message: `User deleted successfully`,
            })
          )
          .catch((error) => res.status(400).json(error));
      }
    })
    .catch((error) => res.status(400).json(error));
};

export default { register, getAllUsers, getSingleUser, updateUser, deleteUser };

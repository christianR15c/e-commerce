import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      message: 'Only Admin can perform this task',
    });
  }

  try {
    const verified = jwt.verify(token, `${process.env.ADMIN_TOKEN}`);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      message: 'Invalid Token',
    });
  }
};

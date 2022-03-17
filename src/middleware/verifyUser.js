import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      message: 'You have to first login',
    });
  }

  try {
    const verified = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      message: 'Invalid Token',
    });
  }
};

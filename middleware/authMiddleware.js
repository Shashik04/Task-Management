const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('No Authorization header');
    return res.status(401).json({ msg: 'No token' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('No token found after Bearer');
    return res.status(401).json({ msg: 'No token' });
  }

  console.log('Token:', token);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('JWT Verify Error:', error.message);
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

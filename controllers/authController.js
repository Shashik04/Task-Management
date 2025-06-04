const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
      console.log("Incoming Request Body:", req.body); 
  
      const user = new User(req.body);
      await user.save();
  
      console.log(" User Saved:", user);
  
      res.json({ msg: 'User registered' });
    } catch (err) {
      console.error(" Error during registration:", err.message);
      res.status(500).json({ msg: 'Registration failed', error: err.message });
    }
  };
  

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};

const admin = require('../firebase')
const User = require('../models/user')

exports.authCheck = async (req, res, next) => {
  console.log("...............", req.headers)
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    console.log("firebaseUser", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Invalid or expire token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email }).exec();
  if (adminUser.role !== "admin") {
    res.status(403).json({
      error: "Admin resource. Access Denied",
    });
  } else {
    next();
  }
};

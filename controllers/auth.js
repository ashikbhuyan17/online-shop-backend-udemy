const User = require("../models/user");

const createOrUpdateUser = async (req, res, next) => {
  const { email, name, picture } = req.user;
  // if the user already exists in database we not create again
  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );
  if (user) {
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    console.log("user created", newUser);
    res.json(newUser);
  }
};

const currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((error, user) => {
    if (error) throw new Error(error);
    res.json(user);
  });
};

module.exports.createOrUpdateUser = createOrUpdateUser
module.exports.currentUser = currentUser


import * as express from "express";
import User from "../models/User";
import config from "../config";
import * as jwt from "jwt-simple";

const router = express.Router();


router.post("/login", async (req, res) => {
  const { userID, password } = req.body;

  const user = await User.findOne({
    where: { userID },
  });

  if (user) {
    const isValidPassword = user.validPassword(password);
    if (isValidPassword) {
      const token = jwt.encode({ id: user.id, userID: user.userID }, config.auth.key);
      res.json({ data: { token, user }, msg: "Login Success!" });
    } else {
      return res.status(400).json({ msg: "Password is incorrect." });
    }
  } else {
    return res.status(404).json({ msg: "ID is incorrect." });
  }
});

router.post("/signup", async (req, res) => {
  const { userID, password } = req.body;

  const user = await User.findOne({
    where: { userID },
  });

  if (user) {
    return res.status(400).json({ msg: "ID is already registered." });
  }

  const createdUser = await User.create({ userID, password });

  return res.json({
    data: { 
      id: createdUser.id,
      userID: createdUser.userID    
    },
    msg: "You have successfully registered.",
  });
});

export default router;

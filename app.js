const path = require("path");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userModel, postModel } = require("./models");

const server = express();
server.set("view engine", "ejs");

server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded());
server.use(express.static(path.join(__dirname, "public")));

server.get("/", (req, res) => {
  res.render("signup");
});

server.get("/signin", (req, res) => {
  res.render("signin");
});

server.get("/profile", isLoggedIn, async (req, res) => {
  const { email, userId } = req.user;
  const user = await userModel.findOne({ _id: userId }).populate("posts");

  //Can do this 👇🏻 by using populate() method 👆🏻
  //   const posts = await Promise.all(
  //     user.posts.map((postId) => {
  //       const post = postModel.findOne({ _id: postId });
  //       return post;
  //     })
  //   );

  res.render("profile", { user });
});

server.post("/post", isLoggedIn, async (req, res) => {
  const { email, userId } = req.user;
  const { content } = req.body;
  const user = await userModel.findOne({ _id: userId });
  const post = await postModel.create({
    user: user._id,
    content,
  });

  await user.updateOne({ $push: { posts: post } });
  res.redirect("/profile");
});

server.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("Invalid Credentials");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(500).send("Invalid Credentials");

  const token = jwt.sign({ email, userId: user._id }, "secretKey");
  res.cookie("token", token);
  res.redirect("/profile");
  //   res.status(200).send("you can login");
});

server.post("/signup", async (req, res) => {
  const { username, name, email, age, password } = req.body;
  const user = await userModel.findOne({ email });

  if (user) return res.status(500).send("User already registered");

  bcrypt.genSalt(12, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const createdUser = await userModel.create({
        username,
        name,
        email,
        age,
        password: hash,
      });

      const token = jwt.sign({ email, userId: createdUser._id }, "secretKey");
      res.cookie("token", token);
      res.redirect("/signin");
    });
  });
});

server.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/signin");
});

//middleware function:
function isLoggedIn(req, res, next) {
  if (!req.cookies.token) res.redirect("/signin");
  else {
    const data = jwt.verify(req.cookies.token, "secretKey");
    req.user = data;
    next();
  }
}

server.listen(3000, () => {
  console.log("Server is up and ready...");
});

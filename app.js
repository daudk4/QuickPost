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

server.get("/dashboard", isLoggedIn, (req, res) => {
  res.send(req.user);
});

server.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("Invalid Credentials");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(500).send("Invalid Credentials");

//   res.status(200).send("you can login");
  const token = jwt.sign({ email, userId: user._id }, "secretKey");
    res.cookie("token", token);
    res.redirect('/dashboard')

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

//middleware function:
function isLoggedIn(req, res, next) {
  if (!req.cookies.token) res.send("You must be logged in");
  else {
    const data = jwt.verify(req.cookies.token, "secretKey");
    req.user = data;
  }
  next();
}

server.listen(3000, () => {
  console.log("Server is up and ready...");
});

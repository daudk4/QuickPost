const express = require("express");
const { userModel, postModel } = require("./models");

const server = express();

server.get("/", (req, res) => {
  res.send("Listening");
});

server.get("/create", async (req, res) => {
  const createdUser = await userModel.create({
    username: "daudk4",
    email: "daudu6944@gmail.com",
    age: "24",
  });

  res.send(createdUser);
});

server.get("/post/create", async (req, res) => {
  const post = await postModel.create({
    postdata: "Creating my first post in db",
    user: "680c8b65d41e1f346ea01cab",
  });

  const user = await userModel.findOneAndUpdate(
    { _id: "680c8b65d41e1f346ea01cab" },
    { $push: { posts: post._id } },
    { new: true }
  );

  res.send({ post, user });
});

server.get("/delete", async (req, res) => {
  const deletedUser = await userModel.findOneAndDelete({
    email: "daudu6944@gmail.com",
  });

  res.send(deletedUser);
});

server.listen(3000, () => {
  console.log("Server is up and ready...");
});

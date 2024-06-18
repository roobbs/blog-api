#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/users");
const Post = require("./models/posts");

mongoose.set("strictQuery", false);
const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createData();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function createData() {
  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash("blogpassword", 10);

    // Crear usuario
    const user = new User({
      first_name: "Carlos",
      last_name: "Salmeron",
      username: "roobbs",
      password: hashedPassword,
      author: true,
    });

    await user.save();

    console.log("User created: ", user);

    // Crear posts
    const post1 = new Post({
      author: user._id,
      date: new Date(),
      title: "Mi primer post",
      text: "Este es el contenido de mi primer post. Es un gran día para empezar a escribir.",
      published: true,
      label: "react",
      readtime: "5 min",
    });

    const post2 = new Post({
      author: user._id,
      date: new Date(),
      title: "Mi segundo post",
      text: "Este es el contenido de mi segundo post. Estoy disfrutando mucho escribir.",
      published: true,
      label: "react",
      readtime: "5 min",
    });

    await post1.save();
    await post2.save();
  } catch (error) {
    console.error("Error creating data: ", error);
  }
}

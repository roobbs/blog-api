# Blog API

This is the backend for my blog project. It serves as the API for the Blog Frontend application.

## Table of Contents

- [Description](#description)
- [Technologies Used](#technologies-used)
- [Features](#features)

## Description

The Blog API is built using Node.js and Express. It provides endpoints for managing blog posts, user authentication, and other functionalities required by the Blog Frontend. The database is managed with MongoDB, and Mongoose is used for data modeling. User authentication is handled using PassportJS with JWTs (JSON Web Tokens). Passwords are securely stored using bcryptjs.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **PassportJS**: Middleware for authentication.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **bcryptjs**: Library for hashing passwords.

## Features

- **Blog Posts Management**: Create, read, update, and delete blog posts.
- **User Authentication**: Register and log in users.
- **Secure Password Storage**: Passwords are hashed using bcryptjs.
- **Token-based Authentication**: Uses JWTs for user sessions.


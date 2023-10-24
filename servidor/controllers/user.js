const bcrypt = require("bcryptjs");
const User = require("../models/user");
const image = require("../utils/image");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function getMe(req, res) {
  const { user_id } = req.user;

  const response = await User.findById(user_id);

  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado usuario" });
  } else {
    res.status(200).send(response);
  }
}

async function getUsers(req, res) {
  const { active } = req.query;
  let response = null;

  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }

  res.status(200).send(response);
}

async function getUserByNameOrLastName(req, res) {
  const { name } = req.query;
  try {
    let response = await User.find({
      active: true,
      $or: [
        { firstname: new RegExp(name, "i") },
        { lastname: new RegExp(name, "i") },
      ],
    });
    res.status(200).send({ users: response });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createUser(req, res) {
  const { password } = req.body;
  const user = new User({ ...req.body, active: false });

  const salt = bcrypt.genSaltSync(10);
  const hasPassword = bcrypt.hashSync(password, salt);
  user.password = hasPassword;

  user
    .save()
    .then((userStored) => {
      res.status(201).send(userStored);
    })
    .catch((error) => {
      res.status(400).send({ msg: "Error al crear el usuario" });
    });
}

async function updateUser(req, res) {
  const { id } = req.params;
  const userData = req.body;
  if (userData.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password, salt);
    userData.password = hashPassword;
  } else {
    delete userData.password;
  }

  if (userData.avatar && userData.avatar !== "t") {
    if (userData.avatar[1] === "t") {
      userData.avatar = userData.avatar;
    } else {
      userData.avatar = userData.avatar[1];
    }
  }

  try {
    await User.findByIdAndUpdate(id, userData);
    res.status(200).send({ msg: "Actualización correcta" });
  } catch (error) {
    res.status(400).send({ msg: "Error al actualizar el usuario" });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.status(200).send({ msg: "Usuario eliminado" });
    } else {
      res.status(400).send({ msg: "No se encontró el usuario" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error al eliminar el usuario" });
  }
}

module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserByNameOrLastName,
};

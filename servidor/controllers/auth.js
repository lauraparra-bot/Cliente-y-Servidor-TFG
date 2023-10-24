const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");

function register(req, res) {
  const { firstname, lastname, email, creditos, notamedia, experiencia, password } = req.body;

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });
  if (!firstname) res.status(400).send({ msg: "El nombre es obligatorio" });
  if (!lastname) res.status(400).send({ msg: "La apellido es obligatoria" });
  if (!creditos) res.status(400).send({ msg: "Los creditos son obligatorios" });
  if (!notamedia) res.status(400).send({ msg: "La Nota Media es obligatoria" });
  if (!experiencia) res.status(400).send({ msg: "La experiencia es obligatoria" });

  const user = new User({
    firstname: firstname,
    lastname: lastname,
    email: email.toLowerCase(),
    creditos: creditos,
    notamedia: notamedia,
    experiencia: experiencia,
    role: "user",
    active: "false",
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  user.save()
    .then(userStorage => {
      res.status(200).send(userStorage);
    })
    .catch(error => {
      res.status(400).send({ msg: "Error al crear el usuario" });
    });

}

function login(req, res) {
  const { email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

  const emailLowerCase = email.toLowerCase();

  User.findOne({ email: emailLowerCase })
    .then((userStore) => {
      if (!userStore) {
        res.status(400).send({ msg: "Usuario no encontrado" });
      } else {
        bcrypt.compare(password, userStore.password)
          .then((check) => {
            if (!check) {
              res.status(400).send({ msg: "Contraseña incorrecta" });
            } else {
              const accessToken = jwt.createAccessToken(userStore);
              const refreshToken = jwt.createRefreshToken(userStore);
              res.status(200).send({ access: accessToken, refresh: refreshToken });
            }
          })
          .catch((error) => {
            res.status(500).send({ msg: "Error del servidor" });
          });
      }
    })
    .catch((error) => {
      res.status(500).send({ msg: "Error del servidor" });
    });
}

function refreshAccessToken(req, res) {
  const { token } = req.body;

  if (!token) res.status(400).send({ msg: "Token requerido" });

  const { user_id } = jwt.decoded(token);

  User.findOne({ _id: user_id })
    .then((userStorage) => {
      if (!userStorage) {
        res.status(400).send({ msg: "Usuario no encontrado" });
      } else {
        res.status(200).send({
          accessToken: jwt.createAccessToken(userStorage),
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ msg: "Error del servidor" });
    });
}




module.exports = {
  register,
  login,
  refreshAccessToken,
};
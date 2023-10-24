const TfgUser = require("../models/tfguser");
const User = require("../models/user");

const express = require("express");
const cors = require("cors");
const tfg = require("../models/tfg");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function createTempTfgUser(req, res) {
  const { assignedMailUser } = req.body;

  const newtfguser = new TfgUser(req.body);
  newtfguser.Priority = await GetPriority(assignedMailUser);

  await TfgUser.find({ assignedMailUser })
    .exec()
    .then((tfgs) => {
      if (tfgs) {
        if (newtfguser.Priority == 0) {
          res
            .status(201)
            .send({ creado: false, msg: "Ya tienes 5 tfgs elegidos" });
          return;
        } else {
          newtfguser
            .save()
            .then((ntu) => {
              res.status(201).send({
                creado: true,
                msg: "TFG creado correctamente, ve a tu listado",
              });
            })
            .catch((err) => {
              res
                .status(500)
                .send({ msg: "Error al asignar el tfg al usuario " + err });
            });
        }
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Ocurrió un error" + err });
    });
}

async function updateTempTfgUser(req, res) {
  const { assignedMailUser, Priority, titleTFG, ...updatedFields } = req.body;

  // Buscamos el objeto que tiene la nueva prioridad y lo guardamos

  const oldTFGUserWithHisPrio = await TfgUser.findOne({
    assignedMailUser: assignedMailUser,
    Priority: Priority,
    assigned: { $in: ["asignadotemporal"] },
    active: true,
  }).exec();

  // Buscamos el objeto que vamos a actualizar (al que viene por el cuerpo)

  const newTFGUserWithHisPrio = await TfgUser.findOne({
    titleTFG: titleTFG,
    assignedMailUser: assignedMailUser,
    assigned: { $in: ["asignadotemporal"] },
    active: true,
  }).exec();

  // Verificamos si se encontraron los dos objetos
  if (oldTFGUserWithHisPrio && newTFGUserWithHisPrio) {
    // Intercambiamos las prioridades
    const oldPriority = oldTFGUserWithHisPrio.Priority;
    oldTFGUserWithHisPrio.Priority = newTFGUserWithHisPrio.Priority;
    newTFGUserWithHisPrio.Priority = oldPriority;

    // Actualizamos las demás propiedades del nuevo TFGUser con los campos actualizados
    Object.assign(newTFGUserWithHisPrio, updatedFields);

    // Guardamos los cambios en la base de datos
    await oldTFGUserWithHisPrio.save();
    await newTFGUserWithHisPrio.save();

    res
      .status(200)
      .json({ msg: "TFG actualizado correctamente.", creado: true });
  } else {
    res.status(404).json({
      msg: "Ocurrió un error al tratar de actualizar los TFGs",
      creado: false,
    });
  }
}

async function GetPriority(assignedMailUser) {
  const users = await TfgUser.find({
    assignedMailUser: assignedMailUser,
    assigned: { $in: ["asignadotemporal"] },
    active: true,
  })
    .sort({ Priority: 1 })
    .exec();
  if (users.length === 0) {
    return 1; // Si no se encontró ningún usuario, el siguiente número de prioridad disponible es 1.
  }

  const assignedPriorities = new Set(users.map((user) => user.Priority)); // Crear un conjunto con las prioridades asignadas de los usuarios.
  const availablePriorities = [1, 2, 3, 4, 5].filter(
    (p) => !assignedPriorities.has(p)
  ); // Filtrar las prioridades no asignadas.

  if (availablePriorities.length > 0) {
    return availablePriorities[0]; // Devolver la primera prioridad disponible.
  } else {
    return 0; // Si no hay prioridades disponibles, devolver 0.
  }
}

function deleteTempTFGUser(req, res) {
  const { id } = req.params;

  TfgUser.findById(id)
    .then((tfgToDelete) => {
      if (!tfgToDelete) {
        return res
          .status(404)
          .send({ eliminado: false, mensaje: "TFG no encontrado" });
      }

      const priorityToDelete = tfgToDelete.Priority;

      TfgUser.updateMany(
        { Priority: { $gt: priorityToDelete } },
        { $inc: { Priority: -1 } }
      )
        .then(() => {
          TfgUser.findByIdAndDelete(id)
            .then(() => {
              res.status(200).send({ eliminado: true });
            })
            .catch((err) => {
              res.status(500).send({
                eliminado: false,
                mensaje: "Error al eliminar el TFG",
              });
            });
        })
        .catch((err) => {
          res.status(500).send({
            eliminado: false,
            mensaje: "Error al actualizar los TFGs restantes",
          });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ eliminado: false, mensaje: "Error al obtener el TFG" });
    });
}

async function getTempTFGUser(req, res) {
  const { email } = req.query;

  try {
    // Obtener los TFGs temporales del usuario según su dirección de correo electrónico
    const tfgUsers = await TfgUser.find({
      assignedMailUser: email,
      assigned: { $in: ["asignadotemporal", "asignado", "pendiente", "no"] },
      active: true,
    });

    // Obtener los títulos de los TFGs temporales
    const titles = tfgUsers.map((tfgUser) => tfgUser.titleTFG);

    // Obtener los TFGs correspondientes a los títulos encontrados
    const tfgs = await tfg.find({ title: { $in: titles } });

    // Combinar los datos de los TFGs temporales con los datos de los TFGs correspondientes
    const combinedData = tfgUsers.map((tfgUser) => {
      const matchingTfg = tfgs.find((tfg) => tfg.title === tfgUser.titleTFG);
      const { _id, ...matchingTfgWithoutId } = matchingTfg.toObject(); // Excluir la propiedad "_id"
      return {
        ...tfgUser.toObject(),
        tfg_id: matchingTfg._id,
        ...matchingTfgWithoutId,
      };
    });

    // Enviar los datos combinados al cliente
    res.status(200).send({ tfgusers: combinedData });
  } catch (err) {
    // En caso de error, enviar un mensaje de error al cliente
    res.status(400).send({ msg: "No se han podido seleccionar los TFGs" });
    console.error(err);
  }
}

async function closeListTFGs(req, res) {

  const { email } = req.query;
  
  await TfgUser.updateMany(
    {
      assignedMailUser: email,
      assigned: { $in: ["asignadotemporal"] },
      active: true
    },
    { assigned: "pendiente" }
  );

  // Llamada al método closeListTFGs
  const response = await evaluarTFGs(req, res);

  // Enviar la respuesta JSON
  return res.status(200).json({ message: response });
}

async function evaluarTFGs(req, res) {
  const { email } = req.query;

  // Variable para almacenar el resultado final
  let response = null;

  // 1: buscar el listado de prioridades y tfgs que tiene el usuario:
  const tfgUsers = await TfgUser.find({
    assignedMailUser: email,
    assigned: { $in: ["pendiente"] },
    active: true,
    assigned: { $ne: "asignado" },
  });

  tfgUsers.sort((a, b) => a.Priority - b.Priority);

  // 2: Recorrer el listado, si lo hay, que estará ordenado por el campo Priority
  for (const tfgUser of tfgUsers) {
    // 3: Dentro del recorrido de los tfgUsers (Punto 2), buscamos si existe algún registro por el campo titleTFG (del que estoy recorriendo), active igual a true y assigned igual a "asignado" (esto es para buscar otro usuario que tenga un tfg asignado)
    const existingTfgUser = await TfgUser.findOne({
      titleTFG: tfgUser.titleTFG,
      active: true,
      assigned: "asignado",
    });

    if (existingTfgUser) {
      // 3.1: Si lo encuentra (Punto 3), comparamos por el campo Points
      if (tfgUser.Points > existingTfgUser.Points) {
        // hacemos: Actualizamos el registro que estamos recorriendo y cambiamos el estado a asignado
        tfgUser.assigned = "asignado";
        await tfgUser.save();

        // el registro del usuario que tenía el valor asignado lo cambiamos a pendiente
        existingTfgUser.assigned = "no";
        await existingTfgUser.save();

        // Luego con los datos del usuario al que le hemos cambiado el estado de asignado a pendiente (email) hacemos la llamada recursiva para volver a repetir el proceso pasando de nuevo por la query el nuevo email que vamos a procesar.
        response = await evaluarTFGs(
          { query: { email: existingTfgUser.assignedMailUser } },
          res
        );

        // Si se obtuvo una respuesta final, se detiene el bucle y se retorna
        if (response) break;
      } else {
        // 3.2: Si la condición anterior no se cumple (Punto 3.1), actualizamos el campo assigned del registro que estamos recorriendo a pendiente y pasamos a la siguiente iteración.
        tfgUser.assigned = "no";
        await tfgUser.save();
      }
    } else {
      // 4: Si no encuentra el registro (Punto 3), simplemente cambiamos el estado de asignadotemporal a asignado
      tfgUser.assigned = "asignado";
      await tfgUser.save();
      response = "Todos los tfgs se han asignado";
      break;
    }
  }

  // Si no se obtuvo una respuesta final durante el bucle, se asigna el mensaje de "Tienes todos tus tfgs en pendiente"
  if (!response) {
    response = "Tienes todos tus tfgs en pendiente";
  }

  // Retornar la respuesta final
  return response;
}

module.exports = {
  createTempTfgUser,
  closeListTFGs,
  deleteTempTFGUser,
  getTempTFGUser,
  updateTempTfgUser,
};

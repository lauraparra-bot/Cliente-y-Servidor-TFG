const tfg = require("../models/tfg");
const Tfg = require("../models/tfg");
const image = require("../utils/image");
const TfgUser = require("../models/tfguser");

async function createTfg(req, res) {
  const tfg = new Tfg(req.body);

  try {
    const tfgStored = await tfg.save();
    res.status(201).send(tfgStored);
  } catch (error) {
    res.status(400).send({ msg: "Error al crear el TFG" });
  }
}

function getTfg(req, res) {
  const { page = 1, limit = 10, user } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  // Filtrar TfgUser por email y asignados
  TfgUser.find(
    {
      assignedMailUser: user,
      assigned: { $in: ["asignadotemporal", "asignado"] },
      active: true,
    },
    { titleTFG: 1, _id: 0 } // Obtener solo el campo titleTFG
  )
    .then((tfgUsers) => {
      // Obtener los títulos de TfgUser
      const titles = tfgUsers.map((tfgUser) => tfgUser.titleTFG);
      // Filtrar Tfg por títulos excluyendo los de TfgUser
      return Tfg.paginate({ title: { $nin: titles } }, options);
    })
    .then((tfgs) => {
      res.status(200).send(tfgs);
    })
    .catch((error) => {
      res.status(400).send({ msg: "Error al obtener los TFG" });
    });
}

function updateTfg(req, res) {
  const { id } = req.params;
  const tfgData = req.body;

  console.log(tfgData)

  if (tfgData.miniature && tfgData.miniature !== "t") {
    if (tfgData.miniature[1] === "t") {
      tfgData.miniature = tfgData.miniature;
    } else {
      tfgData.miniature = tfgData.miniature[1];
    }
  }

  Tfg.updateOne({ _id: id }, tfgData)
    .then(() => {
      res.status(200).send({ msg: "Actualizacion correcta" });
    })
    .catch((error) => {
      res.status(400).send({ msg: "Error al actualizar el TFG" });
    });
}

function deleteTfg(req, res) {
  const { id } = req.params;

  Tfg.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ msg: "TFG eliminado" });
    })
    .catch((error) => {
      res.status(400).send({ msg: "Error al eliminar el TFG" });
    });
}

module.exports = {
  createTfg,
  getTfg,
  updateTfg,
  deleteTfg,
};

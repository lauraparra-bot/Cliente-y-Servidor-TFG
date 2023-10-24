const express = require("express");
const TfgUserController = require("../controllers/tfguser");
const api = express.Router();
const md_auth = require("../middlewares/authenticated");

api.get("/mistfgs", [md_auth.asureAuth], TfgUserController.getTempTFGUser);
api.post("/mistfgs/crear", [md_auth.asureAuth], TfgUserController.createTempTfgUser);
api.post("/mistfgs/cerrarlistado", [md_auth.asureAuth], TfgUserController.closeListTFGs);
api.put("/mistfgs/actualizar", [md_auth.asureAuth], TfgUserController.updateTempTfgUser);
api.delete("/mistfgs/:id", [md_auth.asureAuth], TfgUserController.deleteTempTFGUser);

module.exports = api;
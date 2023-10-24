const express = require("express");
const multiparty = require("connect-multiparty");
const TfgController = require("../controllers/tfg");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/tfg" });
const api = express.Router();

api.post("/tfg", [md_auth.asureAuth, md_upload], TfgController.createTfg);
api.get("/tfg", TfgController.getTfg);
api.patch("/tfg/:id", [md_auth.asureAuth, md_upload], TfgController.updateTfg);
api.delete("/tfg/:id", [md_auth.asureAuth], TfgController.deleteTfg);

module.exports = api;
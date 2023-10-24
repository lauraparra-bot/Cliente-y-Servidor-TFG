const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const TfgSchema = mongoose.Schema({
    title: String,
    miniature: String,
    description: String,
    url: String,
    tutor: String,
    tecnologias: String,
    asignaturas: String,
    
});

TfgSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Tfg", TfgSchema);
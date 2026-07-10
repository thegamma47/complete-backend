const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({

    tittle:String,
    descreption:String,

})

const noteModel = mongoose.model("note",noteSchema)

module.exports = noteModel
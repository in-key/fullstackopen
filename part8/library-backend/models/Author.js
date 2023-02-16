const mongoose = require("mongoose")

const uniqueValidator = require("mongoose-unique-validator")

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
  bookCount: {
    type: Number,
    required: true,
  },
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model("Author", schema)

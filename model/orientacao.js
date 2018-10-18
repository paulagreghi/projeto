const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrientacaoSchema = Schema({
  aluno: String,
  titulo: String,
  professor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Professor',
    require: true,
  },
});

module.exports = mongoose.model('Orientacao', OrientacaoSchema);

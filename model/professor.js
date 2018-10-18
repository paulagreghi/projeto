const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfessorSchema = Schema({
  nome: String,
  departamento: String,
});

module.exports = mongoose.model('Professor', ProfessorSchema);

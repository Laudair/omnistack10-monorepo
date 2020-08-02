const mongoose = require ('mongoose');
const PointSchema = require ('./utils/PointSchema');

const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    //indice geolacalizacao
    index: '2dsphere'
  }
});

//EXPORTA O NOME 
module.exports = mongoose.model('Dev', DevSchema);
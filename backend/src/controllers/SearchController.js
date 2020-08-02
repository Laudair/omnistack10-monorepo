const Dev = require ('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {
  async index(request, response) {
   const { latitude, longitude, techs} = request.query;
  //search all devs in 10km
  //sort by technologies

  const techsArray = parseStringAsArray(techs);
//list of devs
const devs = await  Dev.find({
 //filtro de techs
  techs: {
    //techs dentro de
    // '$in' mongo operator
    $in:  techsArray,
  },
 location: {
    //objetos perto de uma localizacao
    $near: {
      $geometry: {
        type:'Point',
        coordinates: [longitude, latitude],
      },
      $maxDistance: 10000, // distance max of 10km
    },
 },

});

    return response.json({ devs });
  }
}
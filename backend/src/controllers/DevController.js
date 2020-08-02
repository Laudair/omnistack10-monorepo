const axios = require ('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
// index, show, store, uodate, destroy
module.exports = {
  //list devs registered
async index(request, response){
   const devs = await Dev.find();
   return response.json(devs);
},

  async store (request, response)  {
    //getting github username
    const {github_username, techs, latitude, longitude } = request.body;
    // check if there already is someaone registered with the same username, if not proceed to register
    let dev = await Dev.findOne({github_username});
   
   if (!dev) {
     //adding api github
    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
   
    const{ name = login,  avatar_url,  bio }= apiResponse.data;
    
    //remove comma a blank spaces
    const techsArray = parseStringAsArray(techs);
    
    const location = {
     type: 'Point',
     coordinates: [longitude, latitude],
    };
    //gerando cadastro do dev
    dev = await Dev.create ({
     github_username,
     name,
     avatar_url,
     bio,
     techs: techsArray,
     location,
    })
   
  }
   //retornando os dados do cadastro do dev
    return response.json(dev);
   }

};
const mongoose = require('mongoose');
const StringToArray = require('../utils/StringToArray')
const Dev = mongoose.model('Dev');

module.exports = {
  async index(req, res) {
    const {latitude, longitude, techs} = req.query;

    const techArray = StringToArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      }
    })
    return res.json({devs})
  }
}
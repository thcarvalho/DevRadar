const mongoose = require('mongoose');
const StringToArray = require('../utils/StringToArray')
const api = require('../services/api');

const Dev = mongoose.model('Dev');

module.exports = {
  async storeDevs(req, res) {
    const { github, techs, latitude, longitude } = req.body
    if (await Dev.findOne({ github })) {
      return res.status(400).send({ error: "Usuario já cadastrado" })
    }
    await api.get(github)
      .then(async (response) => {
        const { name = login, bio, avatar_url } = response.data;

        const techArray = StringToArray(techs);
        const location = {
          type: 'Point',
          coordinates: [longitude, latitude],
        };
        const dev = await Dev.create({
          name,
          bio,
          github,
          avatar_url,
          techs: techArray,
          location
        });
        return res.json(dev);
      })
      .catch(error => {
        return res.status(error.response.status).send(error.response.data)
      })
  },
  async indexDevs(req, res) {
    const devs = await Dev.find();
    return res.json(devs)
  },
  async updateDevs(req, res) {
    const {name, techs, latitude, longitude} = req.body;
    const { id } = req.params;
    
    let data = {}
    if (name) {
      data.name = name;
    }
    if (techs) {
      const techArray = StringToArray(techs);
      data.techs = techArray;
    }
    if (latitude && longitude) {
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
      data.location = location;
    }

    const dev = await Dev.findByIdAndUpdate(id, data, { new: true });
    return res.json(dev)
  },
  async destroyDevs(req, res) {
    const { id } = req.params;
    await Dev.findByIdAndRemove(id)
    .then(() => {
      return res.json({ message: "ok" });
    })
    .catch(error => {
      console.log(error.response.data);
    })
  }
}
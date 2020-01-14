const { Router } = require('express');
const routes = Router();

const DevController = require('./controller/DevController')
const SearchController = require('./controller/SearchController')

routes.post('/devs', DevController.storeDevs);
routes.get('/devs', DevController.indexDevs);
routes.put('/devs/:id', DevController.updateDevs);
routes.delete('/devs/:id', DevController.destroyDevs);

routes.get('/search', SearchController.index);

module.exports = routes;

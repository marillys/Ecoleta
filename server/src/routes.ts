import express, { request, response } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();//instaciar classe
const itemsController = new ItemsController();//instaciar classe

routes.get('/items',itemsController.index);
routes.get('/points',pointsController.index);
routes.get('/points/:id',pointsController.show);

//upload de arquivos
routes.post('/points',upload.single('image'), pointsController.create);

export default routes;
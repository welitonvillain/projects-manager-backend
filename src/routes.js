import { Router } from 'express';

import ProfileController from './app/controllers/ProfileController';
import CellController from './app/controllers/CellController';
import ManagementController from './app/controllers/ManagementController';
import AreaController from './app/controllers/AreaController';
import UserController from './app/controllers/UserController';
import TypeController from './app/controllers/TypeController';
import CategoryController from './app/controllers/CategoryController';
import StatusController from './app/controllers/StatusController';
import ProjectController from './app/controllers/ProjectController';
import TypeActivityController from './app/controllers/TypeActivityController';
import ActivityController from './app/controllers/ActivityController';

import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/profiles', ProfileController.store);
routes.post('/managements', ManagementController.store);
routes.post('/cells', CellController.store);
routes.post('/areas', AreaController.store);
routes.post('/users', UserController.store);
routes.post('/types', TypeController.store);
routes.post('/categories', CategoryController.store);
routes.get('/categories/:id', CategoryController.index);
routes.post('/status', StatusController.store);

routes.post('/projects', ProjectController.store);
routes.get('/projects/:title', ProjectController.index);

routes.post('/type-activities', TypeActivityController.store);

routes.post('/activities', ActivityController.store);
routes.get('/activities', ActivityController.index);

export default routes;

import Sequelize from 'sequelize';

import Cell from '../app/models/Cell';
import Profile from '../app/models/Profile';
import User from '../app/models/User';
import Management from '../app/models/Management';
import Area from '../app/models/Area';
import Activity from '../app/models/Activity';
import Category from '../app/models/Category';
import CellArea from '../app/models/CellArea';
import Project from '../app/models/Project';
import Solicitation from '../app/models/Solicitation';
import Status from '../app/models/Status';
import Type from '../app/models/Type';
import TypeActivity from '../app/models/TypeActivity';

import databaseConfig from '../config/database';

const models = [
  User,
  Profile,
  Cell,
  Management,
  Area,
  Activity,
  Category,
  CellArea,
  Project,
  Solicitation,
  Status,
  Type,
  TypeActivity,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();

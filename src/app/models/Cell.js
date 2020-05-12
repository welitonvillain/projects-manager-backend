import Sequelize, { Model } from 'sequelize';

class Cell extends Model {
  static init(sequelize) {
    super.init(
      {
        code: Sequelize.INTEGER,
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.User, { foreignKey: 'cell_id', as: 'users' });

    this.belongsToMany(models.Area, {
      foreignKey: 'cell_id',
      through: 'rel_cell_area',
      as: 'areas',
    });
  }
}

export default Cell;

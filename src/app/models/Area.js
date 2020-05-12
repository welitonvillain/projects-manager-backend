import Sequelize, { Model } from 'sequelize';

class Area extends Model {
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
    this.belongsTo(models.Management, {
      foreignKey: 'management_id',
      as: 'management',
    });

    this.belongsToMany(models.Cell, {
      foreignKey: 'area_id',
      through: 'rel_cell_area',
      as: 'cells',
    });
  }
}

export default Area;

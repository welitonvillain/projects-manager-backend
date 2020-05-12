import Sequelize, { Model } from 'sequelize';

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        code: Sequelize.STRING,
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        initial_date: Sequelize.DATE,
        final_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.CellArea, {
      foreignKey: 'cell_area_id',
      as: 'cell_area',
    });
    this.belongsTo(models.Type, {
      foreignKey: 'type_id',
      as: 'type',
    });
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
    this.belongsTo(models.Status, {
      foreignKey: 'status_id',
      as: 'status',
    });

    this.hasMany(models.Solicitation, {
      foreignKey: 'project_id',
      as: 'solicitations',
    });
    this.hasMany(models.Activity, {
      foreignKey: 'project_id',
      as: 'activities',
    });
  }
}

export default Project;

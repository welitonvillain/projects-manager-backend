import Sequelize, { Model } from 'sequelize';

class Status extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'status',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Project, { foreignKey: 'status_id', as: 'projects' });
  }
}

export default Status;

import Sequelize, { Model } from 'sequelize';

class Management extends Model {
  static init(sequelize) {
    super.init(
      {
        code: Sequelize.INTEGER,
        name: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'managements',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Area, { foreignKey: 'management_id', as: 'areas' });
  }
}

export default Management;

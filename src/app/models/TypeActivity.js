import Sequelize, { Model } from 'sequelize';

class TypeActivity extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'type_activity',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Activity, {
      foreignKey: 'type_id',
      as: 'activities',
    });
  }
}

export default TypeActivity;

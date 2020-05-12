import Sequelize, { Model } from 'sequelize';

class Type extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Project, { foreignKey: 'type_id', as: 'projects' });
  }
}

export default Type;

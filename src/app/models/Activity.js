import Sequelize, { Model } from 'sequelize';

class Activity extends Model {
  static init(sequelize) {
    super.init(
      {
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
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Project, { foreignKey: 'project_id', as: 'project' });
    this.belongsTo(models.TypeActivity, { foreignKey: 'type_id', as: 'type' });
  }
}

export default Activity;

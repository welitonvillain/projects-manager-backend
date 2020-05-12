import Sequelize, { Model } from 'sequelize';

class Solicitation extends Model {
  static init(sequelize) {
    super.init(
      {
        code: Sequelize.STRING,
        title: Sequelize.STRING,
        description: Sequelize.STRING,
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
  }
}

export default Solicitation;

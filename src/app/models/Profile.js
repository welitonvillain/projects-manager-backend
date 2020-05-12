import Sequelize, { Model } from 'sequelize';

class Profile extends Model {
  static init(sequelize) {
    super.init(
      {
        code: Sequelize.INTEGER,
        name: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.User, { as: 'users' });
  }
}

export default Profile;

import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        code: Sequelize.INTEGER,
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Profile, { foreignKey: 'profile_id', as: 'profile' });
    this.belongsTo(models.Cell, { foreignKey: 'cell_id', as: 'cell' });

    this.hasMany(models.Solicitation, {
      foreignKey: 'user_id',
      as: 'solicitations',
    });
    this.hasMany(models.Activity, {
      foreignKey: 'user_id',
      as: 'activities',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;

import { Model } from 'sequelize';

class CellArea extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        tableName: 'rel_cell_area',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Area, { foreignKey: 'area_id', as: 'area' });
    this.belongsTo(models.Cell, { foreignKey: 'cell_id', as: 'cell' });

    this.hasMany(models.Project, {
      foreignKey: 'cell_area_id',
      as: 'projects',
    });
  }
}

export default CellArea;

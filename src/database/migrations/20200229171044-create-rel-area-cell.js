module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rel_cell_area', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cell_id: {
        type: Sequelize.INTEGER,
        references: { model: 'cells', key: 'id' },
        allowNull: false,
      },
      area_id: {
        type: Sequelize.INTEGER,
        references: { model: 'areas', key: 'id' },
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('rel_cell_area');
  },
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(`patient`, {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: `user`,
          key: `id`,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      medical_history: {
        type: Sequelize.TEXT('medium'),
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(`CURRENT_TIMESTAMP`),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(`CURRENT_TIMESTAMP`),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable(`patient`);
  },
};

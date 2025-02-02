module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(`appointment`, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: `user`,
          key: `id`,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      patient_id: {
        type: Sequelize.INTEGER,
        references: {
          model: `patient`,
          key: `id`,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      appointment_date: {
        type: Sequelize.DATE,
      },
      appointment_duration: {
        type: Sequelize.INTEGER,
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(`appointment`);
  },
};

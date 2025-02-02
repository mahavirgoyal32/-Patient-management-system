/* eslint-disable no-plusplus */
/** @type {import('sequelize-cli').Seeder} */
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = [];

    // Generate 5 Admins
    for (let i = 1; i <= 5; i++) {
      users.push({
        name: `Admin ${i}`,
        email: `admin${i}@example.com`,
        password: hashedPassword,
        contact_number: `98765432${i}`,
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // Generate 5 Doctors
    for (let i = 1; i <= 5; i++) {
      users.push({
        name: `Doctor ${i}`,
        email: `doctor${i}@example.com`,
        password: hashedPassword,
        contact_number: `91234567${i}`,
        role: 'doctor',
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // Generate 5 Patients
    for (let i = 1; i <= 5; i++) {
      users.push({
        name: `Patient ${i}`,
        email: `patient${i}@example.com`,
        password: hashedPassword,
        contact_number: `98654321${i}`,
        role: 'patient',
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('user', users);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('user', null, {});
  },
};

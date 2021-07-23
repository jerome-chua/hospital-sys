const moment = require('moment');
const readCsvFn = require('./csv-data.js');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const dataImport = readCsvFn();

      const seedDoctors = [];
      const seedPatients = [];
      const seedAppointments = [];
      
      const doctors = await queryInterface.bulkInsert('doctors', seedDoctors, {returning: true});
      const patients = await queryInterface.bulkInsert('patients', seedPatients, {returning: true});
      const appointments = await queryInterface.bulkInsert('appointments', seedAppointments, {returning: true});;

    } catch (err) {
      console.log("Error while uploading seed:", err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('appointments', null, {});
    await queryInterface.bulkDelete('doctors', null, {});
    await queryInterface.bulkDelete('patients', null, {});
  }
};

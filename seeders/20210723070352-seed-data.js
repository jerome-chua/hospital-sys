const moment = require('moment');
const readCsvFn = require('./csv-data.js');

const formatDate = function(dateStr) {
  const dateSplit = dateStr.split(' ');
  let datePart = dateSplit[0];
  let day = datePart.slice(0,2);
  let month = datePart.slice(2,4);
  let year = datePart.slice(4);
  const timePart = dateSplit[1].slice(0,5);

  const dateFormat = `${year}-${month}-${day}T${timePart}`;

  return new Date(dateFormat);
}

module.exports = {
  up: async (queryInterface) => {
    try {
      const dataImport = await readCsvFn();

      const seedDoctors = [];
      const seedPatients = [];
      const seedAppointments = [];
      const seedAdmins = []

      for (let i = 1; i < dataImport.doctors.length; i += 1) {
        const [id, name, email, password] = dataImport.doctors[i];
        seedDoctors.push({
          name,
          email,
          password, 
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      for (let i = 1; i < dataImport.patients.length; i += 1) {
        const [id, name, age, gender] = dataImport.patients[i];
        seedPatients.push({
          name,
          age: Number(age),
          gender,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      for (let i = 1; i < dataImport.appointments.length; i += 1) {
        const [id, doctor_id, patient_id, start_datetime, end_datetime] = dataImport.appointments[i];
        
        seedAppointments.push({
          doctor_id: Number(doctor_id),
          patient_id: Number(patient_id),
          start_datetime: formatDate(start_datetime),
          end_datetime: formatDate(end_datetime),
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      const adminOne = {
        name: 'James Tan',
        email: 'james@admin.com',
        password: 'password',
        created_at: new Date(),
        updated_at: new Date(),
      }

      seedAdmins.push(adminOne);

      const doctors = await queryInterface.bulkInsert('doctors', seedDoctors, {returning: true});
      const patients = await queryInterface.bulkInsert('patients', seedPatients, {returning: true});
      const appointments = await queryInterface.bulkInsert('appointments', seedAppointments, {returning: true});
      const admins = await queryInterface.bulkInsert('admins', seedAdmins, {returning: true});


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

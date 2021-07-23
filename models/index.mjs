import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

import initDoctorModel from './doctor.mjs';
import initPatientModel from './patient.mjs';
import initAppointmentModel from './appointment.mjs';

const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Create models for DB.
db.Doctor = initDoctorModel(sequelize, Sequelize.DataTypes);
db.Patient = initPatientModel(sequelize, Sequelize.DataTypes);
db.Appointment = initAppointmentModel(sequelize, Sequelize.DataTypes);

// M-M relationships.
db.Patient.belongsToMany(db.Doctor, {through: db.Appointment, foreignKey: 'patientId'});
db.Doctor.belongsToMany(db.Patient, {through: db.Appointment, foreignKey: 'doctorId'});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
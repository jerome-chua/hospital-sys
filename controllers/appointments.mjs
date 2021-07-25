import moment from 'moment';
import { arrayParser } from 'pg-types';

export default function initAppointmentsController(db) {
  const login = async (req, res) => {
    try {
      res.render('login')
    } catch (err) {
      console.log(err);
    }
  }

  const loginAuth = async (req, res) => {
    try { 
      const { email, password } = req.body;

      const admin = await db.Admin.findOne({
        where: { 
          email 
        },
      });

      if (password == admin.dataValues.password) {
        res.redirect('/allappointments'); 
      } else {
        res.render('login')
      }
    } catch (err) {
      console.log(err);
    }
  }

  const mapNames = (id, toMap) => {
    const docPatient = Object.values(toMap)
    for (let i=0; i<docPatient.length; i+=1) {
      if (id === docPatient[i].dataValues.id) {
        return docPatient[i].dataValues.name
      }
    }
  }

  const allAppointments = async (req, res) => {
    try {
      const appointments = await db.Appointment.findAll();
      const doctors = await db.Doctor.findAll();
      const patients = await db.Patient.findAll();
      
      appointments.forEach((row) => {
        row.dataValues.doctorId = mapNames(row.dataValues.doctorId, doctors);
        row.dataValues.patientId = mapNames(row.dataValues.patientId, patients);
        row.dataValues.startDatetime = moment(row.startDatetime).format('Do MMMM YYYY | hA')
        row.dataValues.endDatetime = moment(row.endDatetime).format('Do MMMM YYYY | hA')
      })

      res.render('all-appointments', { appointments, doctors })
    } catch (err) {
      console.log(err);
    }
  }

  return {
    login,
    loginAuth,
    allAppointments,
  }
}
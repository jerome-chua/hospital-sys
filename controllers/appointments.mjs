import moment from 'moment';

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
    const { doctorId } = req.query;

    try {
      let appointments = await db.Appointment.findAll();
      const doctors = await db.Doctor.findAll();
      const patients = await db.Patient.findAll();

      if (isNaN(Number(doctorId)) == false) {
        appointments = appointments.filter(app => app.doctorId === Number(doctorId));
      }

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

  const removeAppointment = async (req, res) => {
    const { appId } = req.params;
    try {
      const toDelete = await db.Appointment.destroy({
        where: {
          id: appId,
        },
      });      

      res.redirect('/allappointments')
    } catch (err) {
      console.log(err);
    }
  }

  const editAppointment = async (req, res) => {
    const { appId } = req.params;
    try {
      res.render('edit-appointment');
    } catch (err) {
      console.log(err);
    }
  }
  
  const fixAppointment = async (req, res) => {
    try {
      const appointments = await db.Appointment.findAll();
      const doctors = await db.Doctor.findAll();
      const patients = await db.Patient.findAll();

      res.render('fix-appointment', { doctors, patients });
    } catch (err) {
      console.log(err);
    }
  }


  return {
    login,
    loginAuth,
    allAppointments,
    removeAppointment,
    editAppointment,
    fixAppointment,
  }
}
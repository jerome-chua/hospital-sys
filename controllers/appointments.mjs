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

  const allAppointments = async (req, res) => {
    try {
      const appointments = await db.Appointment.findAll();

      appointments.forEach((i) => {
        i.dataValues.startDatetime = moment(i.startDatetime).format('Do MMMM YYYY | hA')
      })

      res.render('all-appointments', { appointments })
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
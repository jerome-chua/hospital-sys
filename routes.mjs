import db from './models/index.mjs';

import initAppointmentsController from './controllers/appointments.mjs';

export default function bindRoutes(app) {
  const AppointmentsController = initAppointmentsController(db);

  // Login
  app.get('/login', AppointmentsController.login);
  app.post('/login', AppointmentsController.loginAuth);
  // Get appointments
  app.get('/allappointments', AppointmentsController.allAppointments);
  // Delete appointments
  app.delete('/removeapp/:appId', AppointmentsController.removeAppointment);
}
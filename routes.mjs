import db from './models/index.mjs';

import initAppointmentsController from './controllers/appointments.mjs';

export default function bindRoutes(app) {
  const AppointmentsController = initAppointmentsController(db);

  // Login
  app.get('/login', AppointmentsController.login);
  app.post('/login', AppointmentsController.loginAuth);
  // Get appointments (Get)
  app.get('/allappointments', AppointmentsController.allAppointments);
  // Delete appointments (Remove)
  app.delete('/removeapp/:appId', AppointmentsController.removeAppointment);
  // Update appointments (Edit)
  app.get('/updateappointment/:appId', AppointmentsController.updateAppointment)
  app.put('/updateappointment', AppointmentsController.editAppointment)
  // Post appointments (Fix)
  app.get('/fixappointment', AppointmentsController.fixAppointmentFill)
  app.post('/fixappointment', AppointmentsController.fixAppointmentSave)
}
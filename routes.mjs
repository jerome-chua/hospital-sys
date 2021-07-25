import db from './models/index.mjs';

import initAppointmentsController from './controllers/appointments.mjs';

export default function bindRoutes(app) {
  const AppointmentsController = initAppointmentsController(db);

  app.get('/login', AppointmentsController.login);
  app.post('/login', AppointmentsController.loginAuth)
}
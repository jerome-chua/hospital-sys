import db from './models/index.mjs';

import initAppointmentsController from './controllers/appointment.mjs';

export default function bindRoutes(app) {
  const AppointmentsController = initAppointmentsController(db);

  app.get('/login', AppointmentsController.login);
}
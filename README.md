# Hospital Appointment System

## Steps to run program:

- Open terminal
- `git clone https://github.com/jerome-chua/hospital-sys.git hospital-test`
- `cd hospital-test`
- `npm i`
- Go to `config.js` under config directory, update username to your local username
- Run the following to get database, tables, seed data running:

  - `npx sequelize db:create`
  - `npx sequelize db:migrate`
  - `npx sequelize db:seed:all`

- Run application:

  - `npx nodemon index.mjs`
  - Go to http://localhost:3004/login in browser

- Admin details:
  - Email: james@admin.com
  - Password: password

## Case Study:

User stories:

- Patient will have attributes such as name, age, etc.
- A patient can consult multiple doctors and vice-versa.
- A patient can have multiple appointments with doctors.
- Doctors also will have access to their appointments with patients.
- An appointment will have the details such as date & time, consulting doctor, patient, etc.
- While fixing the appointment:
  - Doctor's consultation duration is 1hr
  - Doctor's consultation time will be between 8am - 4pm

Functionality:

- Get all appointments for the given doctor & date
- Fix appointment by patient, doctor and date & time
- Cancel appointment by patient, doctor and date & time

Assumptions:

- All appointments are an hour long
- Every doctor's schedule is fixed from 8am - 4pm
- Administrator is the only one that can edit appointments
- It is more important that there are no clashes in doctor's schedule rather than the patient's

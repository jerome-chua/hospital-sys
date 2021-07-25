export default function initAppointmentsController(db) {
  const login = async (req, res) => {
    try {

      res.send("Good")
    } catch (err) {
      console.log(err);
    }
  }

  return {
    login,
  }
}
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
      console.log("EMAIL: ". email)

      const admin = await db.Admin.findOne({
        where: { 
          email 
        },
      });

      console.log("USER =====", admin);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    login,
    loginAuth
  }
}
const controller = {
    login:(req, res) => {
      res.render('users/login')
      },
      register:(req, res) => {
        res.render('users/registrarse')
        },
        restore:(req, res) => {
          res.render('users/restaurarContraseña')
          },
      
}

module.exports = controller;
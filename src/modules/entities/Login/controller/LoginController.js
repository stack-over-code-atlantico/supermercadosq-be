const LoginService = require('@login/services/LoginService');

const loginService = new LoginService();

class LoginController {
  async singIn (req, res) {
    const { email, senha } = req.body;
    const login = await loginService.singIn(email, senha);
    console.log(login);
    return res.send();
  }
}

module.exports = LoginController;
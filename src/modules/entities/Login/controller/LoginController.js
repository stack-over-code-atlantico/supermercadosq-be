const LoginService = require('@login/services/LoginService');

const loginService = new LoginService();

class LoginController {
  async signin(req, res) {
    const { email, senha } = req.body;
    const login = await loginService.signin(email,senha);
    return res.json(login);
  }
}

module.exports = LoginController;
const LoginService = require('@login/services/LoginService');

const loginService = new LoginService();

class LoginController {
  async signin(req, res) {
    const { id_usuario } = req
    const { ativo } = req.params;
    const { email, senha } = req.body;
    const login = await loginService.signin(id_usuario, ativo, email, senha);

    if(login instanceof Error) {
      return res.status(401).json(login.message);
    }
    return res.json(login);
  }
}

module.exports = LoginController;
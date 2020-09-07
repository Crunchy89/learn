"use strict";

const { validateAll } = use("Validator");
const User = use("App/Models/User");

class AuthController {
  async login({ request, auth, response }) {
    const rules = {
      email: "required|email",
      password: "required|min:6",
    };

    const messages = {
      "email.required": "Email tidak boleh kosong",
      "email.email": "Format email tidak valid",
      "password.required": "Password tidak boleh kosong",
      "password.min": "Password minimal 6 karakter",
    };
    const validation = await validateAll(request.all(), rules, messages);

    if (validation.fails()) {
      const send = validation.messages();
      let data = {};
      send.map((row) => {
        data = { ...data, [row.field]: row.message };
      });
      return response.json({
        status: false,
        message: "Error",
        data: data,
      });
    }
    let { email, password } = request.all();

    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy("email", email);
        let token = await auth.generate(user);

        Object.assign(user, token);
        return response.json({
          status: true,
          message: "Berhasil Login",
          data: token,
        });
      }
    } catch (e) {
      console.log(e);
      return response.json({
        status: false,
        message: "Email atau password salah",
      });
    }
  }
  async register({ request, auth, response }) {
    const rules = {
      role_id: "required",
      username: "required|unique:users,username",
      email: "required|email|unique:users,email",
      password: "required|min:6",
    };

    const messages = {
      "role_id.required": "Role tidak boleh kosong",
      "username.required": "Username tidak boleh kosong",
      "username.unique": "Username sudah terdaftar",
      "email.required": "Email tidak boleh kosong",
      "email.email": "Format email tidak valid",
      "email.unique": "Email ini sudah terdaftar.",
      "password.required": "Password tidak boleh kosong",
      "password.min": "Minimal 6 karakter",
    };
    const validation = await validateAll(request.all(), rules, messages);

    if (validation.fails()) {
      return response.status(500).json(validation.messages());
    }
    const users = request.only(["role_id", "username", "email", "password"]);

    const user = new User();
    user.role_id = users.role_id;
    user.username = users.username;
    user.email = users.email;
    user.password = users.password;

    await user.save();

    return response
      .status(201)
      .json({ status: true, message: "Akun terdaftar" });
  }
}

module.exports = AuthController;

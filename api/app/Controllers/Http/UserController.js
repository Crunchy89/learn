"use strict";

const { validateAll } = use("Validator");
const User = use("App/Models/User");

class UserController {
  async index({ auth, response }) {
    const users = await User.all();
    return response.status(200).json({
      status: true,
      message: "List all user",
      data: users,
    });
  }

  async getByRole({ auth, params, response }) {
    const users = await User.query().where("role_id", params.id).fetch();
    return response.status(200).json({
      status: true,
      message: "List user by role",
      data: users,
    });
  }

  async show({ auth, params, response }) {
    const users = await User.find(params.id);
    if (users) {
      return response
        .status(200)
        .json({ status: true, message: "Detail User", data: users });
    }
    return response
      .status(404)
      .json({ status: false, message: "Data tidak ditemukan" });
  }

  async store({ request, auth, response }) {
    const rules = {
      role_id: "required",
      username: "required|unique:users,username",
      email: "required|email|unique:users,email",
      password: "required",
    };

    const messages = {
      "role_id.required": "Role tidak boleh kosong",
      "username.required": "Username tidak boleh kosong",
      "username.unique": "Username sudah terdaftar",
      "email.required": "Email tidak boleh kososng",
      "email.email": "Format email tidak valid",
      "email.unique": "Email ini sudah terdaftar.",
      "password.required": "Password tidak boleh kosong",
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
      .json({ status: true, message: "Data berhasil ditambah" });
  }

  async update({ auth, params, request, response }) {
    const rules = {
      role_id: "required",
      username: "required",
      email: "required",
    };

    const messages = {
      "role_id.required": "Role tidak boleh kosong",
      "username.required": "Username tidak boleh kosong",
      "email.required": "Email tidak boleh kososng",
      "email.email": "Format email tidak valid",
    };
    const validation = await validateAll(request.all(), rules, messages);

    if (validation.fails()) {
      return response.status(500).json(validation.messages());
    }
    const users = request.only(["role_id", "username", "email"]);

    const user = await User.find(params.id);
    if (!user) {
      return response.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }
    user.role_id = users.role_id;
    user.username = users.username;
    user.email = users.email;

    await user.save();

    return response.status(200).json({
      success: true,
      message: "Data Berhasil di update",
    });
  }

  async delete({ params, response }) {
    const user = await User.find(params.id);
    if (!user) {
      return response.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }
    await user.delete();

    return response
      .status(204)
      .json({ success: true, message: "Data berhasil dihapus" });
  }
}

module.exports = UserController;

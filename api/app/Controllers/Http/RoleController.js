"use strict";

const { validate } = use("Validator");
const Role = use("App/Models/Role");

class RoleController {
  async index({ auth, response }) {
    const roles = await Role.all();
    return response.status(200).json({
      status: true,
      message: "List All Role",
      data: roles,
    });
  }
  async show({ auth, params, response }) {
    const roles = await Role.find(params.id);
    if (roles) {
      return response
        .status(200)
        .json({ status: true, message: "Detail Role", data: roles });
    }
    return response
      .status(404)
      .json({ status: false, message: "Data tidak ditemukan" });
  }

  async store({ request, auth, response }) {
    const rules = {
      role: "required",
    };

    const messages = {
      "role.required": "Role tidak boleh kosong",
    };
    const validation = await validate(request.all(), rules, messages);

    if (validation.fails()) {
      return response.json(validation.messages());
    }
    const roles = request.only(["role"]);

    const role = new Role();
    role.role = roles.role;

    await role.save();

    return response
      .status(201)
      .json({ status: true, message: "Data berhasil ditambah" });
  }

  async update({ auth, params, request, response }) {
    const rules = {
      role: "required",
    };

    const messages = {
      "role.required": "Role tidak boleh kosong",
    };
    const validation = await validate(request.all(), rules, messages);

    if (validation.fails()) {
      return response.status(500).json(validation.messages());
    }
    const roles = request.only(["role"]);

    const role = await Role.find(params.id);
    if (!role) {
      return response.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }
    role.role = roles.role;

    await role.save();

    return response.status(200).json({
      success: true,
      message: "Data Berhasil di update",
    });
  }

  async delete({ params, response }) {
    const role = await Role.find(params.id);
    if (!role) {
      return response.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }
    await role.delete();

    return response
      .status(204)
      .json({ success: true, message: "Data berhasil dihapus" });
  }
}

module.exports = RoleController;

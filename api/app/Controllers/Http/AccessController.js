"use strict";

const Access = use("App/Models/Access");
const Role = use("App/Models/Role");
const Menu = use("App/Models/Menu");
const Submenu = use("App/Models/SubMenu");
class AccessController {
  async index({ auth, response }) {
    const access = Access.all();
    response.status(200).json({
      status: true,
      message: "List access",
      data: access,
    });
  }

  async getByRole({ params, auth, response }) {
    const access = Access.query().where("role_id", params.id).fetch();
    response.status(200).json({
      status: true,
      message: "List Access by role",
      data: access,
    });
  }
}

module.exports = AccessController;

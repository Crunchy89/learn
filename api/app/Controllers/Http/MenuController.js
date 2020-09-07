"use strict";

const { validateAll } = use("Validator");
const Menu = use("App/Models/Menu");
class MenuController {
  async index({ auth, response }) {
    const menu = await Menu.all();
    return response.status(200).json({
      status: true,
      message: "List all Menu",
      data: menu,
    });
  }
  async show({ auth, params, response }) {
    const menus = await Menu.find(params.id);
    if (menus) {
      return response
        .status(200)
        .json({ status: true, message: "Detail Menu", data: menus });
    }
    return response
      .status(404)
      .json({ status: false, message: "Data tidak ditemukan" });
  }

  async listMenu({ auth, response }) {
    const menu = await Menu.query()
      .select([
        "menus.id",
        "menus.title",
        "menus.icon",
        "menus.link",
        "menus.order",
        "accesses.menu_id",
      ])
      .innerJoin("accesses", "menus.id", "accesses.menu_id")
      .where("accesses.role_id", auth.user.role_id)
      .where("menus.isActive", 1)
      .orderBy("menus.order", "ASC")
      .with("submenu")
      .fetch();

    response.status(200).json({
      status: true,
      message: "List menu",
      data: menu,
    });
  }

  async store({ request, auth, response }) {
    const rules = {
      title: "required",
      icon: "required",
      link: "required",
      isActive: "required",
      order: "required",
    };

    const messages = {
      "title.required": "title tidak boleh kosong",
      "icon.required": "icon tidak boleh kosong",
      "link.required": "link tidak boleh kosong",
      "isActive.required": "isActive tidak boleh kosong",
      "order.required": "order tidak boleh kosong",
    };
    const validation = await validateAll(request.all(), rules, messages);

    if (validation.fails()) {
      return response.status(500).json(validation.messages());
    }
    const menus = request.only(["title", "icon", "link", "isActive", "order"]);

    const menu = new Menu();
    menu.title = menus.title;
    menu.icon = menus.icon;
    menu.link = menus.link;
    menu.isActive = menus.isActive;
    menu.order = menus.order;

    await menu.save();

    return response
      .status(201)
      .json({ status: true, message: "Data berhasil ditambah" });
  }

  async update({ auth, params, request, response }) {
    const rules = {
      title: "required",
      icon: "required",
      link: "required",
      isActive: "required",
      order: "required",
    };

    const messages = {
      "title.required": "title tidak boleh kosong",
      "icon.required": "icon tidak boleh kosong",
      "link.required": "link tidak boleh kosong",
      "isActive.required": "isActive tidak boleh kosong",
      "order.required": "order tidak boleh kosong",
    };
    const validation = await validate(request.all(), rules, messages);

    if (validation.fails()) {
      return response.status(500).json(validation.messages());
    }
    const menus = request.only(["title", "icon", "link", "isActive", "order"]);

    const menu = await Menu.find(params.id);
    if (!menu) {
      return response.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }
    menu.title = menus.title;
    menu.icon = menus.icon;
    menu.link = menus.link;
    menu.isActive = menus.isActive;
    menu.order = menus.order;

    await menu.save();

    return response.status(200).json({
      success: true,
      message: "Data Berhasil di update",
    });
  }

  async delete({ params, response }) {
    const menu = await Menu.find(params.id);
    if (!menu) {
      return response.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }
    await menu.delete();

    return response
      .status(204)
      .json({ success: true, message: "Data berhasil dihapus" });
  }
}

module.exports = MenuController;

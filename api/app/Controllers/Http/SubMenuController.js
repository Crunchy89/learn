"use strict";

const Submenu = user("App/Models/SubSubmenu");

class SubSubmenuController {
  async index({ auth, response }) {
    const submenu = await Submenu.all();
    return response.status(200).json({
      status: true,
      message: "List all submenu",
      data: submenu,
    });
  }

  async show({ auth, params, response }) {
    const submenus = await Submenu.find(params.id);
    if (submenus) {
      return response
        .status(200)
        .json({ status: true, message: "Detail Submenu", data: submenus });
    }
    return response
      .status(404)
      .json({ status: false, message: "Data tidak ditemukan" });
  }

  async getByMenu({ auth, params, response }) {
    const submenu = await Submenu.query().where("menu_id", params.id).fetch();
    return response.status(200).json({
      status: true,
      message: "List submenu by menu",
      data: submenu,
    });
  }

  async store({ request, auth, response }) {
    const rules = {
      menu_id: "required",
      title: "required",
      icon: "required",
      link: "required",
      isActive: "required",
      order: "required",
    };

    const messages = {
      "menu_id.required": "menu id tidak boleh kosong",
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
    const submenus = request.only([
      "menu_id",
      "title",
      "icon",
      "link",
      "isActive",
      "order",
    ]);

    const submenu = new Submenu();
    submenu.title = submenus.menu_id;
    submenu.title = submenus.title;
    submenu.icon = submenus.icon;
    submenu.link = submenus.link;
    submenu.isActive = submenus.isActive;
    submenu.order = submenus.order;

    await submenu.save();

    return response
      .status(201)
      .json({ status: true, message: "Data berhasil ditambah" });
  }

  async update({ auth, params, request, response }) {
    const rules = {
      menu_id: "required",
      title: "required",
      icon: "required",
      link: "required",
      isActive: "required",
      order: "required",
    };

    const messages = {
      "menu_id.required": "menu_id tidak boleh kosong",
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
    const submenus = request.only([
      "menu_id",
      "title",
      "icon",
      "link",
      "isActive",
      "order",
    ]);

    const submenu = await Submenu.find(params.id);
    if (!submenu) {
      return response.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }
    submenu.menu_id = submenus.menu_id;
    submenu.title = submenus.title;
    submenu.icon = submenus.icon;
    submenu.link = submenus.link;
    submenu.isActive = submenus.isActive;
    submenu.order = submenus.order;

    await menu.save();

    return response.status(200).json({
      success: true,
      message: "Data Berhasil di update",
    });
  }

  async delete({ params, response }) {
    const submenu = await Submenu.find(params.id);
    if (!submenu) {
      return response.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }
    await submenu.delete();

    return response
      .status(204)
      .json({ success: true, message: "Data berhasil dihapus" });
  }
}

module.exports = SubSubmenuController;

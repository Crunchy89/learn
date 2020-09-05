"use strict";

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Hash = use("Hash");

class RoleSeeder {
  async run() {
    Factory.blueprint("App/Models/Role", async () => {
      return {
        role: "admin",
      };
    });
    const role = await Factory.model("App/Models/Role").create();
    let role_id = role.id;

    Factory.blueprint("App/Models/Menu", async () => {
      return {
        title: "Admin Menu",
        icon: "fa fa-fw fa-desktop",
        isActive: 1,
        link: "#",
        order: 1,
      };
    });

    const menu = await Factory.model("App/Models/Menu").create();
    let menu_id = menu.id;

    Factory.blueprint("App/Models/Access", async () => {
      return {
        menu_id: menu_id,
        role_id: role_id,
      };
    });

    Factory.blueprint("App/Models/SubMenu", async (faker, i) => {
      return {
        menu_id: menu_id,
        title: [
          "Role Management",
          "User Management",
          "Menu Management",
          "Access Management",
        ][i],
        icon: [
          "fa fa-fw fa-cogs",
          "fa fa-fw fa-users",
          "fa fa-fw fa-code",
          "fa fa-fw fa-lock",
        ][i],
        isActive: 1,
        link: ["role", "user", "menu", "access"][i],
        order: [1, 2, 3, 4][i],
      };
    });

    const submenu = await Factory.model("App/Models/SubMenu").createMany(4);

    const access = await Factory.model("App/Models/Access").create();
  }
}

module.exports = RoleSeeder;

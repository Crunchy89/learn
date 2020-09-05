"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MenuSchema extends Schema {
  up() {
    this.create("menus", (table) => {
      table.increments();
      table.string("title", 80).nullable();
      table.string("icon", 80).nullable();
      table.integer("isActive", 11).nullable();
      table.integer("order", 11).nullable();
      table.string("link", 80).nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("menus");
  }
}

module.exports = MenuSchema;

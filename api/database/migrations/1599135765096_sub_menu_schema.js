"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SubMenuSchema extends Schema {
  up() {
    this.create("sub_menus", (table) => {
      table.increments();
      table.string("title", 80).nullable();
      table
        .integer("menu_id")
        .unsigned()
        .references("id")
        .inTable("menus")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("icon", 80).nullable();
      table.integer("isActive", 11).nullable();
      table.integer("order", 11).nullable();
      table.string("link", 80).nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("sub_menus");
  }
}

module.exports = SubMenuSchema;

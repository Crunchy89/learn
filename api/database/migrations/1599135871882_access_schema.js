"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AccessSchema extends Schema {
  up() {
    this.create("accesses", (table) => {
      table.increments();
      table
        .integer("role_id")
        .unsigned()
        .references("id")
        .inTable("roles")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("menu_id")
        .unsigned()
        .references("id")
        .inTable("menus")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("accesses");
  }
}

module.exports = AccessSchema;

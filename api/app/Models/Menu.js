"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Menu extends Model {
  submenu() {
    return this.hasMany("App/Models/SubMenu");
  }
  access() {
    return this.belongsToMany("App/Models/Access");
  }
}

module.exports = Menu;

"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Role extends Model {
  users() {
    return this.hasMany("App/Models/User");
  }
  access() {
    return this.belongsToMany("App/Models/Access");
  }
}

module.exports = Role;

"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Access extends Model {
  role() {
    return this.belongsTo("App/Models/Role");
  }
  menu() {
    return this.belongsTo("App/Models/Menu");
  }
}

module.exports = Access;

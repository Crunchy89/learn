"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return "Selamat Datang di API CopasCode";
});

Route.group(() => {
  Route.get("/getAll", "UserController.index");
  Route.get("/getUser", "UserController.getUser");
  Route.get("/getByRole/:id", "UserController.getByRole");
  Route.get("/getById/:id", "UserController.show");
  Route.post("/store", "UserController.store");
  Route.put("/update/:id", "UserController.update");
  Route.delete("/delete/:id", "UserController.delete");
})
  .prefix("api/user")
  .middleware("auth");

Route.group(() => {
  Route.get("/getAll", "RoleController.index");
  Route.get("/getById/:id", "RoleController.show");
  Route.post("/store", "RoleController.store");
  Route.put("/update/:id", "RoleController.update");
  Route.delete("/delete/:id", "RoleController.delete");
})
  .prefix("api/role")
  .middleware("auth");

Route.group(() => {
  Route.get("/getAll", "MenuController.index");
  Route.get("/getById/:id", "MenuController.show");
  Route.get("/getMenu", "MenuController.listMenu");
  Route.post("/store", "MenuController.store");
  Route.put("/update/:id", "MenuController.update");
  Route.delete("/delete/:id", "MenuController.delete");
})
  .prefix("api/menu")
  .middleware("auth");

Route.group(() => {
  Route.get("/getAll", "SubmenuController.index");
  Route.get("/getById/:id", "SubmenuController.show");
  Route.get("/getByMenu/:id", "SubmenuController.getByMenu");
  Route.post("/store", "SubmenuController.store");
  Route.put("/update/:id", "SubmenuController.update");
  Route.delete("/delete/:id", "SubmenuController.delete");
})
  .prefix("api/submenu")
  .middleware("auth");

Route.group(() => {
  Route.get("/getAll", "AccessController.index");
  Route.get("/getById/:id", "AccessController.show");
  Route.post("/store", "AccessController.store");
  Route.put("/update/:id", "AccessController.update");
  Route.delete("/delete/:id", "AccessController.delete");
})
  .prefix("api/access")
  .middleware("auth");

Route.group(() => {
  Route.post("/login", "AuthController.login");
  Route.post("/register", "AuthController.register");
}).prefix("api/auth");

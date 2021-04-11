const express = require("express");
const DashboarController = require("./controllers/DashboardController");
const JobController = require("./controllers/JobController");
const ProfileController = require("./controllers/ProfileController");

const routes = express.Router();

routes.get("/", DashboarController.index);
routes.get("/job", JobController.list);
routes.post("/job", JobController.save);
routes.get("/job/:id", JobController.show);
routes.post("/job/:id", JobController.update);
routes.post("/job/delete/:id", JobController.delete);
routes.get("/profile", ProfileController.index);
routes.post("/profile", ProfileController.update);

module.exports = routes;
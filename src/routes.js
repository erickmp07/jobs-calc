const express = require("express");
const JobController = require("./controllers/JobController");
const ProfileController = require("./controllers/ProfileController");

const routes = express.Router();

routes.get("/", JobController.index);
routes.get("/job", JobController.list);
routes.post("/job", JobController.save);
routes.get("/job/:id", JobController.show);
routes.post("/job/:id", JobController.update);
routes.post("/job/delete/:id", JobController.delete);
routes.get("/profile", ProfileController.index);
routes.post("/profile", ProfileController.update);

module.exports = routes;
const express = require("express");

const routes = express.Router();

const basePath = `${__dirname}/views/`;

routes.get("/", (request, response) => {
    return response.render(`${basePath}index`);
});

routes.get("/job", (request, response) => {
    return response.render(`${basePath}job`);
});

routes.get("/job/edit", (request, response) => {
    return response.render(`${basePath}job-edit`);
});

routes.get("/profile", (request, response) => {
    return response.render(`${basePath}profile`);
});

module.exports = routes;
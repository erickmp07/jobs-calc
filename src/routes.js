const express = require("express");

const routes = express.Router();

const basePath = `${__dirname}/views`;

routes.get("/", (request, response) => {
    return response.sendFile(`${basePath}/index.html`);
});

routes.get("/job", (request, response) => {
    return response.sendFile(`${basePath}/job.html`);
});

routes.get("/job/edit", (request, response) => {
    return response.sendFile(`${basePath}/job-edit.html`);
});

routes.get("/profile", (request, response) => {
    return response.sendFile(`${basePath}/profile.html`);
});

module.exports = routes;
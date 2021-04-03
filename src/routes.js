const express = require("express");

const routes = express.Router();

const basePath = `${__dirname}/views/`;

const profile = {
    "name": "Erick",
    "avatar": "https://avatars.githubusercontent.com/u/16216886?v=4",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4
};

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
    return response.render(`${basePath}profile`, { profile });
});

module.exports = routes;
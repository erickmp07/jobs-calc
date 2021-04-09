const express = require("express");

const routes = express.Router();

const basePath = `${__dirname}/views/`;

const profile = {
    "name": "Erick",
    "avatar": "https://github.com/erickmp07.png",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4
};

const jobs = [];

routes.get("/", (request, response) => {
    return response.render(`${basePath}index`);
});

routes.get("/job", (request, response) => {
    return response.render(`${basePath}job`);
});

routes.post("/job", (request, response) => {
    jobs.push(request.body);

    return response.redirect("/");
});

routes.get("/job/edit", (request, response) => {
    return response.render(`${basePath}job-edit`);
});

routes.get("/profile", (request, response) => {
    return response.render(`${basePath}profile`, { profile });
});

module.exports = routes;
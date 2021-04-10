const express = require("express");

const routes = express.Router();

const basePath = `${__dirname}/views/`;

const profile = {
    "name": "Erick",
    "avatar": "https://github.com/erickmp07.png",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "hour-value": 75
};

const Job = {
    data: [],
    controllers: {
        index(request, response) {
            const updatedJobs = Job.data.map((job) => {
                const remainingDays = Job.services.remainingDays(job);
                const status = remainingDays <= 0
                    ? "done"
                    : "progress";

                return {
                    ...job,
                    remaining,
                    status,
                    budget: profile["hour-value"] * job["total-hours"]
                };
            });

            return response.render(`${basePath}index`, { jobs: updatedJobs });
        },
        list(request, response) {
            return response.render(`${basePath}job`);
        },
        save(request, response) {
            const jobId = Job.data[Job.data.length - 1]?.id + 1 || 1;

            jobs.push({
                id: jobId,
                name: request.body.name,
                "daily-hours": request.body["daily-hours"],
                "total-hours": request.body["total-hours"],
                createdAt: Date.now()
            });

            return response.redirect("/");
        }
    },
    services: {
        remainingDays(job) {
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

            const createdDate = new Date(job.createdAt);

            const dueDay = createdDate.getDate() + Number(remainingDays);
            const dueDateInMs = createdDate.setDate(dueDay);

            const timeDiffInMs = dueDateInMs - Date.now();

            const dayInMs = 1000 * 60 * 60 * 24;

            const dayDiff = Math.floor(timeDiffInMs / dayInMs);

            return dayDiff;
        }
    }
};

const jobs = [];

routes.get("/", Job.controllers.index);

routes.get("/job", Job.controllers.list);

routes.post("/job", Job.controllers.save);

routes.get("/job/edit", (request, response) => {
    return response.render(`${basePath}job-edit`);
});

routes.get("/profile", (request, response) => {
    return response.render(`${basePath}profile`, { profile });
});

module.exports = routes;
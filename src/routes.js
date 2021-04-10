const express = require("express");

const routes = express.Router();

const basePath = `${__dirname}/views/`;

const Profile = {
    data: {
        name: "Erick",
        avatar: "https://github.com/erickmp07.png",
        "monthly-budget": 3000,
        "hours-per-day": 5,
        "days-per-week": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },
    controllers: {
        index(request, response) {
            return response.render(`${basePath}profile`, { profile: Profile.data });
        },
        update(request, response) {
            const data = request.body;

            const weeksPerYear = 52;

            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

            const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

            const monthlyTotalHours = weeksPerMonth  * weekTotalHours;

            data["value-hour"] = data["monthly-budget"] / monthlyTotalHours;

            Profile.data = data;

            return response.redirect("/profile");
        }
    }
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
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
                };
            });

            return response.render(`${basePath}index`, { jobs: updatedJobs });
        },
        list(request, response) {
            return response.render(`${basePath}job`);
        },
        save(request, response) {
            const jobId = Job.data[Job.data.length - 1]?.id + 1 || 1;

            Job.data.push({
                id: jobId,
                name: request.body.name,
                "daily-hours": request.body["daily-hours"],
                "total-hours": request.body["total-hours"],
                createdAt: Date.now()
            });

            return response.redirect("/");
        },
        showDetail(request, response) {
            const jobId = request.params.id;

            const job = Job.data.find(job => Number(job.id) === Number(jobId));
            if (!job) {
                return response.send("Job not found.");
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"]);

            return response.render(`${basePath}job-edit`, { job });
        },
        update(request, response) {   
            const jobId = request.params.id;

            const job = Job.data.find(job => Number(job.id) === Number(jobId));
            if (!job) {
                return response.send("Job not found.");
            }

            const updatedJob = {
                ...job,
                name: request.body.name,
                "total-hours": request.body["total-hours"],
                "daily-hours": request.body["daily-hours"]
            };

            Job.data = Job.data.map(job => {
                if (Number(job.id) === Number(jobId)) {
                    job = updatedJob;
                }

                return job;
            });

            response.redirect(`/job/${jobId}`);
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
        },
        calculateBudget(job, hourValue) {
            return hourValue * job["total-hours"];
        }
    }
};

routes.get("/", Job.controllers.index);
routes.get("/job", Job.controllers.list);
routes.post("/job", Job.controllers.save);
routes.get("/job/:id", Job.controllers.showDetail);
routes.post("/job/:id", Job.controllers.update);
routes.get("/profile", Profile.controllers.index);
routes.post("/profile", Profile.controllers.update);

module.exports = routes;
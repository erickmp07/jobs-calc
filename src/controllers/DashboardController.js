const Job = require("../models/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../models/Profile");

module.exports = {
    index(request, response) {
        const jobs = Job.get();
        const profile = Profile.get();
    
        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0
                ? "done"
                : "progress";
    
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            };
        });
    
        return response.render("index", { jobs: updatedJobs });
    }
};
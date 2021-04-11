const Job = require("../models/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../models/Profile");

module.exports = {
    index(request, response) {
        const jobs = Job.get();
        const profile = Profile.get();

        let statusCounts = {
            progress: 0,
            done: 0,
            total: jobs.length
        };
    
        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0
                ? "done"
                : "progress";

            statusCounts[status] += 1;
    
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            };
        });
    
        return response.render("index", { 
            jobs: updatedJobs, 
            profile: profile,
            statusCounts: statusCounts 
        });
    }
};
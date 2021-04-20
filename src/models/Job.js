const database = require("../db/config");

let data = [];

module.exports = {
    async get() {
        const db = await database();

        const jobs = await db.all(`SELECT * FROM job`);

        await db.close();

        return jobs.map(job => ({
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            createdAt: job.created_at
        }));
    },
    update(newJob) {
        data = newJob;
    },
    delete(id) {
        data = data.filter(job => Number(job.id) !== Number(id));
    },
    create(newJob) {
        data.push(newJob);
    }
};
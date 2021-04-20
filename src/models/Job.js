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
    async create(newJob) {
        const db = await database();

        await db.run(`INSERT INTO job (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.createdAt}
        )`);

        await db.close();
    }
};
const database = require("../db/config");

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
    async update(newJob) {
        const db = await database();

        await db.run(`UPDATE job SET
            name = "${newJob.name}",
            daily_hours = ${newJob["daily-hours"]},
            total_hours = ${newJob["total-hours"]},
            created_at = ${newJob.createdAt}
        WHERE id = ${newJob.id}
        `);

        await db.close();
    },
    async delete(id) {
        const db = await database();

        db.run(`DELETE FROM job WHERE id = ${id}`);

        await db.close();
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
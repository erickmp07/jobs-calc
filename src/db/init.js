const database = require("./config");

const initDb = {
    async init() {
        const db = await database();

        await db.exec(`CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour REAL
        )`);

        await db.exec(`CREATE TABLE job (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`);

        await db.run(`INSERT INTO profile (
            name,
            avatar,
            monthly_budget,
            days_per_week,
            hours_per_day,
            vacation_per_year
        ) VALUES (
            "Erick",
            "https://github.com/erickmp07.png",
            15000,
            5,
            8,
            2
        );`);

        await db.close();
    }
};

initDb.init();
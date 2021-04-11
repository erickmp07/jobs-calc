let data = [];

module.exports = {
    get() {
        return data;
    },
    update(newJobs) {
        data = newJobs;
    },
    delete(id) {
        data = data.filter(job => Number(job.id) !== Number(id));
    }
};
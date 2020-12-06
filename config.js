const env = process.env;

export default {
    nodeEnv: env.nodeEnv || "development",
    port: env.PORT || "5000",
    host: env.HOST || "0.0.0.0",
    database: {
        host: env.RDS_HOSTNAME || "localhost",
        username: env.RDS_USERNAME || "root",
        password: env.RDS_PASSWORD || "root",
        port: env.RDS_PORT || "3306",
        db_name: "farmersaid"
    },
    routes: [
        "/",
        "/injury-by-regions",
        "/injury-by-bp-ag",
        "/safety-measures",
        "/safety-measures/*",
        "/priority-report",
        "/icon-source",
        "/authorization",
        "/checklist-questionnaire"
    ]
}

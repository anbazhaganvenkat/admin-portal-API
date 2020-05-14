const dotenv = require("dotenv");
dotenv.config();

const {
    BASE_URL,
    APP_URL,
    WEBSITE_URL,
    PGUSER,
    PGHOST,
    PGPORT,
    PGDATABASE,
    PGPASSWORD,

} = process.env;

export const baseUrl = BASE_URL;
export const appUrl = APP_URL;
export const websiteBaseUrl = WEBSITE_URL;
export const dialect = "postgres";
export const host = PGHOST;
export const port = PGPORT;
export const username = PGUSER;
export const password = PGPASSWORD;
export const database = PGDATABASE;


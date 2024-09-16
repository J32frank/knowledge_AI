import { config } from "dotenv";
config();

/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./app/db/schema.jsx",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,
  },
};

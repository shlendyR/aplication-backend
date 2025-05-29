import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  password: "1234",
  host: "localhost",
  database: "panel_ventas",
  port: 5432,
});

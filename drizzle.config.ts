import { defineConfig } from "drizzle-kit";
import * as process from "node:process";

/** drizzle kit이 정보를 확인할 때 참조하는 파일 */

export default defineConfig({
    schema: "./app/features/**/schema.ts",
    out: "./app/sql/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    strict: true,
});
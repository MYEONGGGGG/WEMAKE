import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres";
import * as process from "node:process";

/** drizzle orm, Supabase 연결하는 파일 */

const client = postgres(process.env.DATABASE_URL!, { prepare: false });

const db = drizzle(client);

export default db;
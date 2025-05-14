import { createClient } from "@supabase/supabase-js";
import type { Database } from "database.types";

/** Supabase의 타입 안전성과 컬럼 자동 완성 기능을 제공함.
 *  "<Database>" 제네릭은 Supabase 프로젝트의 스키마를 기반으로 타입을 생성해서 적용함.
 *
 *  "database.types" 파일은 Supabase 프로젝트의 모든 테이블/컬럼/타입 정보를 포함한 타입 선언 파일
 * */

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// 콘솔에서 확인
// console.log(supabaseUrl);
// console.log(supabaseKey);

const client = createClient<Database>(supabaseUrl!,supabaseKey!);

export default client;
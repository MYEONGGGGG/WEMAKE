import { createClient } from "@supabase/supabase-js";
import type { MergeDeep, SetNonNullable, SetFieldType } from "type-fest";
import type { Database as SupabaseDatabase } from "database.types";

/** Supabase의 타입 안전성과 컬럼 자동 완성 기능을 제공함.
 *  "<Database>" 제네릭은 Supabase 프로젝트의 스키마를 기반으로 타입을 생성해서 적용함.
 *  "database.types" 파일은 Supabase 프로젝트의 모든 테이블/컬럼/타입 정보를 포함한 타입 선언 파일
 * */

const supabaseUrl = "https://nsyhtlymmxojcupbgsaw.supabase.co";
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// 콘솔에서 확인
// console.log(supabaseUrl);
// console.log(supabaseKey);

/** 데이터베이스 타입을 정의
 *  "database.types" 의 자동 생성 타입은 대부분 nullable(string | null)로 되어 있어서 null을 발생시킬 수 있음.
 *  MergeDeep + SetNotNullable을 써서, 특정 뷰의 Row 타입을 non-null로 재정의하기 위함.
 *  (타입 정의를 하더라도 "database.types" 파일에 영향을 주는건 없음! 타입스크립트에서 타입을 더 정확하게 추론 및 null 체크 제거 목적으로 사용!)
 * */
type Database = MergeDeep<SupabaseDatabase, {
    public: {
        Views: {
            community_post_list_view: {
                Row: SetFieldType<
                    SetNonNullable<
                        SupabaseDatabase["public"]["Views"]["community_post_list_view"]["Row"]
                    >,
                    "author_avatar",
                    string | null
                >
            };
            gpt_ideas_view: {
                Row: SetNonNullable<
                    SupabaseDatabase["public"]["Views"]["gpt_ideas_view"]["Row"]
                >
            };
            product_overview_view: {
                Row: SetNonNullable<
                    SupabaseDatabase["public"]["Views"]["product_overview_view"]["Row"]
                >
            };
            community_post_detail: {
                Row: SetNonNullable<
                    SupabaseDatabase["public"]["Views"]["community_post_detail"]["Row"]
                >;
            };
        };
    }
}>;

const client = createClient<Database>(
    supabaseUrl!,
    supabaseKey!
);

export default client;
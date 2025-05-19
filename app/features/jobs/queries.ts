import client from "~/supa-client";

// 유니언 리터럴 타입 정의
type JobType = "full-time" | "part-time" | "remote" | "internship" | "freelance";
type JobLocation = "remote" | "in-person" | "hybrid";
type SalaryRange =
    | "$0 - $50,000"
    | "$50,000 - $70,000"
    | "$70,000 - $100,000"
    | "$100,000 - $120,000"
    | "$120,000 - $150,000"
    | "$150,000 - $250,000"
    | "$250,000+";

// 타입 가드 함수
const isValidJobType = (v: string): v is JobType =>
    ["full-time", "part-time", "remote", "internship", "freelance"].includes(v);

const isValidLocation = (v: string): v is JobLocation =>
    ["remote", "in-person", "hybrid"].includes(v);

const isValidSalary = (v: string): v is SalaryRange =>
    [
        "$0 - $50,000",
        "$50,000 - $70,000",
        "$70,000 - $100,000",
        "$100,000 - $120,000",
        "$120,000 - $150,000",
        "$150,000 - $250,000",
        "$250,000+",
    ].includes(v);


// 메인 함수
export const getJobs = async ({
    limit,
    location,
    type,
    salary,
}: {
    limit: number;
    location?: string;
    type?: string;
    salary?: string;
}) => {
    const baseQuery = client
        .from("jobs")
        .select(`
        job_id,
        position,
        overview,
        company_name,
        company_logo,
        company_location,
        job_type,
        location,
        salary_range,
        created_at
        `)
        .limit(limit);

    if (location && isValidLocation(location)) {
        baseQuery.eq("location", location);
    }
    if (type && isValidJobType(type)) {
        baseQuery.eq("job_type", type);
    }
    if (salary && isValidSalary(salary)) {
        baseQuery.eq("salary_range", salary);
    }

    const { data, error } = await baseQuery;
    if (error) { throw error; }
    return data;
};
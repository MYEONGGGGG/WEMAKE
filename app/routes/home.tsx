import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome"; // Vite dev 서버의 alias 캐싱 문제가 존재하는 듯 // "../" 로 오류나면 "~/" 로 바꾸기

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Welcome />;
}

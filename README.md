# WeMaKe 프로젝트(WEB: FE + BE)

---

**WeMaKe** 는 React 기반의 프론트엔드와 백엔드를 통합한 웹 애플리케이션 프로젝트입니다.

---

## 프로젝트 소개
### 사용 기술 스택
#### 프론트엔트(Frontend)
- **언어:** TypeScript
- **프레임워크:** React 18
- **빌드툴:** Vite
- **상태관리:** Zustand(전역 상태), React Query(서버 상태)
- **스타일링:** Tailwind CSS, MagicUI, ShadcnUI

#### 백엔트(Backend)
- **플랫폼:** Supabase(ProstgreSQL 기반)
- **ORM:** Drizzle ORM

---
### 프로젝트 실행 방법
#### 1. 저장소 클론
```bash
git clone https://github.com/MYEONGGGGG/WEMAKE.git
```

#### 2. 프로젝트 실행
```bash
npm install
npm run dev
```

#### 3. 기본 설정 항목
- `.env` 구성(백엔드 API URL 등)
  ⚠️ `.env`에 Supabase 정보(DB URL, DB Password, SB-URL, SB_ANON_KEY) 없이 사용할 경우, 예기치 못한 문제가 발생할 수 있습니다.

#### 4. 커밋 메시지 작성 규칙 (Conventional Commits)
아래 표를 참고하여 작업 내용에 맞는 prefix를 커밋 메시지 앞에 붙여 주세요.

| Prefix     | 용도                          | 예시 커밋 메시지 |
|------------|-------------------------------|------------------|
| `feat`     | 새로운 기능 추가              | `feat: 사용자 로그인 기능 구현` |
| `fix`      | 버그 수정                     | `fix: 로그인 실패 시 예외 처리` |
| `docs`     | 문서 관련 작업 (`README.md`, 주석 등) | `docs: Git 연동 방법 추가` |
| `refactor` | 코드 리팩토링 (동작 변화 없음) | `refactor: 유틸 함수 구조 개선` |
| `style`    | 코드 스타일 변경 (포맷팅, 세미콜론 등) | `style: 들여쓰기 정리 및 불필요한 공백 제거` |
| `test`     | 테스트 코드 추가/수정         | `test: 사용자 모듈 단위 테스트 추가` |
| `chore`    | 기타 설정, 빌드, 의존성 관리   | `chore: gitignore 파일 업데이트` |
| `perf`     | 성능 개선                     | `perf: 리스트 렌더링 속도 개선` |
| `ci`       | CI 설정 수정 (GitHub Actions 등) | `ci: 빌드 자동화 스크립트 추가` |

#### 5. 스타일링 컴포넌트 가이드
> https://ui.shadcn.com/ (**Shadcn-UI**)
>
> https://magicui.design/ (**Magic-UI**): shadcn/ui에 최적화된 애니메이션 중심의 컴포넌트 라이브러리
> 
> https://tailwindcss.com/docs/installation/using-vite (**Tailwindcss**)
>
> https://lucide.dev/ (**Lucide Icon**)

##### Base Color 변경 방법(Tailwind 4 + shadcn/ui)
```text
1) 테마 코드 가져오기
*공식문서(URL: https://ui.shadcn.com/themes)
공식문서에서 원하는 테마 선택 후 원하는 테마 선택 후 Copy Code 클릭
또는 "src > styles" 경로의 텍스트 파일 참고

2) 스타일 코드 수정
"src > styles > index.css" 파일 내 :root 및 .dark 색상 변수 수정
* 기존 값을 백업한 뒤 덮어쓰는 것을 권장

3) 커스터마이징된 컴포넌트 백업
테마 변경 시, 커스텀 수정한 컴포넌트는 다시 덮어써지므로 미리 복사해둘 것

4) 컴포넌트 재설치 (테마 적용 반영)
npx shadcn@latest add <컴포넌트명> --overwrite
* --overwrite 옵션은 기존 파일을 덮어써 새 테마 스타일이 반영되도록 함

----------------------------------------------------------------------

[components.json]
   └── shadcn/ui CLI 전용 설정 파일(CLI로 컴포넌트를 추가할 때, 이 설정 기준으로 테마/경로 등을 결정함)
       ├── style: 컴포넌트 기본 스타일 테마 (new-york, default 등)
       ├── tailwind.config: Tailwind 설정 경로 (현재 비워두었지만 기본은 tailwind.config.js)
       ├── css: 스타일 경로 (src/styles/globals.css)
       ├── aliases: 컴포넌트, 유틸, 훅 등 경로 별칭 설정
       └── tsx: 타입스크립트 기반 여부 설정
       
[vite.config.js]
   └── Vite + Tailwind 플러그인 등록(Vite 실행 시 Tailwind CSS 컴파일을 자동 적용)
       ├── @vitejs/plugin-react: JSX/TSX 변환 및 Fast Refresh
       └── @tailwindcss/vite: Tailwind 전용 Vite 통합 플러그인
       
[app.css]
   └── Tailwind CSS의 핵심 스타일 정의 파일(shadcn/ui 컴포넌트의 스타일 기반이 되는 전역 스타일 파일)
       ├── @import: Tailwind와 애니메이션 관련 기본 스타일 포함
       ├── :root, .dark: OKLCH 기반 컬러 변수 정의 및 다크모드 대응
       ├── @theme inline: shadcn/ui의 색상/크기 변수 연결
       └── @layer base: 전체 요소와 body에 공통 유틸리티 적용
       
[src/components/ui/*]
   └── shadcn/ui CLI 또는 공식 문서에서 복사한 컴포넌트들이 저장되는 디렉토리(components/ui는 모든 UI 렌더링의 중심이며, Tailwind가 작동하는 공간)
```

---
<details>
  <summary>작성자</summary>

- **소속:** (주)멘토아이티 연구전담팀
- **이름:** 최명은
- **이메일:** c_me95@mentorit.co.kr
- **GitHub:** [MYEONGGGGG/cme95](https://github.com/MYEONGGGGG | https://github.com/cme95)
</details>
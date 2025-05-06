# Node.js 개발 환경용 베이스 이미지
FROM node:20

# 컨테이너 내부 작업 디렉토리 설정
WORKDIR /app

# package.json과 lock 파일만 먼저 복사하여 의존성 설치 캐시 유지
COPY package*.json ./

# 필요한 패키지 설치(컨테이너 내부에서 의존성 설치)
RUN npm install

# 전체 프로젝트 복사 (실제 실행 시엔 볼륨 마운트로 덮어씀)
COPY ../../Downloads .

# 포트 개방 (Vite 기본 포트)
EXPOSE 5173

# 개발 서버 실행 (Vite 기준)
CMD ["npm", "run", "dev"]
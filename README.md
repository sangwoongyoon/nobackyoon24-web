# 노빠꾸 윤이사 홈페이지 (nobackyoon24.com)

원빌딩부동산중개(주) · 윤상웅(노빠꾸 윤이사) 공식 홈페이지.
Next.js(App Router) + Tailwind CSS 기반. GitHub push → Vercel 자동 배포.

---

## ⚠️ 처음 시작할 때 딱 한 번 (중요)

이 폴더에 `node_modules` 폴더가 남아 있다면 **Windows 탐색기에서 삭제**하세요.
(제작 과정에서 생긴 임시 파일이라 리눅스에서는 삭제가 안 됩니다. Git에는 올라가지 않으니 배포엔 영향 없음.)
탐색기에서 `node_modules` 우클릭 → 삭제, 또는 명령프롬프트에서:

```
rmdir /s /q node_modules
del package-lock.json
```

---

## 로컬에서 실행해 보기

Node.js(18 이상) 설치 후, 이 폴더에서:

```
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속.

빌드 확인:

```
npm run build
```

(이미 빌드 통과 확인 완료 — 7개 페이지 모두 정상)

---

## 📁 폴더 구조

```
src/
  app/                  ← 페이지들 (URL 경로와 1:1 대응)
    page.jsx            ← 홈 (/)
    about/page.jsx      ← 내소개 (/about)
    projects/page.jsx   ← 프로젝트 (/projects)
    contact/page.jsx    ← 문의 (/contact)
    careers/page.jsx    ← 입사지원 (/careers)
    privacy/page.jsx    ← 개인정보처리방침 (/privacy)
    layout.jsx          ← 공통 레이아웃 (헤더/푸터 포함)
    globals.css         ← 전역 스타일
  components/           ← 재사용 부품 (헤더/푸터/카드/지도/폼)
  data/
    site.js             ← ★ 회사정보·브랜드 문구 (여기 제일 많이 수정)
    projects.js         ← ★ 프로젝트(실적) 카드 데이터
tailwind.config.js      ← ★ 브랜드 색상
```

★ 표시된 3개 파일만 알면 거의 모든 내용을 수정할 수 있습니다.

---

## ✏️ 내용 수정하는 법 (코드 몰라도 됨)

**글자 바꾸기:** `src/data/site.js` 를 열어 따옴표 `" "` 안의 글자만 바꾸면 됩니다.

**프로젝트 추가:** `src/data/projects.js` 에서 `{ ... }` 블록 하나를 복사해 붙여넣고 값만 교체.

**색상 바꾸기:** `tailwind.config.js` 의 `brand`(메인 네이비), `accent`(포인트 골드) 색상 코드 수정.

---

## ✅ 지금 채워야 할 항목 (site.js / projects.js 안에 `[TODO]`, `[N]` 로 표시)

1. **[N] 경력 연차** — 홈·내소개의 "강남 상업용 빌딩 [N]년"
2. **[N] 누적 실적 건수** — 홈 지표, 내소개 "실전 경험 [N]건"
3. **공인중개사법 필수표기** (푸터 고정) — `site.legal` 의 등록번호·소재지·대표자명·연락처·사업자번호
4. **연락처** — `site.contact` 의 전화번호·이메일·카카오톡 오픈채팅 링크
5. **프로젝트 실제 데이터** — `projects.js` 의 예시 3개를 실제 거래로 교체 (mapQuery는 실제 주소로)
6. **개인정보처리방침 시행일·보유기간** — `src/app/privacy/page.jsx` 의 `[TODO]`

---

## 🗺️ 카카오맵 연결 (지도 실제 표시)

키가 없어도 지도 자리에 "카카오맵에서 보기" 버튼이 나와 사이트는 정상 동작합니다.
실제 지도를 넣으려면:

1. https://developers.kakao.com 로그인 → 내 애플리케이션 → 애플리케이션 추가
2. **앱 키 > JavaScript 키** 복사
3. 앱 설정 > 플랫폼 > Web 에 사이트 도메인 등록
   (개발용 `http://localhost:3000`, 배포용 `https://www.nobackyoon24.com` 둘 다)
4. `.env.example` 을 복사해 `.env.local` 파일을 만들고 키 붙여넣기:
   ```
   NEXT_PUBLIC_KAKAO_MAP_KEY=복사한_JavaScript_키
   ```
5. Vercel 배포 시: Vercel 대시보드 > Settings > Environment Variables 에도 같은 값 등록

> 카카오맵 추천 이유: 국내 UI 친숙, JavaScript 지도 API 무료. 코드는 카카오 기준으로 작성됨.

---

## 🚀 GitHub + Vercel 배포

1. GitHub에서 새 레포 생성 (계정: `sangwoongyoon`, 예: `nobackyoon24-web`)
2. 이 폴더에서:
   ```
   git init
   git add .
   git commit -m "init: 홈페이지 리뉴얼"
   git branch -M main
   git remote add origin https://github.com/sangwoongyoon/nobackyoon24-web.git
   git push -u origin main
   ```
3. https://vercel.com → New Project → 방금 레포 Import → Deploy (설정 자동 감지)
4. 이후 `git push` 할 때마다 Vercel이 자동 재배포

### 도메인 연결 (nobackyoon24.com)
Vercel 프로젝트 > Settings > Domains 에 `nobackyoon24.com`, `www.nobackyoon24.com` 추가 →
Vercel이 알려주는 DNS 레코드(A/CNAME)를 도메인 등록기관에 입력.

---

## 🖥️ 두 대의 컴퓨터에서 작업 (집/회사)

코드는 GitHub에 있으니 어느 컴퓨터든 `git clone` 후 작업 가능.
단, **환경변수(.env.local)는 Git에 올라가지 않으므로** 두 컴퓨터에 각각 만들어야 합니다.
카카오맵 키 등은 별도 메모(비밀번호 관리앱 등)에 보관해 양쪽에서 접근하세요.
GitHub / Vercel / Supabase는 모두 동일 계정으로 로그인.

---

## 📌 남은 작업 (다음 우선순위)

- [ ] 홈 히어로 문구 최종 컨펌 (site.js `home`)
- [ ] `[N]`, `[TODO]` 실제 값으로 채우기
- [ ] 카카오맵 키 발급 후 프로젝트 지도 실연결
- [ ] 문의 폼 백엔드 연결 여부 결정 (현재 메일앱 열기 방식) + reCAPTCHA/Turnstile
- [ ] 입사지원 문구 다듬기
- [ ] 자료실은 이 사이트가 아닌 업무보고 대시보드에 추가 (별도 작업)

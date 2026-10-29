// =====================================================================
//  채용세미나 2기 랜딩페이지 콘텐츠 (/seminar)
//  - 따옴표 " " 안의 글자만 바꾸면 페이지 문구가 바뀝니다.
//
//  [리뷰영상 넣는 법]
//  videos 의 youtubeId 칸에 유튜브 영상 ID만 넣으면 홈페이지 안에서 재생됩니다.
//    https://youtube.com/shorts/AbCdEfGh123        → youtubeId: "AbCdEfGh123"
//    https://www.youtube.com/watch?v=AbCdEfGh123   → youtubeId: "AbCdEfGh123"
//  ※ 유튜브 공개범위는 '공개' 또는 '일부공개'여야 재생됩니다.
//
//  [멘토 사진 넣는 법]
//  public/images/seminar/ 에 사진을 넣고 photo: "/images/seminar/파일명" 으로 지정.
//  비워두면 이니셜 원형으로 표시됩니다.
// =====================================================================

export const seminar = {
  cohort: "2기",
  status: "open", // open: 신청 접수중 / closed: 마감

  // 모든 신청 버튼이 연결되는 구글폼
  applyUrl: "https://forms.gle/xRt9vkXuRKG3fWh36",

  // ---- 홈 첫 화면 팝업 ----
  //  show: false 로 바꾸면 꺼짐 / endAt 이 지나면 자동으로 안 뜸
  popup: {
    show: true,
    endAt: "2026-11-22T15:00:00+09:00",
    dateText: "2026.11.22(일) 13:00–15:00",
  },

  // ---- HERO ----
  heroCopy: ["다른 곳도 볼 수 있습니다.", "하지만 꼭 가야 할 곳은 따로 있습니다."],
  eyebrow: "2026 WONBUILDING",
  title: "채용 세미나 2기",
  dateLabel: "2026.11.22 SUN",
  timeLabel: "13:00 – 15:00",
  conditions: ["참가비 무료", "선착순 20명"],
  heroNote: "공인중개사 자격증이 없어도 참여 가능합니다.",

  // ---- WHY WONBUILDING (회사 제공 수치 — 게시 전 확인) ----
  why: {
    title: "왜 원빌딩인가",
    desc: "빌딩 매매 중개에 집중해 온 시간과 데이터. 처음 시작하는 사람이 기댈 수 있는 기반이 있습니다.",
    stats: [
      { value: "약 30년", label: "빌딩 매매 중개 업력" },
      { value: "약 2조 원", label: "연간 거래액" },
      { value: "15만 건+", label: "부동산 데이터베이스" },
    ],
  },

  // ---- PROVEN EXPERIENCE (1기) ----
  proven: {
    title: ["세미나는 하루였지만,", "그 인연은 지금도 이어지고 있습니다."],
    desc: "지난 2026년 6월 20일 1기 세미나에서 만난 참가자들이 지금은 원빌딩에서 함께 일하고 있습니다.",
  },

  // ---- MEET YOUR MENTORS ----
  mentors: [
    {
      name: "윤상웅",
      role: "상무",
      headline: "수습에서 상무까지, 최연소·최단기 승진",
      copy: "경험이 없던 신입에서 상무까지. 성장의 차이를 만드는 것은 실행 가능한 시스템입니다.",
      points: ["수습사원에서 상무까지 성장한 과정", "경험이 없어도 따라 할 수 있는 실전 영업 시스템", "체계적이고 최적화된 중개 프로세스"],
      photo: "/images/seminar/mentor-yoonsangwoong.webp",
    },
    {
      name: "안형준",
      role: "수석",
      headline: "누적 거래액 6,000억 원",
      copy: "늦은 시작이 한계는 아닙니다. 누적 거래액 6,000억 원에 담긴 실전 경험.",
      points: ["늦게 시작해 큰 성과를 이룬 성장 과정", "빌딩 매매 현장에서 거래를 만드는 노하우", "초보 중개사가 배워야 할 영업 관점"],
      photo: "/images/seminar/mentor-anhyeongjun.webp",
    },
    {
      name: "이소망",
      role: "팀장",
      headline: "8년 차 바리스타에서 2년 만에 억대 연봉",
      copy: "바리스타에서 빌딩중개 전문가로. 처음 시작하는 사람의 어려움을 누구보다 잘 아는 멘토.",
      points: ["바리스타 8년 경력 후 부동산 업계 첫 진입", "신입 시절 직접 겪은 어려움과 극복 과정", "신입 눈높이에 맞춘 밀착 코칭"],
      photo: "/images/seminar/mentor-leesomang.webp",
    },
  ],
  mentorNote: "멘토의 실적과 소득은 개인의 과거 경험이며, 동일한 결과를 보장하지 않습니다.",

  // ---- WHAT YOU WILL EXPERIENCE ----
  program: [
    { title: "멘토 3인 발표", desc: "각자의 시작과 성장, 실전 노하우를 직접 이야기합니다." },
    { title: "현장 이야기", desc: "빌딩 매매 중개가 실제로 어떻게 돌아가는지 생생하게 공개합니다." },
    { title: "자유 Q&A", desc: "궁금한 건 무엇이든. 현직 멘토가 바로 답합니다." },
    { title: "사옥 투어", desc: "원빌딩이 일하는 공간을 직접 둘러봅니다." },
    { title: "멘토 개별 상담", desc: "나에게 맞는 시작 방법을 1:1로 이야기합니다." },
    { title: "네트워킹", desc: "행사 종료 후 희망자에 한해 자유롭게 이어집니다." },
  ],

  // ---- REAL STORIES (1기 입사자 인터뷰) ----
  // upcoming: "11월 8일부터 순차 공개" / live: "공개 중"
  storiesStatus: "upcoming",
  storiesReleaseLabel: "11월 8일부터 순차 공개",
  videos: [
    { title: "원빌딩 세미나를 알게 된 계기", youtubeId: "", thumbnail: "/images/seminar/shorts/ep01.webp" },
    { title: "첫인상 vs 입사 후 느낀 장점", youtubeId: "", thumbnail: "/images/seminar/shorts/ep02.webp" },
    { title: "대기업 재직 중 세미나에 온 이유", youtubeId: "", thumbnail: "/images/seminar/shorts/ep03.webp" },
    { title: "패션 업계에서 원빌딩을 선택한 이유", youtubeId: "", thumbnail: "/images/seminar/shorts/ep04.webp" },
    { title: "세미나 듣고 입사를 결심한 이유", youtubeId: "", thumbnail: "/images/seminar/shorts/ep05.webp" },
    { title: "대기업 퇴사하고 입사한 이유", youtubeId: "", thumbnail: "/images/seminar/shorts/ep06.webp" },
    { title: "2기를 고민하는 분들께 한마디", youtubeId: "", thumbnail: "/images/seminar/shorts/ep07.webp" },
  ],

  // ---- WHO SHOULD ATTEND ----
  forWho: [
    { title: "공인중개사 수험생·예비 합격생", desc: "시험 이후 진로를 고민하는 분" },
    { title: "부동산 취업·이직 희망자", desc: "빌딩 중개 실무가 궁금한 분" },
    { title: "영업 경력자", desc: "더 큰 무대에서 실력을 증명하고 싶은 분" },
    { title: "자영업자·커리어 전환 희망자", desc: "새로운 가능성을 찾는 분" },
  ],

  // ---- EVENT DETAILS ----
  details: [
    { label: "일시", value: "2026년 11월 22일(일) 13:00~15:00" },
    { label: "장소", value: "서울 강남구 신사동 590-16, 원빌딩 본관 지하 강의실" },
    { label: "참가비", value: "무료" },
    { label: "모집", value: "선착순 20명" },
    { label: "자격", value: "공인중개사 자격증 유무 관계없음" },
    { label: "기타", value: "프로그램 종료 후 희망자 네트워킹" },
  ],
  mapUrl: "https://map.kakao.com/?q=%EC%84%9C%EC%9A%B8%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EC%8B%A0%EC%82%AC%EB%8F%99%20590-16",
  contact: { name: "윤상웅 상무", phone: "010-9259-7016", email: "swyoon@wonbuilding.com" },

  // ---- FAQ ----
  faq: [
    { q: "공인중개사 자격증이 없어도 되나요?", a: "네. 자격증 유무와 관계없이 누구나 신청할 수 있습니다." },
    { q: "참가비가 있나요?", a: "없습니다. 무료로 진행되며, 선착순 20명까지 모집합니다." },
    { q: "영업 경험이 없어도 되나요?", a: "괜찮습니다. 멘토 중에도 부동산·영업 경험 없이 시작한 분이 있습니다. 처음 시작하는 분의 눈높이에서 이야기합니다." },
    { q: "세미나에 참석하면 반드시 입사해야 하나요?", a: "아닙니다. 빌딩 중개라는 일을 직접 보고 판단하실 수 있도록 마련한 자리입니다." },
    { q: "신청 후 참가 확정은 어떻게 안내받나요?", a: "신청서에 남겨주신 연락처로 운영진이 개별 안내드립니다." },
  ],

  // ---- FINAL CTA ----
  finalCta: {
    title: "11월 22일, 새로운 가능성을 직접 확인하세요.",
    button: "원빌딩 채용 세미나 2기 신청하기",
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ===== 브랜드 컬러 (여기 한 곳만 바꾸면 사이트 전체 색이 바뀝니다) =====
        brand: {
          DEFAULT: "#0B2A4A", // 메인 (딥 네이비 - 신뢰/전문성)
          dark: "#071B30",
          light: "#1C4E80",
        },
        accent: {
          DEFAULT: "#C8A24B", // 포인트 (골드 - 프리미엄 빌딩)
          dark: "#A9863A",
        },
        ink: "#1A1A1A",     // 본문 텍스트
        muted: "#5B6470",   // 보조 텍스트
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};

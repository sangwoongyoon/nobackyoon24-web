/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 프로젝트 지도/이미지 등을 외부에서 불러올 경우 여기에 도메인 추가
    remotePatterns: [],
  },
};

export default nextConfig;

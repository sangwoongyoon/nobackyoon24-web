/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 리틀리 등 예전 링크(/project) → 현재 주소(/projects)
  async redirects() {
    return [{ source: "/project", destination: "/projects", permanent: true }];
  },
  images: {
    // 프로젝트 지도/이미지 등을 외부에서 불러올 경우 여기에 도메인 추가
    remotePatterns: [],
  },
};

export default nextConfig;

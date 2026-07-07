import "./globals.css";
import { site } from "@/data/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL(`https://www.${site.domain}`),
  title: {
    default: `${site.brandName} · ${site.companyName}`,
    template: `%s · ${site.brandName}`,
  },
  description: site.slogan,
  openGraph: {
    title: `${site.brandName} · ${site.companyName}`,
    description: site.slogan,
    type: "website",
    locale: "ko_KR",
    url: `https://www.${site.domain}`,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendand 웹폰트 (한국어 가독성) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-screen bg-white font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

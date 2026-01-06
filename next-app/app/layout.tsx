import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | Yoonhyeok Kim',
    default: 'Yoonhyeok Kim | Graphic Designer',
  },
  description: 'Graphic Designer Yoonhyeok Kim (김윤혁) Portfolio. Identity, Editorial, Digital Design based in Seoul.',
  keywords: ['김윤혁', '디자이너 김윤혁', 'Yoonhyeok Kim', 'Graphic Designer', 'Portfolio', 'Seoul', 'Design', '그래픽 디자이너', '브랜딩', 'Branding', '디자이너 윤혁'],
  icons: {
    icon: "/favicon/favicon.ico",
  },
  metadataBase: new URL('https://hyeok.info'),
  openGraph: {
    title: 'Yoonhyeok Kim | Graphic Designer',
    description: 'Graphic Designer Yoonhyeok Kim Portfolio',
    url: 'https://hyeok.info',
    siteName: 'Yoonhyeok Kim',
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <body>
        {/* Adobe Fonts (Typekit) */}
        {/* Adobe Fonts (Typekit) - CSS Load for FOUT prevention */}
        {/* Adobe Fonts (Typekit) - JS Loader for Robustness */}
        <Script id="typekit-loader" strategy="afterInteractive">
          {`
            (function(d) {
              var config = {
                kitId: 'vzs3olx',
                scriptTimeout: 3000,
                async: true
              },
              h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
            })(document);
          `}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PGR3FGHPWE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PGR3FGHPWE');
          `}
        </Script>

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

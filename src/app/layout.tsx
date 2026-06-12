import type { Metadata, Viewport } from "next";
import { Providers } from "@/shared/ui/providers";
import './globals.css'


export const metadata: Metadata = {
  title: "광장체크 | GPS 위치 인증 참여 서비스",
  description:
    "집회 현장 GPS 위치 인증을 통한 참여 인증 서비스. 실제 인원 수가 아닌 위치 인증 통과 수만 집계합니다.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}

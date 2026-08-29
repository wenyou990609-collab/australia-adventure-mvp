import type { Metadata, Viewport } from "next";
import { CacheResetButton } from "@/components/CacheResetButton";
import "./globals.css";

export const metadata: Metadata = {
  title: "留学生新手村",
  description: "把落地海外第一周变成一场温柔的新手冒险。"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <CacheResetButton />
      </body>
    </html>
  );
}

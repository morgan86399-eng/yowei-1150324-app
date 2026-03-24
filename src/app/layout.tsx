import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "桃園養心推拿 App",
  description: "肌肉/經絡調整/細節/疑難雜症調整",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${inter.className} bg-[#f4f6f5] pb-20 pt-20`}>
        <Header />
        {children}
        
        {/* App 底部導航列 (Bottom Navigation Bar) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
          <div className="max-w-md mx-auto flex justify-between items-center px-6 py-2">
            <Link href="/" className="flex flex-col items-center p-2 text-gray-500 hover:text-[#2c5234] focus:text-[#2c5234] transition-colors">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span className="text-[10px] font-bold">首頁</span>
            </Link>
            
            <Link href="/services" className="flex flex-col items-center p-2 text-gray-500 hover:text-[#2c5234] focus:text-[#2c5234] transition-colors">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              <span className="text-[10px] font-bold">服務</span>
            </Link>
            
 

            <Link href="/faq" className="flex flex-col items-center p-2 text-gray-500 hover:text-[#2c5234] focus:text-[#2c5234] transition-colors">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-[10px] font-bold">Q&A</span>
            </Link>
            
            <Link href="/about" className="flex flex-col items-center p-2 text-gray-500 hover:text-[#2c5234] focus:text-[#2c5234] transition-colors">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="text-[10px] font-bold">關於</span>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

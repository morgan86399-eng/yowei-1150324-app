"use client";

import Link from "next/link";

export default function SharingPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f5] pb-12 font-sans">
      {/* 頂部導航列 */}
      <div className="bg-[#2c5234] text-white pt-12 pb-8 px-6 shadow-md rounded-b-3xl">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/" className="text-white/80 hover:text-white flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            返回
          </Link>
          <h1 className="text-xl font-bold tracking-widest text-[#d4af37]">身體改善分享</h1>
          <div className="w-16"></div> {/* 平衡排版 */}
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 mt-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#2c5234] mb-2">四面八方來此保養身體的人 - 改善分享</h2>
          <p className="text-gray-600 text-sm">（感謝我們這些客人/朋友，分享健康變好的喜悅!整理截圖後發現，好多位朋友也認識好多年了：））</p>
        </div>

        {/* 圖片將會放置在此處 */}
        <div className="space-y-6">
          <img src="/images/sharing-1.png" alt="改善分享圖 1" className="w-full h-auto rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

function CheckoutContent() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [points, setPoints] = useState(0);

  // 一進來先抓取會員是誰，以及他現在有多少點數
  useEffect(() => {
    const fetchUserAndPoints = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        // 抓出他的錢包點數
        const { data } = await supabase.from("users_wallet").select("points").eq("user_id", session.user.id).single();
        if (data) {
          setPoints(data.points);
        }
      }
    };
    fetchUserAndPoints();
  }, [success]);

  // 如果使用者沒登入，強制他去登入
  if (!user && !success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f6f5] p-4">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#2c5234]">
          <h2 className="text-2xl font-bold mb-4">請先登入</h2>
          <p className="text-gray-600 mb-6">您必須先登入會員，才能購買點數。</p>
          <Link href="/login" className="bg-[#2c5234] text-white px-6 py-2 rounded-md hover:bg-[#1e3b25]">前往登入</Link>
        </div>
      </div>
    );
  }

  // 當按下結帳，把自己的會員 ID 一併送去 API
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ecpay", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id })
      });
      const html = await res.text();
      
      document.open();
      document.write(html);
      document.close();
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("產生訂單發生錯誤，請稍後再試！");
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f6f5] p-4">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 text-center shadow-lg border-t-4 border-[#d4af37]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37]/20">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">購買成功！</h2>
          <p className="mt-2 text-lg text-gray-800 font-semibold">請加入 Line 預約</p>
          
          <div className="my-6 p-4 text-center">
            <img src="https://qr-official.line.me/sid/L/rpqqznbwrp.png" alt="Line QR Code" className="mx-auto w-48 h-48" />
            <div className="mt-4">
              <a
                href="https://line.me/ti/p/RpqqZNbwRp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center rounded-xl bg-[#06C755] px-6 py-2 text-sm font-bold text-white hover:bg-[#05b34c] shadow-md transition-colors"
              >
                點我預約推拿時間
              </a>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex w-full justify-center rounded-xl bg-[#2c5234] px-4 py-3 text-sm font-bold text-white hover:bg-[#1e3b25] shadow-md transition-colors"
            >
              回首頁
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f6f5] p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="text-left">
            <p className="text-xs text-gray-500 mb-1">目前登入會員</p>
            <p className="text-sm font-semibold truncate w-32 bg-gray-50 px-2 py-1 rounded">{user?.email}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">目前點數餘額</p>
            <p className="text-xl font-bold text-[#b5952f] bg-[#d4af37]/10 px-3 py-1 rounded-lg inline-block">{points} 🪙</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <h2 className="text-3xl font-bold tracking-widest text-[#2c5234]">儲值中心</h2>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-[#d4af37]/30 bg-white p-5 relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 bg-[#d4af37] text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl shadow-sm">
              超值優惠
            </div>
            <div className="flex items-center gap-x-3 mb-2">
              <span className="text-3xl">🪙</span>
              <h3 className="text-2xl font-black text-gray-900">3200 點</h3>
            </div>
            <div className="flex justify-between items-end mt-4">
              <p className="text-sm text-gray-500 font-medium">即買即用，永不過期</p>
              <p className="text-xl font-bold text-[#b5952f]">NT$ 1,600</p>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="group relative flex w-full justify-center rounded-xl bg-[#2c5234] px-4 py-3.5 text-lg font-bold text-white hover:bg-[#1e3b25] disabled:bg-gray-300 transition-colors shadow-lg"
          >
            {loading ? "準備導向綠界..." : "立即結帳 (刷卡 1,600 元)"}
          </button>
          
          <div className="text-center text-sm pt-4 border-t border-gray-100">
            <Link href="/" className="font-medium text-gray-400 hover:text-gray-600">
              暫時不要，回首頁
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4f6f5] flex items-center justify-center font-bold text-[#2c5234]">載入中...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}


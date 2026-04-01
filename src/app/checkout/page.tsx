"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { Capacitor } from "@capacitor/core";
import { NativePurchases, PURCHASE_TYPE } from "@capgo/native-purchases";

const PRODUCTS = [
  { id: "tuina_60min",  label: "60分鐘推拿",     price: "NT$1,100", points: 0 },
  { id: "tuina_100min", label: "100分鐘推拿",    price: "NT$1,760", points: 0 },
  { id: "tuina_120min", label: "120分鐘元神推拿", price: "NT$3,300", points: 0 },
];

function CheckoutContent() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  const [loading, setLoading] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) setUser(session.user);
    };
    fetchUser();
  }, [success]);

  if (!user && !success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f6f5] p-4">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#2c5234]">
          <h2 className="text-2xl font-bold mb-4">請先登入</h2>
          <p className="text-gray-600 mb-6">您必須先登入會員，才能購買服務。</p>
          <Link href="/login" className="bg-[#2c5234] text-white px-6 py-2 rounded-md hover:bg-[#1e3b25]">前往登入</Link>
        </div>
      </div>
    );
  }

  const handleCheckout = async (productId: string) => {
    setLoading(productId);

    if (Capacitor.isNativePlatform()) {
      try {
        const { isBillingSupported } = await NativePurchases.isBillingSupported();
        if (!isBillingSupported) {
          alert("此裝置不支援 Google Play 付款，請確認已登入 Google 帳號。");
          setLoading(null);
          return;
        }

        await NativePurchases.purchaseProduct({
          productIdentifier: productId,
          productType: PURCHASE_TYPE.INAPP,
        });

        alert("購買成功！請加入 Line 預約您的推拿時間。");
      } catch (error: any) {
        if (error?.code !== "1") {
          alert("付款失敗，如有疑問請聯繫客服。");
        }
      } finally {
        setLoading(null);
      }
    } else {
      // 網頁版暫不支援直接購買，導引用戶下載 App
      alert("請使用手機 App 購買服務。");
      setLoading(null);
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
            <Link href="/" className="inline-flex w-full justify-center rounded-xl bg-[#2c5234] px-4 py-3 text-sm font-bold text-white hover:bg-[#1e3b25] shadow-md transition-colors">
              回首頁
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f6f5] p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-bold tracking-widest text-[#2c5234]">服務購買</h2>
          <p className="text-sm text-gray-500 mt-1">購買後請加 Line 預約時間</p>
        </div>

        <div className="space-y-4">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="rounded-2xl border border-[#d4af37]/30 bg-white p-5 shadow-md">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-black text-gray-900">{product.label}</h3>
                <p className="text-xl font-bold text-[#b5952f]">{product.price}</p>
              </div>
              <button
                onClick={() => handleCheckout(product.id)}
                disabled={loading !== null}
                className="w-full rounded-xl bg-[#2c5234] px-4 py-3 text-sm font-bold text-white hover:bg-[#1e3b25] disabled:bg-gray-300 transition-colors shadow"
              >
                {loading === product.id ? "處理中..." : "立即購買"}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center text-sm pt-2 border-t border-gray-100">
          <Link href="/" className="font-medium text-gray-400 hover:text-gray-600">
            暫時不要，回首頁
          </Link>
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

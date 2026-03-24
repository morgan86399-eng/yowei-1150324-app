"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const services = [
    {
      id: "basic-half",
      title: "基礎保養",
      subtitle: "半身",
      desc: "針對特定不適部位（如肩頸、腰背）進行深層舒緩，快速釋放日常累積的疲勞。",
      time: "60 分鐘",
      amount: 1000,
    },
    {
      id: "basic-full",
      title: "基礎保養",
      subtitle: "全身",
      desc: "涵蓋全身肌肉與經絡的深層放鬆，徹底舒緩長期緊繃狀態，恢復身體平衡。",
      time: "100 分鐘",
      amount: 1600,
    },
    {
      id: "pro",
      title: "量身訂做",
      subtitle: "元神推拿",
      desc: "根據您的真實狀態與需求，進行客製化經絡與肌肉重點調整，針對疑難雜症或深層緊繃加強。",
      time: "120 分鐘",
      amount: 3000,
      highlight: true,
    },
  ];

  const handleEcpayPayment = async (service: typeof services[0]) => {
    if (!user) {
      alert("請先登入會員才能進行刷卡！");
      router.push("/login");
      return;
    }

    const response = await fetch('/api/ecpay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: service.amount.toString(), itemName: service.title + "(" + service.subtitle + ")" })
    });
    const htmlForm = await response.text();
    document.open();
    document.write(htmlForm);
    document.close();
  };

  return (
    <div className="min-h-screen bg-[#f4f6f5] pb-12 font-sans relative">
      {/* 頂部導航列 */}
      <div className="bg-[#2c5234] text-white pt-12 pb-8 px-6 shadow-md rounded-b-3xl">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/" className="text-white/80 hover:text-white flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            返回
          </Link>
          <h1 className="text-xl font-bold tracking-widest text-[#d4af37]">服務項目</h1>
          <div className="w-16"></div> {/* 平衡排版 */}
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 mt-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#2c5234] mb-2">養身先養心</h2>
          <p className="text-gray-600 text-sm">我們提供專業的肌肉與經絡調整，為您量身打造最適合的療程。</p>
 
        </div>

        {/* 服務列表 */}
        <div className="space-y-4 mb-10">
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 relative overflow-hidden ${service.highlight ? 'border-[#d4af37] ring-1 ring-[#d4af37]/30' : 'border-[#2c5234]'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                  <span className={`text-xs font-semibold px-2 py-1 rounded mt-1 inline-block ${service.highlight ? 'bg-[#d4af37]/10 text-[#b5952f]' : 'bg-[#2c5234]/10 text-[#2c5234]'}`}>
                    {service.subtitle}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                    <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {service.time}
                  </div>
 
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-4">
                {service.desc}
              </p>
              <button 
                onClick={() => handleEcpayPayment(service)}
                className="w-full bg-[#2c5234] text-white py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-[#1e3b25] transition-colors"
              >
                立即刷卡預約
              </button>
            </div>
          ))}
        </div>

 
      </div>

      {/* 預約確認彈窗 */}
 
    </div>
  );
}

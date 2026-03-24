'use client';
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f6f5] pb-24 font-sans">
      {/* 頂部 Banner */}
      <div className="bg-[#2c5234] relative rounded-b-[3rem] shadow-lg pt-12 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-md mx-auto px-6 text-center relative z-10">
          <div className="bg-white/95 p-4 rounded-2xl shadow-xl border border-white/20 mx-auto mb-6 max-w-[240px]">
            <img 
              src="https://fd10e8e1c7.cbaul-cdnwnd.com/daec49a09b8083b3e3ac051ff98ea00b/200000030-b3d76b3d77/%E9%A4%8A%E5%BF%83%E6%8E%A8%E6%8B%BF%E5%A4%A7%E5%AD%972.png" 
              alt="桃園養心推拿" 
              className="w-full h-auto object-contain drop-shadow-sm"
            />
          </div>
          <h1 className="text-xl font-bold tracking-widest text-[#d4af37] mb-2">養身先養心，相由心生</h1>
          <p className="text-emerald-100 text-sm font-medium tracking-wide">肌肉 / 經絡調整 / 細節 / 疑難雜症調整</p>
          
          <div className="mt-8 flex justify-center">
            <a 
              href="https://line.me/ti/p/RpqqZNbwRp" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white px-8 py-3.5 rounded-full font-bold shadow-[0_0_15px_rgba(6,199,85,0.4)] transition-all transform hover:scale-105"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.987 8.91 9.423 9.619.369.049.882.155 1.01.46.12.285.078.736.037 1.03l-.337 2.035c-.053.308-.25 1.203 1.055.653 1.305-.55 7.038-4.148 9.539-7.051 2.148-2.492 3.273-5.076 3.273-6.746z"/>
              </svg>
              立即預約 (官方 LINE)
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-6 relative z-20">
        


        {/* 服務項目卡片 */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <Link href="/services" className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#2c5234]/10 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-[#2c5234]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h3 className="font-bold text-gray-800">服務項目</h3>
            <p className="text-xs text-gray-500 mt-1">查看所有調理課程與價目</p>
          </Link>
          <Link href="/sharing" className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#2c5234]/10 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-[#2c5234]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10m0 0h6m-6 0l-3-3m3 3l3-3m0-6h6m-6 0l3-3m-3 3l3 3" /></svg>
            </div>
            <h3 className="font-bold text-gray-800">身體改善分享</h3>
            <p className="text-xs text-gray-500 mt-1">查看其他人的分享與改善歷程</p>
          </Link>
        </div>

        {/* 師傅介紹 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-[#2c5234]">專業師傅團隊</h2>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          
          <div className="space-y-4">
            <Link href="/about" className="block bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/5 rounded-bl-full group-hover:bg-[#d4af37]/10 transition-colors"></div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-[#d4af37] flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  養身先養心，相由心生
                </h3>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed pr-6">
                深入了解我們的核心理念：從身體到心靈的全面平衡，以及我們參與的公益活動與教學分享...
              </p>
            </Link>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <img src="https://fd10e8e1c7.cbaul-cdnwnd.com/daec49a09b8083b3e3ac051ff98ea00b/200000001-aafe6aafe8/188034605_4684279454919598_7509051795120828942_n.jpg" alt="劉師傅" className="w-full h-60 object-cover object-[center_70%]" />
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  劉師傅 <span className="text-xs bg-[#d4af37] text-white px-2 py-0.5 rounded-full font-normal">資深</span>
                </h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">我們不是只有分析問題，更擔任 1對1 教練的角色，告訴您身體盲點並提供緩解方法。</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <img src="https://fd10e8e1c7.cbaul-cdnwnd.com/daec49a09b8083b3e3ac051ff98ea00b/200000079-c9e5ec9e5f/S__6848514.jpeg" alt="廖師傅" className="w-full h-60 object-cover object-[15%_10%]" />
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  廖師傅 <span className="text-xs bg-[#d4af37] text-white px-2 py-0.5 rounded-full font-normal">資深</span>
                </h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">用心為您著想，不痛又有效！以經絡與肌肉放鬆為主，安心且漸進地調整。</p>
              </div>
            </div>
          </div>
        </div>

        {/* 營業資訊 */}
        <div className="bg-[#2c5234]/5 rounded-2xl p-5 border border-[#2c5234]/10">
          <h3 className="font-bold text-[#2c5234] mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            門市資訊 (預約制)
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            地址：桃園區鎮撫街46號2樓<br/>
            (請務必先透過 LINE 預約時間)
          </p>
        </div>

      </div>
    </div>
  );
}

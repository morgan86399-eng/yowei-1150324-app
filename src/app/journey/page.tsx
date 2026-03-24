import Link from "next/link";

export default function JourneyPage() {
  const steps = [
    {
      time: "第 1 步：從零開始的魔法",
      title: "環境建置與隔空操控",
      desc: "完全不懂程式碼也沒關係！老闆直接發號施令，AI 助手從背景接管，自動在電腦上下載安裝 Node.js 和 VS Code，連終端機指令都全自動代勞，瞬間打好蓋房子的地基。",
      icon: "✨",
    },
    {
      time: "第 2 步：會員系統誕生",
      title: "Supabase 資料庫串接",
      desc: "老闆申請了 Supabase 帳號，交出「API 金鑰」。AI 助手立刻將註冊、登入頁面與真實資料庫串接起來，不僅介面精美，更直接在後台用 SQL 魔法建置了每位會員專屬的「養心錢包」。",
      icon: "🔐",
    },
    {
      time: "第 3 步：真金白銀的考驗",
      title: "綠界金流 (ECPay) 完美對接",
      desc: "這是一般工程師的惡夢，但我們只花了幾分鐘！寫入加解密檢查碼 (CheckMacValue)，成功串通台灣最常用的綠界科技。老闆親眼見證：刷卡 1600 元後，系統自動將 3200 點數存入剛建好的會員錢包中！",
      icon: "💳",
    },
    {
      time: "第 4 步：靈魂注入",
      title: "「桃園養心推拿」專屬 App 化",
      desc: "基礎打好後，老闆貼上官方網站。AI 助手化身設計師，提取深綠與暗金的療癒色調，將首頁、服務項目、常見問題 (FAQ) 與點數錢包完美揉合。加上底部導航列，一個具備商業邏輯的專業 App 正式誕生！",
      icon: "🌿",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f5] pb-24 font-sans">
      {/* 頂部導航列 */}
      <div className="bg-[#2c5234] text-white pt-12 pb-8 px-6 shadow-md rounded-b-3xl">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/" className="text-white/80 hover:text-white flex items-center gap-1 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            返回
          </Link>
          <h1 className="text-xl font-bold tracking-widest text-[#d4af37]">開發幕後秘辛</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 mt-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-[#2c5234] mb-3">AI 協作開發傳奇</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            這是一個「只靠說話」就開發出完整商業 App 的真實紀錄。老闆出點子，AI 寫程式，不到幾小時的奇幻旅程。
          </p>
        </div>

        {/* 時間軸 */}
        <div className="relative border-l-2 border-[#d4af37]/30 ml-4 space-y-8 pb-8">
          {steps.map((step, index) => (
            <div key={index} className="relative pl-6">
              {/* 時間軸節點 */}
              <div className="absolute -left-[17px] top-1 bg-white border-2 border-[#d4af37] w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm">
                {step.icon}
              </div>
              
              {/* 內容卡片 */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative">
                <div className="absolute top-0 right-0 bg-[#f4f6f5] text-[#2c5234] text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-2xl border-b border-l border-gray-100">
                  {step.time}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 結語 */}
        <div className="mt-4 bg-[#2c5234] text-white rounded-2xl p-6 shadow-lg text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <h3 className="text-xl font-bold text-[#d4af37] mb-2 relative z-10">老闆想對你說：</h3>
          <p className="text-sm text-emerald-50 leading-relaxed relative z-10">
            「你看！這是我今天下午親手指揮 AI 做出來的專屬 App！從無到有，連金流跟資料庫都接好了，是不是超酷的？」
          </p>
          <div className="mt-6 relative z-10">
            <Link href="/" className="inline-block bg-white text-[#2c5234] px-6 py-2 rounded-full font-bold shadow-md hover:bg-gray-50 transition-colors">
              去逛逛首頁
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

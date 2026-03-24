"use client";

import { useState } from "react";
import Link from "next/link";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "Q1：我怕痛，適合做推拿嗎？",
      a: "適合。被我們調整時通常會有一個感受是：「會痠、會有感覺，但你自己知道我們的手法，按通之後身體會輕鬆。」因為，我們的手法有一個特點：在推拿同一個位置時，會刻意留「肌肉舒張的空間」。意思是說，就像高架橋一樣，每隔一段距離會留縫隙，讓結構有熱脹冷縮的空間，肌肉也是，不會一路＂硬＂痛。",
    },
    {
      q: "Q2：女生來做推拿會不會不自在？",
      a: "師傅推拿時有界限，例如腹部下三角處不按、例如 推拿過程中，靠近敏感處時（例如腰痠和屁股窩有關係如需按屁股窩），部位的手法會刻意用更＂剛硬＂的方式按摩，這樣可以避免撫摸／輕柔等被騷擾的風險在！（深層來說：師傅曾也有被過度越矩的經驗，知道那種不舒服的觸感摸式是如何，所以會拿捏好分寸！加上師傅面善心善，可以放心） ：）",
    },
    {
      q: "Q3：如果我其實沒有很嚴重，也能來嗎？",
      a: "可以。我們大部分客人身體痠痛緩解後，每隔一段時間(1~4周)都會定期來保養身體，畢竟現在人壓力很多（工作肩頸酸、睡前划手機（眼睛周邊）、情緒過不去等等），身體都有可舒緩／心情紓壓的空間：）",
    },
    {
      q: "Q4：如果我只想試一次、不想被推銷，可以嗎？",
      a: "當然可以。你來這裡，如果你是Ｉ（內向）人，也不需要做任何承諾，我們這裡名稱叫「養心推拿」，就是目標養身也養心。",
    },
    {
      q: "Q5：如果我不想被分析、不想聽太多解釋，可以嗎？",
      a: "可以，雖然師傅推拿時會蠻無聊的，但如果您只是想治標，有需求就來（給我們賺錢），我們當然盛大歡迎！（賺的錢我們會有（蠻大）部分的比例投資在師傅自己的福報／磁場／健康上，做這行最需要細水長流，也要對靈學產生敬重，很多投資是極度需要的（善循環回流更可以幫助到你們）",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f5] pb-12 font-sans">
      {/* 頂部導航列 */}
      <div className="bg-[#2c5234] text-white pt-12 pb-8 px-6 shadow-md rounded-b-3xl">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/" className="text-white/80 hover:text-white flex items-center gap-1 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            返回
          </Link>
          <h1 className="text-xl font-bold tracking-widest text-[#d4af37]">常見問題</h1>
          <div className="w-16"></div> {/* 平衡排版 */}
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 mt-8">
        {/* 標題區 */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#2c5234] mb-2 flex items-center justify-center gap-2">
            <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            推拿常見擔心 Q & A
          </h2>
          <p className="text-gray-600 text-sm">師傅親自回覆您的疑慮，讓您安心前來</p>
        </div>

        {/* Q&A 手風琴列表 */}
        <div className="space-y-4 mb-10">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-sm border transition-all duration-300 overflow-hidden ${
                openIndex === index ? 'border-[#d4af37] ring-1 ring-[#d4af37]/20' : 'border-gray-100'
              }`}
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-5 py-4 flex justify-between items-center focus:outline-none"
              >
                <h3 className={`font-bold pr-4 leading-snug ${openIndex === index ? 'text-[#b5952f]' : 'text-gray-800'}`}>
                  {faq.q}
                </h3>
                <span className={`transform transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180 text-[#d4af37]' : 'text-gray-400'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
              </button>
              
              <div 
                className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-[500px] opacity-100 pb-5' : 'max-h-0 opacity-0 pb-0'
                }`}
              >
                <div className="pt-2 border-t border-gray-50">
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 預約按鈕區塊 */}
        <div className="text-center mt-8 pb-4">
          <p className="text-sm text-gray-500 mb-4">還有其他問題嗎？歡迎直接聯繫我們</p>
          <a 
            href="https://line.me/ti/p/RpqqZNbwRp" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#06C755] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#05b34c] transition-colors gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.987 8.91 9.423 9.619.369.049.882.155 1.01.46.12.285.078.736.037 1.03l-.337 2.035c-.053.308-.25 1.203 1.055.653 1.305-.55 7.038-4.148 9.539-7.051 2.148-2.492 3.273-5.076 3.273-6.746z"/>
            </svg>
            加 LINE 諮詢 / 預約
          </a>
        </div>

      </div>
    </div>
  );
}

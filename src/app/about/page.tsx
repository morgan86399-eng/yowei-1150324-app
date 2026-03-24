'use client';
import React from 'react';
import Image from 'next/image';
import { Heart, BookOpen, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-[#2c5234]">
            關於我們
          </h1>
          <p className="text-center text-lg text-gray-600 mb-12">養身先養心，相由心生</p>

          {/* Section 1: Core Philosophy */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12 border-l-4 border-[#d4af37]">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-[#2c5234] mb-4 flex items-center">
                <Heart className="mr-3 text-[#d4af37]" />
                身心靈一體的核心理念
              </h2>
              <div className="md:flex md:gap-8">
                <div className="md:w-1/2 mb-4 md:mb-0">
                  <Image 
                    src="https://fd10e8e1c7.cbaul-cdnwnd.com/daec49a09b8083b3e3ac051ff98ea00b/200000019-d8521d8523/222.jpg" 
                    alt="核心理念"
                    width={400}
                    height={300}
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="md:w-1/2 text-gray-700 space-y-4 leading-relaxed">
                  <p>
                    您會疲勞、痠痛，胸口緊悶，其實很多時候，不一定純粹與工作疲勞相關。以中醫來說，身、心、靈是一體，尤其是身體素質與個性會互相影響。
                  </p>
                  <p>
                    我們的目標是，您來，除了身體改善、更要帶您了解您自己的身體痠痛點盲點在哪，回家後，也能給您在您的程度所能執行的緩解方法。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 & 3: Grid Layout */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Charity */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Image 
                    src="https://fd10e8e1c7.cbaul-cdnwnd.com/daec49a09b8083b3e3ac051ff98ea00b/200000020-3d55c3d55e/194221-6.jpg" 
                    alt="公益活動"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#2c5234] mb-3 flex items-center">
                  <Users className="mr-3 text-[#d4af37]" />
                  公益活動與社會回饋
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  我們深信，專業的能力應當回饋社會。因此，我們積極參與各式各樣的公益活動，將我們的專業推拿技術帶到需要的角落，為社區的健康貢獻一份心力。
                </p>
              </div>
            </div>
            
            {/* Teaching */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Image 
                    src="https://fd10e8e1c7.cbaul-cdnwnd.com/daec49a09b8083b3e3ac051ff98ea00b/200000040-dc3e6dc3e8/232981063_4874864072527801_6946493958422866811_n-1.jpg" 
                    alt="教學分享"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#2c5234] mb-3 flex items-center">
                  <BookOpen className="mr-3 text-[#d4af37]" />
                  教學分享與傳承
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  我們不僅僅是治療者，也是知識的分享者。我們樂於舉辦推拿初階教學分享會，將我們的經驗與心得傳承下去，希望能讓更多人了解自己身體的奧秘。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;

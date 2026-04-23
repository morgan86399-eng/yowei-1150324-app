"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { AllDiagramsResponse, DiagramType, PositionedNode } from "@/lib/diagram/types";
import DiagramCanvas from "@/components/diagram/DiagramCanvas";
import NodeDetailPanel from "@/components/diagram/NodeDetailPanel";

const TABS: { key: DiagramType; label: string }[] = [
  { key: "mindmap", label: "心智圖" },
  { key: "flowchart", label: "執行圖" },
  { key: "tree", label: "樹狀圖" },
];

export default function DiagramPage() {
  const [inputText, setInputText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allDiagrams, setAllDiagrams] = useState<AllDiagramsResponse | null>(null);
  const [activeTab, setActiveTab] = useState<DiagramType>("mindmap");
  const [selectedNode, setSelectedNode] = useState<PositionedNode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("圖片大小不可超過 5MB");
      return;
    }
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleGenerate() {
    if (!inputText.trim() && !imageFile) {
      setError("請輸入文字內容或上傳圖片");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAllDiagrams(null);

    try {
      const formData = new FormData();
      if (inputText.trim()) formData.append("text", inputText);
      if (imageFile) formData.append("image", imageFile);

      const res = await fetch("/api/diagram", { method: "POST", body: formData });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "發生未知錯誤");
        return;
      }
      setAllDiagrams(json.data);
      setActiveTab("mindmap");
    } catch {
      setError("連線錯誤，請稍後再試");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f6f5] pb-12">
      {/* 頂部綠色標題列 */}
      <div className="bg-[#2c5234] text-white pt-12 pb-8 px-6 shadow-md rounded-b-3xl">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回
          </Link>
          <h1 className="text-xl font-bold tracking-widest text-[#d4af37]">圖表生成器</h1>
          <div className="w-14" />
        </div>
        <p className="text-center text-white/60 text-xs mt-2 tracking-wide">
          輸入文字或圖片，AI 自動生成圖表
        </p>
      </div>

      <div className="max-w-md mx-auto px-4 mt-5 space-y-4">
        {/* 輸入區 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <label className="block text-xs font-bold text-[#2c5234] mb-2">
            文字內容
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="輸入任何主題，例如：「如何做好專案管理」、「健康生活的要素」..."
            rows={4}
            className="w-full text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#2c5234]/30 focus:border-[#2c5234] transition-colors"
          />

          {/* 圖片上傳 */}
          <div className="mt-3">
            <label className="block text-xs font-bold text-[#2c5234] mb-2">
              上傳圖片（選填）
            </label>
            {imagePreview ? (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="預覽"
                  className="h-24 w-auto rounded-xl border border-gray-200 object-cover"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-200 rounded-xl py-4 text-gray-400 text-sm hover:border-[#2c5234]/40 hover:text-[#2c5234] transition-colors flex flex-col items-center gap-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                點擊上傳圖片
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* 錯誤提示 */}
          {error && (
            <div className="mt-3 bg-red-50 border border-red-100 rounded-xl p-3 text-red-600 text-xs">
              {error}
            </div>
          )}

          {/* 生成按鈕 */}
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="mt-4 w-full bg-[#2c5234] text-white font-bold py-3 rounded-xl hover:bg-[#1e3d26] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                AI 分析中...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                生成圖表
              </>
            )}
          </button>
        </div>

        {/* 讀取中骨架 */}
        {isLoading && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
            <div className="h-4 bg-gray-100 rounded-full w-2/3 mx-auto mb-4" />
            <div className="h-48 bg-gray-50 rounded-xl" />
          </div>
        )}

        {/* 圖表結果 */}
        {allDiagrams && !isLoading && (
          <>
            {/* 分頁標籤 */}
            <div className="flex rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 py-3 text-sm font-bold transition-colors ${
                    activeTab === tab.key
                      ? "bg-[#2c5234] text-white"
                      : "text-gray-500 hover:text-[#2c5234]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 圖表標題 */}
            <div className="text-center">
              <span className="text-xs text-gray-500">
                {allDiagrams[activeTab]?.title}
              </span>
            </div>

            {/* 圖表畫布 */}
            <DiagramCanvas
              allDiagrams={allDiagrams}
              activeTab={activeTab}
              onNodeClick={setSelectedNode}
            />
          </>
        )}
      </div>

      {/* 節點詳情面板 */}
      <NodeDetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  );
}

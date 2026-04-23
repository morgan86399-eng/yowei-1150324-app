"use client";

import { PositionedNode } from "@/lib/diagram/types";

interface Props {
  node: PositionedNode | null;
  onClose: () => void;
}

function Section({ title, content, color }: { title: string; content: string; color: string }) {
  return (
    <div className="mb-4">
      <div className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-1.5 ${color}`}>
        {title}
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
}

export default function NodeDetailPanel({ node, onClose }: Props) {
  return (
    <>
      {node && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${
          node ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-md mx-auto px-5 pt-4 pb-24">
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />

          {node && (
            <>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-[#2c5234] leading-snug pr-3">
                  {node.label}
                </h3>
                <button
                  onClick={onClose}
                  className="shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <Section
                title="❓ 為什麼"
                content={node.why}
                color="bg-green-100 text-[#2c5234]"
              />
              <Section
                title="📝 摘要"
                content={node.summary}
                color="bg-yellow-100 text-yellow-800"
              />
              {node.details && node.details.trim() && (
                <Section
                  title="💡 詳情"
                  content={node.details}
                  color="bg-blue-100 text-blue-800"
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

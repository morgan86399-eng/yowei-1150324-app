"use client";

import { AllDiagramsResponse, DiagramType, PositionedNode } from "@/lib/diagram/types";
import MindMapRenderer from "./MindMapRenderer";
import TreeRenderer from "./TreeRenderer";
import FlowchartRenderer from "./FlowchartRenderer";

interface Props {
  allDiagrams: AllDiagramsResponse;
  activeTab: DiagramType;
  onNodeClick: (node: PositionedNode) => void;
}

export default function DiagramCanvas({ allDiagrams, activeTab, onNodeClick }: Props) {
  const diagram = allDiagrams[activeTab];
  if (!diagram) return null;

  return (
    <div
      className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-auto"
      style={{ maxHeight: "65vh" }}
    >
      <div className="p-3">
        <p className="text-center text-xs text-gray-400 mb-2">
          點擊節點查看詳情
        </p>
        {activeTab === "mindmap" && (
          <MindMapRenderer
            nodes={diagram.nodes}
            edges={diagram.edges}
            onNodeClick={onNodeClick}
          />
        )}
        {activeTab === "tree" && (
          <TreeRenderer
            nodes={diagram.nodes}
            edges={diagram.edges}
            onNodeClick={onNodeClick}
          />
        )}
        {activeTab === "flowchart" && (
          <FlowchartRenderer
            nodes={diagram.nodes}
            edges={diagram.edges}
            onNodeClick={onNodeClick}
          />
        )}
      </div>
    </div>
  );
}

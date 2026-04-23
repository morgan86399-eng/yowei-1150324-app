"use client";

import { DiagramNodeData, DiagramEdge, PositionedNode } from "@/lib/diagram/types";
import { layoutTree, getTreeViewBox } from "@/lib/diagram/layoutTree";

interface Props {
  nodes: DiagramNodeData[];
  edges: DiagramEdge[];
  onNodeClick: (node: PositionedNode) => void;
}

const FILL: Record<string, string> = {
  root: "#2c5234",
  branch: "#d4af37",
  leaf: "#ffffff",
  default: "#f4f6f5",
};
const TEXT_COLOR: Record<string, string> = {
  root: "#ffffff",
  branch: "#ffffff",
  leaf: "#2c5234",
  default: "#2c5234",
};

function wrapLabel(label: string, maxLen = 8): string[] {
  if (label.length <= maxLen) return [label];
  const lines: string[] = [];
  for (let i = 0; i < label.length; i += maxLen) {
    lines.push(label.slice(i, i + maxLen));
  }
  return lines;
}

function NodeShape({ node, onClick }: { node: PositionedNode; onClick: () => void }) {
  const fill = FILL[node.type] ?? FILL.default;
  const textColor = TEXT_COLOR[node.type] ?? TEXT_COLOR.default;
  const stroke = node.type === "leaf" ? "#2c5234" : "none";
  const lines = wrapLabel(node.label);
  const lineH = 13;
  const totalH = Math.max(node.height, lines.length * lineH + 12);

  return (
    <g
      transform={`translate(${node.x},${node.y})`}
      onClick={onClick}
      className="cursor-pointer"
      style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.12))" }}
    >
      <rect
        x={-node.width / 2}
        y={-totalH / 2}
        width={node.width}
        height={totalH}
        rx={8}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.5}
      />
      {lines.map((line, i) => (
        <text
          key={i}
          x={0}
          y={(i - (lines.length - 1) / 2) * lineH}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={textColor}
          fontSize={10}
          fontWeight={node.type === "root" ? "bold" : "normal"}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export default function TreeRenderer({ nodes, edges, onNodeClick }: Props) {
  const positioned = layoutTree(nodes);
  const viewBox = getTreeViewBox(positioned);
  const posMap = new Map(positioned.map((n) => [n.id, n]));

  return (
    <svg viewBox={viewBox} className="w-full" style={{ minHeight: 280, overflow: "visible" }}>
      {edges.map((e, i) => {
        const from = posMap.get(e.from);
        const to = posMap.get(e.to);
        if (!from || !to) return null;
        const midY = (from.y + to.y) / 2;
        return (
          <path
            key={i}
            d={`M ${from.x} ${from.y + from.height / 2} C ${from.x} ${midY} ${to.x} ${midY} ${to.x} ${to.y - to.height / 2}`}
            fill="none"
            stroke="#c8d4cc"
            strokeWidth={1.5}
          />
        );
      })}
      {positioned.map((node) => (
        <NodeShape key={node.id} node={node} onClick={() => onNodeClick(node)} />
      ))}
    </svg>
  );
}

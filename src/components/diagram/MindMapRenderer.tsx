"use client";

import { DiagramNodeData, DiagramEdge, PositionedNode } from "@/lib/diagram/types";
import { layoutMindMap, getMindMapViewBox } from "@/lib/diagram/layoutMindMap";

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

function NodeShape({
  node,
  onClick,
}: {
  node: PositionedNode;
  onClick: () => void;
}) {
  const fill = FILL[node.type] ?? FILL.default;
  const textColor = TEXT_COLOR[node.type] ?? TEXT_COLOR.default;
  const stroke = node.type === "leaf" ? "#2c5234" : "none";
  const rx = node.type === "root" ? 12 : 8;
  const lines = wrapLabel(node.label, node.type === "root" ? 7 : 6);
  const lineH = 14;
  const totalTextH = lines.length * lineH;
  const h = Math.max(node.height, totalTextH + 14);

  return (
    <g
      transform={`translate(${node.x},${node.y})`}
      onClick={onClick}
      className="cursor-pointer"
      style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.15))" }}
    >
      <rect
        x={-node.width / 2}
        y={-h / 2}
        width={node.width}
        height={h}
        rx={rx}
        fill={fill}
        stroke={stroke}
        strokeWidth={node.type === "leaf" ? 1.5 : 0}
      />
      {lines.map((line, i) => (
        <text
          key={i}
          x={0}
          y={(i - (lines.length - 1) / 2) * lineH + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={textColor}
          fontSize={node.type === "root" ? 11 : 10}
          fontWeight={node.type === "root" ? "bold" : "normal"}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export default function MindMapRenderer({ nodes, edges, onNodeClick }: Props) {
  const positioned = layoutMindMap(nodes);
  const viewBox = getMindMapViewBox(positioned);
  const posMap = new Map(positioned.map((n) => [n.id, n]));

  return (
    <svg
      viewBox={viewBox}
      className="w-full"
      style={{ minHeight: 320, overflow: "visible" }}
    >
      {edges.map((e, i) => {
        const from = posMap.get(e.from);
        const to = posMap.get(e.to);
        if (!from || !to) return null;
        const mx = (from.x + to.x) / 2;
        const my = (from.y + to.y) / 2;
        return (
          <path
            key={i}
            d={`M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`}
            fill="none"
            stroke="#c8d4cc"
            strokeWidth={1.5}
          />
        );
      })}
      {positioned.map((node) => (
        <NodeShape
          key={node.id}
          node={node}
          onClick={() => onNodeClick(node)}
        />
      ))}
    </svg>
  );
}

"use client";

import { DiagramNodeData, DiagramEdge, PositionedNode } from "@/lib/diagram/types";
import { layoutFlowchart, getFlowchartViewBox } from "@/lib/diagram/layoutFlowchart";

interface Props {
  nodes: DiagramNodeData[];
  edges: DiagramEdge[];
  onNodeClick: (node: PositionedNode) => void;
}

function wrapLabel(label: string, maxLen = 8): string[] {
  if (label.length <= maxLen) return [label];
  const lines: string[] = [];
  for (let i = 0; i < label.length; i += maxLen) {
    lines.push(label.slice(i, i + maxLen));
  }
  return lines;
}

function NodeShape({ node, onClick }: { node: PositionedNode; onClick: () => void }) {
  const lines = wrapLabel(node.label);
  const lineH = 13;

  if (node.type === "decision") {
    const w = node.width;
    const h = node.height;
    const points = `0,${-h / 2} ${w / 2},0 0,${h / 2} ${-w / 2},0`;
    return (
      <g transform={`translate(${node.x},${node.y})`} onClick={onClick} className="cursor-pointer">
        <polygon points={points} fill="#d4af37" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.12))" }} />
        {lines.map((line, i) => (
          <text
            key={i}
            x={0}
            y={(i - (lines.length - 1) / 2) * lineH}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#ffffff"
            fontSize={9}
            fontWeight="bold"
          >
            {line}
          </text>
        ))}
      </g>
    );
  }

  const isStartEnd = node.type === "start" || node.type === "end";
  const fill = isStartEnd ? "#2c5234" : "#f4f6f5";
  const textColor = isStartEnd ? "#ffffff" : "#2c5234";
  const rx = isStartEnd ? 20 : 8;
  const stroke = isStartEnd ? "none" : "#2c5234";
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
        rx={rx}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
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
          fontWeight={isStartEnd ? "bold" : "normal"}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function Arrow({
  from,
  to,
  label,
}: {
  from: PositionedNode;
  to: PositionedNode;
  label?: string;
}) {
  const x1 = from.x;
  const y1 = from.y + from.height / 2;
  const x2 = to.x;
  const y2 = to.y - to.height / 2;
  const midY = (y1 + y2) / 2;

  return (
    <g>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#9caa9e" />
        </marker>
      </defs>
      <path
        d={`M ${x1} ${y1} C ${x1} ${midY} ${x2} ${midY} ${x2} ${y2}`}
        fill="none"
        stroke="#9caa9e"
        strokeWidth={1.5}
        markerEnd="url(#arrowhead)"
      />
      {label && (
        <text
          x={(x1 + x2) / 2 + 5}
          y={midY}
          fontSize={9}
          fill="#6b7280"
          textAnchor="start"
          dominantBaseline="middle"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export default function FlowchartRenderer({ nodes, edges, onNodeClick }: Props) {
  const positioned = layoutFlowchart(nodes, edges);
  const viewBox = getFlowchartViewBox(positioned);
  const posMap = new Map(positioned.map((n) => [n.id, n]));

  return (
    <svg viewBox={viewBox} className="w-full" style={{ minHeight: 320, overflow: "visible" }}>
      {edges.map((e, i) => {
        const from = posMap.get(e.from);
        const to = posMap.get(e.to);
        if (!from || !to) return null;
        return <Arrow key={i} from={from} to={to} label={e.label} />;
      })}
      {positioned.map((node) => (
        <NodeShape key={node.id} node={node} onClick={() => onNodeClick(node)} />
      ))}
    </svg>
  );
}

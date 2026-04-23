import { DiagramNodeData, DiagramEdge, PositionedNode } from "./types";

const H_GAP = 30;
const V_GAP = 90;
const NODE_W = 100;
const NODE_H = 40;
const DECISION_W = 110;
const DECISION_H = 50;

export function layoutFlowchart(
  nodes: DiagramNodeData[],
  edges: DiagramEdge[]
): PositionedNode[] {
  if (nodes.length === 0) return [];

  // assign layer by longest path from start
  const layerMap = new Map<string, number>();
  const outEdges = new Map<string, string[]>();
  const inDegree = new Map<string, number>();

  nodes.forEach((n) => {
    outEdges.set(n.id, []);
    inDegree.set(n.id, 0);
  });

  edges.forEach((e) => {
    outEdges.get(e.from)?.push(e.to);
    inDegree.set(e.to, (inDegree.get(e.to) ?? 0) + 1);
  });

  // topological sort
  const queue: string[] = [];
  inDegree.forEach((deg, id) => {
    if (deg === 0) queue.push(id);
  });

  // if nothing with 0 in-degree, start with level 0 nodes
  if (queue.length === 0) {
    nodes.filter((n) => n.level === 0).forEach((n) => queue.push(n.id));
  }

  while (queue.length > 0) {
    const cur = queue.shift()!;
    const curLayer = layerMap.get(cur) ?? 0;
    outEdges.get(cur)?.forEach((next) => {
      const nextLayer = Math.max(layerMap.get(next) ?? 0, curLayer + 1);
      layerMap.set(next, nextLayer);
      const deg = (inDegree.get(next) ?? 1) - 1;
      inDegree.set(next, deg);
      if (deg === 0) queue.push(next);
    });
  }

  // fallback: use node's own level field
  nodes.forEach((n) => {
    if (!layerMap.has(n.id)) layerMap.set(n.id, n.level);
  });

  // group by layer
  const byLayer = new Map<number, string[]>();
  layerMap.forEach((layer, id) => {
    const arr = byLayer.get(layer) ?? [];
    arr.push(id);
    byLayer.set(layer, arr);
  });

  // compute x positions per layer
  const xMap = new Map<string, number>();
  byLayer.forEach((ids, _layer) => {
    const totalW = ids.length * NODE_W + (ids.length - 1) * H_GAP;
    const startX = -totalW / 2 + NODE_W / 2;
    ids.forEach((id, i) => {
      xMap.set(id, startX + i * (NODE_W + H_GAP));
    });
  });

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return nodes.map((n) => {
    const layer = layerMap.get(n.id) ?? n.level;
    const x = xMap.get(n.id) ?? 0;
    const y = layer * V_GAP;
    const isDecision = n.type === "decision";
    return {
      ...n,
      x,
      y,
      width: isDecision ? DECISION_W : NODE_W,
      height: isDecision ? DECISION_H : NODE_H,
    };
  });

  void nodeMap;
}

export function getFlowchartViewBox(positioned: PositionedNode[]): string {
  if (positioned.length === 0) return "0 0 400 400";
  const pad = 50;
  const xs = positioned.map((n) => n.x);
  const ys = positioned.map((n) => n.y);
  const minX = Math.min(...xs) - NODE_W / 2 - pad;
  const minY = Math.min(...ys) - NODE_H / 2 - pad;
  const maxX = Math.max(...xs) + NODE_W / 2 + pad;
  const maxY = Math.max(...ys) + NODE_H / 2 + pad;
  return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
}

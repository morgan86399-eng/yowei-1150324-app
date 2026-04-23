import { DiagramNodeData, PositionedNode } from "./types";

const NODE_WIDTH = { root: 90, branch: 80, leaf: 70 } as const;
const NODE_HEIGHT = { root: 38, branch: 32, leaf: 28 } as const;
const RADII = [0, 140, 250, 350];
const CX = 210;
const CY = 210;

function getSize(type: string) {
  const w = NODE_WIDTH[type as keyof typeof NODE_WIDTH] ?? 70;
  const h = NODE_HEIGHT[type as keyof typeof NODE_HEIGHT] ?? 28;
  return { width: w, height: h };
}

export function layoutMindMap(nodes: DiagramNodeData[]): PositionedNode[] {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  const root = nodes.find((n) => n.level === 0);
  if (!root) return [];

  const result: PositionedNode[] = [];
  const positioned = new Map<string, { x: number; y: number }>();

  const rootSize = getSize(root.type);
  positioned.set(root.id, { x: CX, y: CY });
  result.push({ ...root, x: CX, y: CY, ...rootSize });

  const level1 = nodes.filter((n) => n.level === 1);
  const total1 = level1.length;

  level1.forEach((node, i) => {
    const angle = (i / total1) * 2 * Math.PI - Math.PI / 2;
    const r = RADII[1];
    const x = CX + r * Math.cos(angle);
    const y = CY + r * Math.sin(angle);
    positioned.set(node.id, { x, y });
    const size = getSize(node.type);
    result.push({ ...node, x, y, ...size });

    const parentAngle = angle;
    const level2 = nodes.filter((n) => n.parentId === node.id);
    const total2 = level2.length;

    level2.forEach((child, j) => {
      const spread = Math.PI / 4;
      const childAngle =
        total2 === 1
          ? parentAngle
          : parentAngle - spread / 2 + (j / (total2 - 1)) * spread;
      const r2 = RADII[2];
      const cx2 = CX + r2 * Math.cos(childAngle);
      const cy2 = CY + r2 * Math.sin(childAngle);
      positioned.set(child.id, { x: cx2, y: cy2 });
      const childSize = getSize(child.type);
      result.push({ ...child, x: cx2, y: cy2, ...childSize });

      const level3 = nodes.filter((n) => n.parentId === child.id);
      const total3 = level3.length;
      level3.forEach((grandchild, k) => {
        const spread3 = Math.PI / 6;
        const g3Angle =
          total3 === 1
            ? childAngle
            : childAngle - spread3 / 2 + (k / (total3 - 1)) * spread3;
        const r3 = RADII[3];
        const cx3 = CX + r3 * Math.cos(g3Angle);
        const cy3 = CY + r3 * Math.sin(g3Angle);
        const g3Size = getSize(grandchild.type);
        result.push({ ...grandchild, x: cx3, y: cy3, ...g3Size });
      });
    });
  });

  // fallback: any unpositioned node
  nodes.forEach((n) => {
    if (!result.find((r) => r.id === n.id)) {
      const size = getSize(n.type);
      result.push({ ...n, x: CX, y: CY, ...size });
    }
  });

  void nodeMap;
  return result;
}

export function getMindMapViewBox(positioned: PositionedNode[]): string {
  if (positioned.length === 0) return "0 0 420 420";
  const pad = 60;
  const xs = positioned.map((n) => n.x);
  const ys = positioned.map((n) => n.y);
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const maxX = Math.max(...xs) + pad;
  const maxY = Math.max(...ys) + pad;
  return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
}

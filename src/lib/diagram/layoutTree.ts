import { DiagramNodeData, PositionedNode } from "./types";

const H_GAP = 20;
const V_GAP = 90;
const NODE_W = 90;
const NODE_H = 36;

interface TreeNode {
  data: DiagramNodeData;
  children: TreeNode[];
  x: number;
  mod: number;
}

function buildTree(nodes: DiagramNodeData[]): TreeNode | null {
  const nodeMap = new Map<string, TreeNode>();
  nodes.forEach((n) =>
    nodeMap.set(n.id, { data: n, children: [], x: 0, mod: 0 })
  );

  let root: TreeNode | null = null;
  nodes.forEach((n) => {
    const tNode = nodeMap.get(n.id)!;
    if (n.parentId && nodeMap.has(n.parentId)) {
      nodeMap.get(n.parentId)!.children.push(tNode);
    } else if (n.level === 0) {
      root = tNode;
    }
  });

  if (!root) {
    // pick node with no parent
    const ids = new Set(nodes.map((n) => n.id));
    const childIds = new Set(nodes.filter((n) => n.parentId).map((n) => n.parentId!));
    for (const n of nodes) {
      if (!childIds.has(n.id) || n.level === 0) {
        root = nodeMap.get(n.id) ?? null;
        if (root) break;
      }
    }
    void ids;
  }

  return root;
}

let leafCounter = 0;

function firstWalk(node: TreeNode): void {
  if (node.children.length === 0) {
    node.x = leafCounter++ * (NODE_W + H_GAP);
    return;
  }
  node.children.forEach(firstWalk);
  const first = node.children[0].x;
  const last = node.children[node.children.length - 1].x;
  node.x = (first + last) / 2;
}

function secondWalk(node: TreeNode, modSum: number, result: PositionedNode[]): void {
  const finalX = node.x + modSum;
  result.push({
    ...node.data,
    x: finalX,
    y: node.data.level * V_GAP + NODE_H / 2,
    width: NODE_W,
    height: NODE_H,
  });
  node.children.forEach((c) => secondWalk(c, modSum + node.mod, result));
}

export function layoutTree(nodes: DiagramNodeData[]): PositionedNode[] {
  if (nodes.length === 0) return [];
  leafCounter = 0;
  const root = buildTree(nodes);
  if (!root) return [];
  firstWalk(root);
  const result: PositionedNode[] = [];
  secondWalk(root, 0, result);
  return result;
}

export function getTreeViewBox(positioned: PositionedNode[]): string {
  if (positioned.length === 0) return "0 0 400 400";
  const pad = 40;
  const xs = positioned.map((n) => n.x);
  const ys = positioned.map((n) => n.y);
  const minX = Math.min(...xs) - NODE_W / 2 - pad;
  const minY = Math.min(...ys) - NODE_H / 2 - pad;
  const maxX = Math.max(...xs) + NODE_W / 2 + pad;
  const maxY = Math.max(...ys) + NODE_H / 2 + pad;
  return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
}

export type DiagramType = 'mindmap' | 'flowchart' | 'tree';
export type NodeType = 'root' | 'branch' | 'leaf' | 'process' | 'decision' | 'start' | 'end';

export interface DiagramNodeData {
  id: string;
  label: string;
  parentId?: string;
  type: NodeType;
  why: string;
  summary: string;
  details?: string;
  level: number;
  children?: string[];
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

export interface DiagramData {
  title: string;
  type: DiagramType;
  nodes: DiagramNodeData[];
  edges: DiagramEdge[];
}

export interface AllDiagramsResponse {
  mindmap: DiagramData;
  flowchart: DiagramData;
  tree: DiagramData;
}

export interface PositionedNode extends DiagramNodeData {
  x: number;
  y: number;
  width: number;
  height: number;
}

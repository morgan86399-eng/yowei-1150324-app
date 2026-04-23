import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

function buildPrompt(text: string): string {
  return `你是一個專業的圖表生成助手。請分析以下內容，產生三種圖表的結構化資料。

內容：
${text}

請以純 JSON 格式回傳（不要有 markdown 程式碼圍欄，不要有任何說明文字），格式如下：

{
  "mindmap": {
    "title": "標題",
    "type": "mindmap",
    "nodes": [
      {
        "id": "mm-root",
        "label": "核心主題",
        "type": "root",
        "level": 0,
        "children": ["mm-1", "mm-2"],
        "why": "為什麼這是核心（一句話）",
        "summary": "摘要說明（1-2句）",
        "details": "補充細節（選填）"
      },
      {
        "id": "mm-1",
        "label": "分支主題",
        "parentId": "mm-root",
        "type": "branch",
        "level": 1,
        "children": ["mm-1-1"],
        "why": "為什麼有這個分支",
        "summary": "分支摘要",
        "details": "補充"
      },
      {
        "id": "mm-1-1",
        "label": "子項目",
        "parentId": "mm-1",
        "type": "leaf",
        "level": 2,
        "why": "為什麼有這個子項目",
        "summary": "子項目說明",
        "details": "補充"
      }
    ],
    "edges": [
      { "from": "mm-root", "to": "mm-1" },
      { "from": "mm-1", "to": "mm-1-1" }
    ]
  },
  "flowchart": {
    "title": "標題",
    "type": "flowchart",
    "nodes": [
      { "id": "fc-start", "label": "開始", "type": "start", "level": 0, "why": "流程起點", "summary": "說明", "details": "" },
      { "id": "fc-1", "label": "步驟一", "parentId": "fc-start", "type": "process", "level": 1, "why": "為什麼這步", "summary": "說明", "details": "" },
      { "id": "fc-d1", "label": "判斷？", "parentId": "fc-1", "type": "decision", "level": 2, "why": "需要判斷", "summary": "說明", "details": "" },
      { "id": "fc-end", "label": "結束", "type": "end", "level": 4, "why": "流程終點", "summary": "說明", "details": "" }
    ],
    "edges": [
      { "from": "fc-start", "to": "fc-1" },
      { "from": "fc-1", "to": "fc-d1" },
      { "from": "fc-d1", "to": "fc-end", "label": "是" }
    ]
  },
  "tree": {
    "title": "標題",
    "type": "tree",
    "nodes": [
      { "id": "tr-root", "label": "根節點", "type": "root", "level": 0, "children": ["tr-1","tr-2"], "why": "根原因", "summary": "說明", "details": "" },
      { "id": "tr-1", "label": "子節點一", "parentId": "tr-root", "type": "branch", "level": 1, "children": ["tr-1-1"], "why": "為什麼", "summary": "說明", "details": "" },
      { "id": "tr-1-1", "label": "葉節點", "parentId": "tr-1", "type": "leaf", "level": 2, "why": "為什麼", "summary": "說明", "details": "" }
    ],
    "edges": [
      { "from": "tr-root", "to": "tr-1" },
      { "from": "tr-1", "to": "tr-1-1" }
    ]
  }
}

規則：
- mindmap：1個根節點，4-6個level 1分支，每個分支1-3個葉節點
- flowchart：從start到end，最多12個節點，包含至少一個decision節點
- tree：根節點→分支→葉節點，最多3層，每層2-5個子節點
- 所有 id 必須唯一
- why、summary 必填，用繁體中文
- 只回傳 JSON，不要任何其他文字`;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const text = formData.get("text") as string | null;
    const imageFile = formData.get("image") as File | null;

    if (!text?.trim() && !imageFile) {
      return NextResponse.json({ error: "請輸入文字或上傳圖片" }, { status: 400 });
    }

    const userContent: Anthropic.MessageParam["content"] = [];

    if (imageFile) {
      if (imageFile.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "圖片大小不可超過 5MB" }, { status: 400 });
      }
      const arrayBuffer = await imageFile.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const mediaType = imageFile.type as "image/jpeg" | "image/png" | "image/gif" | "image/webp";
      userContent.push({
        type: "image",
        source: { type: "base64", media_type: mediaType, data: base64 },
      });
    }

    userContent.push({ type: "text", text: buildPrompt(text ?? "請根據圖片內容生成圖表") });

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [{ role: "user", content: userContent }],
    });

    const rawText = (message.content[0] as { type: "text"; text: string }).text;
    const jsonText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    let data;
    try {
      data = JSON.parse(jsonText);
    } catch {
      const match = jsonText.match(/\{[\s\S]*\}/);
      if (match) {
        data = JSON.parse(match[0]);
      } else {
        throw new Error("無法解析 Claude 回傳的 JSON");
      }
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "未知錯誤";
    console.error("Diagram API Error:", message);
    return NextResponse.json({ error: "生成圖表時發生錯誤：" + message }, { status: 500 });
  }
}

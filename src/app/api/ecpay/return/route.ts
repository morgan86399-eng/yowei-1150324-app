import { NextResponse } from "next/server";
import crypto from "crypto";

const HashKey = "5294y06JbISpM5x9";
const HashIV = "v77hoKGq4kWxNNIS";

// 接收綠界背景通知的 API
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const body: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      body[key] = value.toString();
    });

    // 確認回傳參數是否為付款成功 (RtnCode === "1")
    if (body.RtnCode === "1") {
      // 驗證檢查碼
      const receiveCheckMacValue = body.CheckMacValue;
      delete body.CheckMacValue; // 從計算參數中移除
      const keys = Object.keys(body).sort();
      let checkMacValueStr = `HashKey=${HashKey}`;
      for (const key of keys) {
        checkMacValueStr += `&${key}=${body[key]}`;
      }
      checkMacValueStr += `&HashIV=${HashIV}`;

      let encodedStr = encodeURIComponent(checkMacValueStr)
        .replace(/%20/g, "+").replace(/%2D/g, "-").replace(/%5F/g, "_")
        .replace(/%2E/g, ".").replace(/%21/g, "!").replace(/%2A/g, "*")
        .replace(/%28/g, "(").replace(/%29/g, ")").toLowerCase();

      const computedCheckMacValue = crypto.createHash("sha256").update(encodedStr).digest("hex").toUpperCase();

      if (receiveCheckMacValue === computedCheckMacValue) {
        // 付款驗證成功，不再處理點數
        // 必須回傳這句話，綠界才不會一直重發通知
        return new NextResponse("1|OK", { status: 200, headers: { "Content-Type": "text/plain" } });
      }
    }
    
    // 沒成功或驗證不過
    return new NextResponse("0|Error", { status: 400, headers: { "Content-Type": "text/plain" } });
  } catch (err) {
    console.error("ECPay return error:", err);
    return new NextResponse("0|Exception", { status: 500, headers: { "Content-Type": "text/plain" } });
  }
}

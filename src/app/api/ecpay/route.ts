import crypto from "crypto";

// 綠界測試環境的固定參數
const MerchantID = "2000132";
const HashKey = "5294y06JbISpM5x9";
const HashIV = "v77hoKGq4kWxNNIS";
const ECPayUrl = "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5";

export async function POST(req: Request) {
  const { amount = "1600", itemName = "養心推拿服務費用" } = await req.json();

  // 建立訂單基本資料
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  const MerchantTradeNo = `SVC${now.getTime()}`; // 產生獨一無二的訂單編號
  const MerchantTradeDate = `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const params: { [key: string]: string } = {
    MerchantID,
    MerchantTradeNo,
    MerchantTradeDate,
    PaymentType: "aio",
    TotalAmount: amount,
    TradeDesc: "ServicePayment",
    ItemName: itemName,
    ReturnURL: "http://localhost:3000/api/ecpay/return", // 綠界背景通知網址
    ClientBackURL: "http://localhost:3000/checkout?success=true", // 使用者付款完成後返回的網址
    ChoosePayment: "ALL", // 顯示所有付款方式 (信用卡、ATM、超商等)
    EncryptType: "1",
  };

  // 依照綠界規則計算 CheckMacValue (檢查碼)
  const keys = Object.keys(params).sort();
  let checkMacValueStr = `HashKey=${HashKey}`;
  for (const key of keys) {
    checkMacValueStr += `&${key}=${params[key]}`;
  }
  checkMacValueStr += `&HashIV=${HashIV}`;

  // 轉為 URL Encode 並替換特殊字元
  let encodedStr = encodeURIComponent(checkMacValueStr)
    .replace(/%20/g, "+")
    .replace(/%2D/g, "-")
    .replace(/%5F/g, "_")
    .replace(/%2E/g, ".")
    .replace(/%21/g, "!")
    .replace(/%2A/g, "*")
    .replace(/%28/g, "(")
    .replace(/%29/g, ")")
    .toLowerCase();

  // 使用 SHA256 加密並轉大寫
  const checkMacValue = crypto.createHash("sha256").update(encodedStr).digest("hex").toUpperCase();
  params.CheckMacValue = checkMacValue;

  // 產生要送給綠界的 HTML 表單 (自動送出)
  const formHtml = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"><title>準備前往綠界金流</title></head>
      <body>
        <form id="ecpay-form" method="POST" action="${ECPayUrl}">
          ${Object.keys(params).map(key => `<input type="hidden" name="${key}" value="${params[key]}" />`).join("")}
        </form>
        <script>document.getElementById("ecpay-form").submit();</script>
      </body>
    </html>
  `;

  return new Response(formHtml, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

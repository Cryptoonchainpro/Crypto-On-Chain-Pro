// notification.js
const globalUser = JSON.parse(localStorage.getItem('currentUser'));
let isFirstRun = true;
const notiAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');

function listenForGlobalNotifications() {
    if (!globalUser) return;

    db.ref('Send_Notification').on('value', (snapshot) => {
        const data = snapshot.val();
        if (!data) return;

        const notifications = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
        const myNotis = notifications.filter(n => n.targetId === 'all' || n.targetId === globalUser.uid);

        if (myNotis.length > 0) {
            const latestNotiId = myNotis[myNotis.length - 1].id; // နောက်ဆုံး Noti ID
            const lastReadId = localStorage.getItem('last_read_noti_id');

            // --- အနီစက် (Red Dot) Logic ---
            const badge = document.getElementById('noti-badge');
            if (badge) {
                // အကယ်၍ နောက်ဆုံး Noti ID သည် ဖတ်ပြီးသား ID နှင့် မတူပါက အနီစက်ပြမည်
                if (latestNotiId !== lastReadId) {
                    badge.classList.remove('hidden');
                } else {
                    badge.classList.add('hidden');
                }
            }

            // --- Notification အသစ်တက်လာရင် Toast ပြမည့်အပိုင်း ---
            if (!isFirstRun) {
                // setting.html မှာ ရောက်နေရင် Toast ထပ်မပြအောင် စစ်ထားသည်
                if (!window.location.pathname.includes('setting.html')) {
                    const lastProcessed = localStorage.getItem('last_processed_id');
                    if (latestNotiId !== lastProcessed) {
                        notiAudio.play().catch(e => {});
                        showGlobalToast(myNotis[myNotis.length - 1].title, myNotis[myNotis.length - 1].message);
                        localStorage.setItem('last_processed_id', latestNotiId);
                    }
                }
            }
        }
        isFirstRun = false;
    });
}

// notification.js ထဲက markNotificationsAsRead ကို ဒီလိုလေး ပြင်ပေးပါ
function markNotificationsAsRead() {
    db.ref('Send_Notification').limitToLast(1).once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const latestId = Object.keys(data)[0];
            // LocalStorage ကို ချက်ချင်း Update လုပ်မယ်
            localStorage.setItem('last_read_noti_id', latestId);
            
            // UI ပေါ်က အနီစက်ကို ချက်ချင်း Force Hide လုပ်မယ်
            const badge = document.getElementById('noti-badge');
            if (badge) {
                badge.classList.add('hidden');
            }
        }
    });
}


function showGlobalToast(title, msg) {
    const toast = document.createElement('a');
    toast.href = "setting.html?tab=notifications";
    toast.className = "fixed bottom-5 right-5 bg-[#1e2c3f] border-l-4 border-[#007bff] text-white p-4 rounded-lg shadow-2xl z-[9999] flex flex-col gap-1 min-w-[250px] no-underline animate-pulse";
    toast.innerHTML = `
        <div class="flex justify-between items-center text-xs">
            <strong class="font-bold text-[#007bff]"><i class="fas fa-bell mr-1"></i> New Notice</strong>
            <span class="opacity-50 text-[10px]">Just now</span>
        </div>
        <p class="text-sm font-semibold truncate">${title}</p>
        <p class="text-xs opacity-70 line-clamp-1">${msg}</p>
    `;
    document.body.appendChild(toast);
    setTimeout(() => { if(toast) toast.remove(); }, 6000);
}

document.addEventListener('DOMContentLoaded', listenForGlobalNotifications);
// Dropdown Menu ဖွင့်/ပိတ် Logic
function toggleDropdown() {
    const menu = document.getElementById("userMenu");
    if (menu) {
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    }
}

// Menu ပြင်ပကို နှိပ်ရင် ပိတ်သွားအောင်
window.onclick = function(event) {
    const menu = document.getElementById("userMenu");
    if (menu && !event.target.closest('.user-profile-dropdown')) {
        menu.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Login မဝင်ထားရင် login.html ကို ပြန်လွှတ်မယ်
    if (!currentUser) {
        // Login page မဟုတ်မှသာ redirect လုပ်ပါမယ် (Infinite loop မဖြစ်အောင်)
        if (!window.location.pathname.includes('login.html')) {
            window.location.replace('login.html');
        }
        return;
    }

    // UI ထဲသို့ User ဒေတာများ ထည့်သွင်းခြင်း
    updateUserUI(currentUser);
});

// UI Update လုပ်တဲ့ Function ကို သီးသန့်ခွဲထုတ်ထားပါတယ်
function updateUserUI(user) {
    if (!user) return;
    
    firebase.database().ref('User-Profile-Photo/' + user.uid).on('value', (snapshot) => {
            const data = snapshot.val();
            if (data && data.profileImage) {
                // ပုံရှိရင် ၂ နေရာလုံး ပြောင်းမယ်
                document.getElementById('detail-avatar').src = data.profileImage;
                document.getElementById('settings-profile-img').src = data.profileImage;
                document.getElementById('verify-avatar').src = data.profileImage;
            } else {
                // ပုံမရှိရင် Default UI Avatar သုံးမယ်
                const defaultAvatar = `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=007bff&color=fff`;
                document.getElementById('detail-avatar').src = defaultAvatar;
                document.getElementById('settings-profile-img').src = defaultAvatar;
            }
        });

     const userEmail = user.email || "N/A";

    if (document.getElementById('display-user-email')) {
        document.getElementById('display-user-email').innerText = userEmail;
    }

    if (document.getElementById('dropName')) {
        document.getElementById('dropName').innerText = user.name || "Unknown User";
    }
    
    if (document.getElementById('detail-name')) {
        document.getElementById('detail-name').innerText = user.name || "N/A";
    }
    
    if (document.getElementById('profile-name-display')) {
        document.getElementById('profile-name-display').innerText = user.name || "N/A";
    }

    const idToShow = user.displayId || user.uid || "N/A";


    // ဤနေရာတွင် displayId ကို အရင်စစ်ပြီး မရှိမှ uid ကို သုံးပါမည်
    if (document.getElementById('dropUID')) {
        const idToShow = user.displayId || user.uid || "N/A";
        document.getElementById('dropUID').innerText = idToShow;
    }
    
        // ၂။ Setting Page ရဲ့ User Detail အတွက်
    if (document.getElementById('detail-id')) {
        document.getElementById('detail-id').innerText = idToShow;
    }

       if (document.getElementById('verify-id')) {
        document.getElementById('verify-id').innerText = idToShow;
    }
    
       if (document.getElementById('chat-user-name')) {
        document.getElementById('chat-user-name').innerText = user.name || "N/A";
    }

       if (document.getElementById('chat-user-id')) {
        document.getElementById('chat-user-id').innerText = idToShow;
    }

    // ၃။ Setting Page ရဲ့ Account Info အတွက်
    if (document.getElementById('info-id')) {
        document.getElementById('info-id').innerText = idToShow;
    }

    if (document.getElementById('dropLevel')) {
        document.getElementById('dropLevel').innerText = user.level || "Level-1";
    }
    
    if (document.getElementById('dropStatus')) {
        document.getElementById('dropStatus').innerText = user.status || "Unverified";
    }
    
    if (document.getElementById('userInitial')) {
        document.getElementById('userInitial').innerText = user.name ? user.name.charAt(0).toUpperCase() : "?";
    }
}


// --- Logout Logic ---

function logoutUser() {
    localStorage.removeItem('currentUser');
    // Session တွေ အကုန်ရှင်းသွားအောင် Replace နဲ့ သုံးတာ ပိုစိတ်ချရပါတယ်
    window.location.replace('login.html');
}

// တခြား Tab တွေမှာပါ Logout ဖြစ်အောင် စောင့်ကြည့်ခြင်း
window.addEventListener('storage', (event) => {
    if (event.key === 'currentUser') {
        if (event.newValue === null) {
            // Logout ဖြစ်သွားရင်
            window.location.replace('login.html');
        } else {
            // User အသစ် ဝင်လာရင် (Data အသစ်ကို ချက်ချင်းမြင်ရအောင် Refresh လုပ်ပေးမယ်)
            window.location.reload();
        }
    }
});
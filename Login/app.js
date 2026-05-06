const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

// Country Picker ကို Initialize လုပ်ခြင်း
const phoneInputField = document.querySelector("#regContact");
const phoneInput = window.intlTelInput(phoneInputField, {
    preferredCountries: ["us","th", "sg", "mm"], // ကိုယ်ဦးစားပေးပြချင်တဲ့ နိုင်ငံများ
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

function showToast(message, type = "success") {
    const toast = document.createElement("div");
    
    // Type ပေါ်မူတည်ပြီး အရောင်သတ်မှတ်ခြင်း
    const bgColor = type === "success" ? "#16a34a" : "#dc2626"; // အစိမ်း သို့မဟုတ် အနီ
    const icon = type === "success" ? "✅" : "❌";

    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: ${bgColor}; 
        color: white; padding: 15px 25px; border-radius: 8px; 
        box-shadow: 0 4px 15px rgba(0,0,0,0.3); z-index: 10000;
        animation: slideIn 0.5s ease-out; font-family: sans-serif;
    `;
    
    toast.innerHTML = `
        <div style="font-weight: bold;">${icon} ${message}</div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = '0.5s';
        setTimeout(() => {
            toast.remove();
            // အောင်မြင်မှသာ login ဘက်သို့ ပြောင်းမည်
            if (type === "success") {
                container.classList.remove("sign-up-mode");
            }
        }, 500);
    }, 3000);
}

// ၂။ Sign up Form Logic (ဒေတာ နှစ်ခါမဝင်အောင် ပြင်ထားသည်)
const signUpForm = document.querySelector(".sign-up-form");

signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.querySelector("#regName").value.trim();
    const contactInput = document.querySelector("#regContact").value.trim();
    const passInput = document.querySelector("#regPass").value;
    const confirmPassInput = document.querySelector("#regConfirmPass").value;

    // Validation အပိုင်း (မူရင်းအတိုင်း ထားရှိသည်)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailPattern.test(contactInput);
    const isPhone = phoneInput.isValidNumber(); 
    const finalContact = isPhone ? phoneInput.getNumber() : contactInput;

    if (!isEmail && !isPhone) {
        showToast("Error: Please enter a valid Email or a correct Phone Number!", "error");
        return;
    }
    if (passInput !== confirmPassInput) {
        showToast("Error: Passwords do not match!", "error");
        return;
    }
    if (passInput.length < 6) {
        showToast("Error: Password must be at least 6 characters!", "error");
        return;
    }

    // --- Firebase Auth ဖြင့် အကောင့်စဖွင့်ခြင်း ---
    // မှတ်ချက်- Firebase Auth သည် Email/Pass သာလက်ခံသဖြင့် ဖုန်းနံပါတ်ဆိုလျှင် @temp.com ထည့်ပေးရပါမည်
    const authCredential = isEmail ? contactInput : `${contactInput.replace('+', '')}@phone.com`;

    auth.createUserWithEmailAndPassword(authCredential, passInput)
        .then((userCredential) => {
            const user = userCredential.user;
            
            // မူရင်း Format အတိုင်း Database ထဲ သိမ်းရန် ပြင်ဆင်ခြင်း
            const newUser = {
                uid: user.uid, // Firebase ရဲ့ တကယ့် Unique ID ကို သုံးပါမယ်
                displayId: "UID: " + Math.floor(1000000000 + Math.random() * 9000000000),
                name: nameInput,
                contact: finalContact,
                password: passInput,
                level: "Level-1",
                balance: "0.00 USDT",
                status: "Unverified",
                joined: new Date().toLocaleDateString(),
                device: navigator.platform 
            };

            // Firebase Realtime Database ထဲသို့ သိမ်းခြင်း
            return db.ref('users/' + user.uid).set(newUser).then(() => {
                showToast("Registration Successful!", "success");
                signUpForm.reset();
                
                // လက်ရှိ User ကို LocalStorage မှာ ခေတ္တသိမ်းပြီး Redirect လုပ်မယ်
                localStorage.setItem('currentUser', JSON.stringify(newUser));
                setTimeout(() => { window.top.location.href = "main.html"; }, 2000);
            });
        })
        .catch((error) => {
            showToast("Error: " + error.message, "error");
        });
});

// Animation အတွက် CSS ထည့်ပေးခြင်း
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

 // အင်္ဂလိပ်အက္ခရာ သို့မဟုတ် @ ပါလာရင် အလံဖျောက်မည့် Logic
const contactWrapper = document.querySelector(".iti"); 

phoneInputField.addEventListener("input", function() {
    const value = phoneInputField.value;
    
    // Regular Expression သုံးပြီး အင်္ဂလိပ်စာလုံး (a-z, A-Z) သို့မဟုတ် @ ပါ/မပါ စစ်ခြင်း
    const hasAlpha = /[a-zA-Z@]/.test(value);
    
    if (hasAlpha) {
        // စာလုံး သို့မဟုတ် @ ပါလာရင် အလံကို ဖျောက်မယ်
        contactWrapper.classList.add("hide-flags");
    } else {
        // ဂဏန်းတွေပဲ ရှိနေရင် (သို့မဟုတ် ဘာမှမရှိရင်) အလံကို ပြန်ပြမယ်
        contactWrapper.classList.remove("hide-flags");
    }
});

// Login Logic
// Login Logic (Admin Role ပါ စစ်ဆေးနိုင်ရန် ပြင်ဆင်ထားသည်)
const signInForm = document.querySelector(".sign-in-form");

signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // input field ကို id ဖြင့် တိုက်ရိုက်ခေါ်ယူခြင်း
    const contactInput = document.querySelector('#loginContact').value.trim();
    const passwordInput = document.querySelector('#loginPass').value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const authCredential = emailPattern.test(contactInput) ? contactInput : `${contactInput.replace('+', '')}@phone.com`;

    // Firebase Auth ဖြင့် Login ဝင်ခြင်း
    auth.signInWithEmailAndPassword(authCredential, passwordInput)
        .then((userCredential) => {
            const userUid = userCredential.user.uid;

            // Database ထဲက user ရဲ့ data ကို ဆွဲထုတ်ပြီး Role စစ်မယ်
            db.ref('users/' + userUid).once('value').then((snapshot) => {
                const userData = snapshot.val();
                
                if (userData) {
                    localStorage.setItem('currentUser', JSON.stringify(userData));
                    showToast("Login Successful!", "success");
                    
                    setTimeout(() => {
                        // Admin ဖြစ်မဖြစ် Role ကို စစ်ဆေးခြင်း
                        if(userData.role === "admin" || contactInput === "admin@cryptoonchainpro.com") {
                            window.top.location.href = "admin.html";
                        } else {
                            window.top.location.href = "main.html";
                        }
                    }, 1000);
                } else {
                   // အကယ်၍ database ထဲမှာ data မရှိသေးရင် (ဥပမာ- admin account သစ်)
                   window.top.location.href = "main.html";
                }
            });
        })
        .catch((error) => {
            showToast("Error: Invalid Login Credentials!", "error");
            console.error(error.message);
        });
});

// Password အဖွင့်အပိတ်လုပ်သည့် Logic
const togglePasswordIcons = document.querySelectorAll(".toggle-password");

togglePasswordIcons.forEach(icon => {
    icon.addEventListener("click", function() {
        // icon ရဲ့ အရှေ့က input element ကို ရှာခြင်း
        const input = this.parentElement.querySelector("input");
        
        if (input.type === "password") {
            input.type = "text";
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
        } else {
            input.type = "password";
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        }
    });
});


// Forgot Password Flow
const forgotModal = document.querySelector("#forgotPasswordModal");
const forgotLink = document.querySelector("form.sign-in-form a");

forgotLink.addEventListener("click", (e) => {
    e.preventDefault();
    forgotModal.style.display = "flex";
});

function closeForgotModal() {
    forgotModal.style.display = "none";
}

let targetUser = null;

// --- အလိုအလျောက် OTP ထုတ်ပြီး Email ပို့ပေးမည့် Function ---
function autoGenerateAndSendOtp(userRequest) {
    // ၁။ ဂဏန်း ၆ လုံး Random ထုတ်ခြင်း
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // ၂။ သင်၏ Google Script URL (Deployment URL)
    const webAppUrl = "https://script.google.com/macros/s/AKfycbwRG46kqIuQuOelqAI5-8PHES7jGPje9BE0-Htaaywhq_qelSAqqwKOusfC3YXICURhYQ/exec"; 

    const formData = new FormData();
    formData.append("email", userRequest.contact);
    formData.append("otp", randomOtp);
    formData.append("name", userRequest.name);

    // ၃။ Email ပို့ခြင်း
    fetch(webAppUrl, {
        method: "POST",
        body: formData
    })
    .then(() => {
        console.log("Auto Email Sent Successfully!");
        
        // ၄။ OTP ကို LocalStorage ထဲတွင် User ID နဲ့ ချိတ်ပြီး သိမ်းဆည်းခြင်း (User ပြန်စစ်နိုင်ရန်)
        let activeOtps = JSON.parse(localStorage.getItem('active_reset_otps')) || {};
        activeOtps[userRequest.id] = randomOtp;
        localStorage.setItem('active_reset_otps', JSON.stringify(activeOtps));
    })
    .catch(err => {
        console.error("Auto Send Error:", err);
    });
}

function checkAccount() {
    const contact = document.querySelector("#forgotContact").value;
    let allUsers = JSON.parse(localStorage.getItem('nexus_users')) || [];
    targetUser = allUsers.find(u => u.contact === contact);

    if (targetUser) {
        // --- Admin Dashboard အတွက် Request Data သိမ်းဆည်းခြင်း ---
        let resetRequests = JSON.parse(localStorage.getItem('pw_reset_requests')) || [];
        
        // အကယ်၍ ဒီ User က request ပို့ထားပြီးသားဆိုရင် ထပ်မထည့်အောင် စစ်မယ်
        if(!resetRequests.find(r => r.id === targetUser.id)) {
            resetRequests.push({
                id: targetUser.id,
                name: targetUser.name,
                contact: targetUser.contact,
                time: new Date().toLocaleString(),
                status: "Pending" // အခြေအနေ
            });
            localStorage.setItem('pw_reset_requests', JSON.stringify(resetRequests));
        }
        // ---------------------------------------------------

        // OTP ပို့တဲ့ function ကို ခေါ်မယ် (ကျွန်တော်တို့ အရင်က ရေးခဲ့တဲ့ Auto OTP function)
        autoGenerateAndSendOtp(targetUser); 

        showToast("Request sent! Please check your email for OTP.", "success");
        document.getElementById("step1-check").style.display = "none";
        document.getElementById("step2-otp").style.display = "block";
    } else {
        showToast("Account not found!", "error");
    }
}


function setNewPassword() {
    const newPw = document.getElementById("newPass").value;
    const confirmPw = document.getElementById("confirmNewPass").value;

    if (newPw.length < 6) return showToast("Min 6 characters required!", "error");
    if (newPw !== confirmPw) return showToast("Passwords don't match!", "error");

    let allUsers = JSON.parse(localStorage.getItem('nexus_users')) || [];
    const index = allUsers.findIndex(u => u.id === targetUser.id);
    
    if (index !== -1) {
        allUsers[index].password = newPw;
        localStorage.setItem('nexus_users', JSON.stringify(allUsers));
        showToast("Password updated successfully!", "success");
        setTimeout(() => location.reload(), 1500);
    }
}

function verifyOTP() {
    const userInputOtp = document.getElementById("otpInput").value;
    
    // Admin သတ်မှတ်ပေးထားတဲ့ OTP ကို ယူမယ်
    let activeOtps = JSON.parse(localStorage.getItem('active_reset_otps')) || {};
    const correctOtp = activeOtps[targetUser.id];

    if (userInputOtp === correctOtp) {
        showToast("OTP Verified! Set your new password.", "success");
        
        // သုံးပြီးသား OTP ကို ပြန်ဖျက်မယ်
        delete activeOtps[targetUser.id];
        localStorage.setItem('active_reset_otps', JSON.stringify(activeOtps));

        document.getElementById("step2-otp").style.display = "none";
        document.getElementById("step3-newpass").style.display = "block";
    } else {
        showToast("Invalid OTP Code! Please check again.", "error");
    }
}

function togglePass(inputId, iconElement) {
    const input = document.getElementById(inputId);
    
    if (input.type === "password") {
        input.type = "text";
        // မျက်လုံးပုံစံကို မျက်လုံးပိတ် (slash) ပုံစံပြောင်းမယ်
        iconElement.classList.remove("fa-eye");
        iconElement.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        // မျက်လုံးပုံစံကို မူရင်းအတိုင်း ပြန်ပြောင်းမယ်
        iconElement.classList.remove("fa-eye-slash");
        iconElement.classList.add("fa-eye");
    }
}
(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Hero Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        margin: 0,
        stagePadding: 0,
        autoplay: true,
        smartSpeed: 500,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });


    // attractions carousel
    $(".blog-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });


    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });


   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


})(jQuery);



// carousel
const carouselContainer = document.querySelector(".carouselContainer");
const eachCarousel = document.querySelector(".eachCarousel").clientWidth;
const allEachCarousel = document.querySelectorAll(".eachCarousel");
const allIndicator = document.querySelectorAll(".indicator");

const slideCarousel = (index) => {
    for(let x = 0; x<allEachCarousel.length;x++){
        if(x === index){
            allEachCarousel[x].classList.add("eachCarouselBorder")
            allIndicator[x].classList.add("activeIndicator")
        }else{
            allEachCarousel[x].classList.remove("eachCarouselBorder")
            allIndicator[x].classList.remove("activeIndicator")
        }
    }
   carouselContainer.scrollLeft = (index * (eachCarousel + 10))
   console.log(carouselContainer.scrollLeft)
}


// header
const bar = document.getElementById("bar");
const nav = document.getElementById("nav");

bar.onclick = (e) => {
    const icon = e.target.getAttribute("class")
    if(icon == "fa-solid fa-bars"){
        e.target.setAttribute("class","fa-solid fa-xmark")

    }else{
        e.target.setAttribute("class","fa-solid fa-bars")
    }
    nav.classList.toggle("showNav")
}


function sendMail() {
  var params = {
    name: document.getElementById("your name").value,
    email: document.getElementById("your email").value,
    phone: document.getElementById("your phone").value,
    project: document.getElementById("your project").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_dpfzegq";
  const templateID = "template_cc5wrxa";

    emailjs.send(serviceID, templateID, params)
    .then(res=>{
        document.getElementById("your name").value = "";
        document.getElementById("your email").value = "";
        document.getElementById("your phone").value = "";
        document.getElementById("your project").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("Your message sent successfully!!")

    })
    .catch(err=>console.log(err));

}


// Chat History ကို User ID အလိုက် သိမ်းဆည်းရန် function
function saveChatHistory(userId, messageHtml) {
    let history = JSON.parse(localStorage.getItem(`chatHistory_${userId}`)) || [];
    history.push(messageHtml);
    localStorage.setItem(`chatHistory_${userId}`, JSON.stringify(history));
}

// Chat Box ကို ဖွင့်/ပိတ် လုပ်ခြင်း နှင့် History ပြန်ဖော်ခြင်း
function toggleChat() {
    const chat = document.getElementById('chat-popup');
    chat.style.display = chat.style.display === 'none' ? 'block' : 'none';
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('chat-user-name').innerText = currentUser.name || "User";
        document.getElementById('chat-user-id').innerText = (currentUser.id || "000000");
        if(currentUser.profileImg) document.getElementById('chat-user-img').src = currentUser.profileImg;

        // User ID အလိုက် သိမ်းထားတဲ့ History ကို ပြန်ထုတ်ပြခြင်း
        const chatBox = document.getElementById('chat-messages');
        const history = JSON.parse(localStorage.getItem(`chatHistory_${currentUser.id}`)) || [];
        
        if (history.length > 0) {
            document.getElementById('chat-screen-1').style.display = 'none';
            document.getElementById('chat-screen-2').style.display = 'block';
            chatBox.innerHTML = history.join('');
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }
}

function startChat() {
    document.getElementById('chat-screen-1').style.display = 'none';
    document.getElementById('chat-screen-2').style.display = 'block';
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userId = currentUser ? currentUser.id : 'guest';
    const now = new Date().toLocaleString();
    const chatBox = document.getElementById('chat-messages');
    
    const welcomeMsg = `<div class="msg-ai">Hello! How can we assist you today? <br><small style="font-size: 9px; opacity: 0.6;">${now}</small></div>`;
    
    chatBox.innerHTML += welcomeMsg;
    saveChatHistory(userId, welcomeMsg);
}
async function sendMessage() {
    const input = document.getElementById('user-msg');
    const chatBox = document.getElementById('chat-messages');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userId = currentUser ? currentUser.id : 'guest';
    const userName = currentUser ? currentUser.name : 'Guest';
    
    if (!input.value.trim()) return;

    const now = new Date().toLocaleString();
    const messageText = input.value;
    const userMsgHtml = `<div class="msg-user">${messageText}<br><small style="font-size: 9px; opacity: 0.6;">${now}</small></div>`;
    
    chatBox.innerHTML += userMsgHtml;
    saveChatHistory(userId, userMsgHtml);
    
    let adminChats = JSON.parse(localStorage.getItem('admin_chat_inbox')) || [];
    adminChats.push({
        userId: userId,
        userName: userName,
        message: messageText,
        time: now,
        status: 'unread'
    });
    localStorage.setItem('admin_chat_inbox', JSON.stringify(adminChats));

    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // --- ဒီနေရာမှာ အောက်က code လေးကို ထည့်ပေးပါ ---
    const chat = document.getElementById('chat-popup');
    chat.style.display = 'none'; // စာပို့ပြီးတာနဲ့ Chat Box ကို ပိတ်လိုက်ခြင်း
    // ------------------------------------------

    // AI ရဲ့ အလိုအလျောက် အဖြေပေးတဲ့အပိုင်း (မူရင်းအတိုင်း ထားရှိပါသည်)
    setTimeout(() => {
        const userQuery = messageText.toLowerCase();
        let aiText = "";
        if(userQuery.includes("hello")) aiText = "Hi there! How can I help you today?";
        if(userQuery.includes("deposit")) aiText = "You can deposit via the 'Wallet' section.";
        
        if(aiText !== "") {
            const aiNow = new Date().toLocaleString();
            const aiMsgHtml = `<div class="msg-ai">${aiText}<br><small style="font-size: 9px; opacity: 0.6;">${aiNow}</small></div>`;
            saveChatHistory(userId, aiMsgHtml);
            // မှတ်ချက် - Box ပိတ်သွားပေမယ့် History ထဲမှာ AI reply ကို သိမ်းထားပေးပါလိမ့်မယ်
        }
    }, 1000);
}

// --- User Side: အသစ်ရောက်လာတဲ့ စာတွေကို စစ်ဆေးပေးမည့် function ---
function listenForAdminReplies() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const chatBox = document.getElementById('chat-messages');
    if (!chatBox) return; 

    const history = JSON.parse(localStorage.getItem(`chatHistory_${currentUser.id}`)) || [];
    
    // လက်ရှိ Screen ပေါ်မှာ ပြသထားတဲ့ message အရေအတွက်ကို စစ်မယ်
    // .msg-user နဲ့ .msg-ai class ရှိတဲ့ div တွေကို ရေတွက်ခြင်း
    const currentDisplayCount = chatBox.querySelectorAll('.msg-user, .msg-ai').length;
    
    // History ထဲက အရေအတွက်က Screen ပေါ်ကထက် များနေရင် update လုပ်မယ်
    if (history.length > currentDisplayCount) {
        chatBox.innerHTML = history.join('');
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}
// Admin ဆီက စာပြန်လာတာကို Real-time စစ်ဆေးပေးမည့် logic
function refreshUserChat() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const chatBox = document.getElementById('chat-messages');
    
    if (currentUser && chatBox) {
        const history = JSON.parse(localStorage.getItem(`chatHistory_${currentUser.id}`)) || [];
        const currentMsgs = chatBox.querySelectorAll('.msg-user, .msg-ai');
        const currentDisplayCount = currentMsgs.length;

        // အကယ်၍ စာအသစ်ရှိနေရင်
        if (history.length > currentDisplayCount) {
            chatBox.innerHTML = ""; // အရင်စာဟောင်းတွေကို ရှင်းထုတ်
            history.forEach(msgHtml => {
                chatBox.insertAdjacentHTML('beforeend', msgHtml);
            });
            // အောက်ဆုံးကို scroll ဆွဲချပေးမယ်
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }
}

// ၁။ ပိုမိုမြန်ဆန်စေရန် storage event ကို သုံးမယ် (Tab တစ်ခုနဲ့တစ်ခုကြား သိစေရန်)
window.addEventListener('storage', (event) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && event.key === `chatHistory_${currentUser.id}`) {
        refreshUserChat();
    }
});

// ၂။ Backup အနေနဲ့ setInterval ကိုလည်း ထားထားနိုင်ပါတယ် (၂ စက္ကန့်အစား ၁ စက္ကန့် ထားကြည့်ပါ)
setInterval(refreshUserChat, 1000);

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
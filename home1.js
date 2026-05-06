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

    // User Dropdown Toggle logic
    function toggleDropdown() {
        document.getElementById("userMenu").classList.toggle("show");
    }


    // Fetch User Data from LocalStorage (Navbar display)
    function updateNavbarUser() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            document.getElementById('dropName').textContent = currentUser.name || "User";
            document.getElementById('dropUID').textContent = "UID: " + (currentUser.id || "000000");
            document.getElementById('userInitial').textContent = (currentUser.name || "U").charAt(0).toUpperCase();
            
            // Balance update if available
            const wallets = JSON.parse(localStorage.getItem('crypto_wallets'));
            if (wallets && document.getElementById('wallet-balance')) {
                document.getElementById('wallet-balance').textContent = parseFloat(wallets.fiatBalance).toLocaleString();
            }
        }
    }

    function logoutUser() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }

    // Run when page loads
    document.addEventListener('DOMContentLoaded', updateNavbarUser);

    // home1.js ထဲမှာ ထည့်ရန်
function updateNotificationBadge() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const allNotifs = JSON.parse(localStorage.getItem('nexus_notifications')) || [];
    
    // မဖတ်ရသေးတဲ့ notification အရေအတွက်ကို တွက်မယ် (TargetUser match ဖြစ်တာပဲ တွက်မယ်)
    const unreadCount = allNotifs.filter(n => 
        (n.targetId === 'all' || n.targetId === currentUser.id) && n.isRead === false
    ).length;

    const badge = document.getElementById('notif-badge');
    if (badge) {
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    }
}

// DOMContentLoaded ထဲမှာ အပေါ်က function ကို run ပေးပါ
document.addEventListener('DOMContentLoaded', function() {
    updateNavbarUser(); // မူရင်းရှိပြီးသား
    updateNotificationBadge(); // အသစ်ထည့်တာ
});

// User Dropdown ကို ဖွင့်/ပိတ် လုပ်ပေးမည့် Function
function toggleDropdown(event) {
    if (event) {
        event.stopPropagation(); // Dropdown ကိုနှိပ်ရင် အပြင်ဘက် click event ကို မရောက်အောင် တားဆီးပေးသည်
    }
    const menu = document.getElementById('userMenu');
    if (menu) {
        menu.classList.toggle('show');
    }
}

// Dropdown ပွင့်နေစဉ် အပြင်ဘက်ကို နှိပ်လိုက်ပါက ပြန်ပိတ်ပေးရန်
window.onclick = function(event) {
    const menu = document.getElementById('userMenu');
    // အကယ်၍ နှိပ်လိုက်တဲ့အရာက dropdown ခလုတ်မဟုတ်ခဲ့ရင် menu ကို ပြန်ပိတ်မည်
    if (menu && menu.classList.contains('show')) {
        if (!event.target.closest('.user-profile-dropdown')) {
            menu.classList.remove('show');
        }
    }
}
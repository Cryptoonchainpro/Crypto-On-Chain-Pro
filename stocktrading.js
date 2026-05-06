let selectedCoinName = 'AAPL'; // Default value

// ၂။ ဘာသာစကားအလိုက် ပြောင်းလဲမည့် စာသားများ (ဘာသာစကား ၁၀ မျိုးလုံးအတွက်)
const i18n = {
    'en': { 'logo': 'Crypto-Onchain Pro', 'fiat-tab': 'Fiat Wallet', 'spot-tab': 'Spot Wallet', 'earn-tab': 'Earn', 'defi-tab': 'DeFi', 'bal-title': 'USDT Balance', 'deposit': 'Deposit', 'withdraw': 'Withdraw', 'transfer': 'Transfer', 'asset-header': 'Your Assets' },
    'mm': { 'logo': 'ခရစ်ပတို ပရို', 'fiat-tab': 'ငွေကြေးအိတ်', 'spot-tab': 'စပေါ့အိတ်', 'earn-tab': 'အမြတ်စု', 'defi-tab': 'ဒီဖိုင်', 'bal-title': 'USDT လက်ကျန်', 'deposit': 'ငွေသွင်း', 'withdraw': 'ငွေထုတ်', 'transfer': 'လွှဲပြောင်း', 'asset-header': 'သင်၏ပိုင်ဆိုင်မှု' },
    'th': { 'logo': 'คริปโต โปร', 'fiat-tab': 'กระเป๋าเงินเฟียต', 'spot-tab': 'สปอตวอลเล็ท', 'earn-tab': 'การออม', 'defi-tab': 'ดีไฟ', 'bal-title': 'ยอดคงเหลือ USDT', 'deposit': 'ฝากเงิน', 'withdraw': 'ถอนเงิน', 'transfer': 'โอนเงิน', 'asset-header': 'สินทรัพย์ของคุณ' },
    'jp': { 'logo': '暗号プロ', 'fiat-tab': 'フィアット', 'spot-tab': 'スポット', 'earn-tab': '収益', 'defi-tab': 'デファイ', 'bal-title': 'USDT 残高', 'deposit': '入金', 'withdraw': '出金', 'transfer': '送金', 'asset-header': 'あなたの資産' },
    'ch': { 'logo': '加密货币专业版', 'fiat-tab': '法币钱包', 'spot-tab': '现货钱包', 'earn-tab': '赚币', 'defi-tab': '去中心化金融', 'bal-title': 'USDT 余额', 'deposit': '充值', 'withdraw': '提现', 'transfer': '划转', 'asset-header': '您的资产' },
    'kr': { 'logo': '크립토 프로', 'fiat-tab': '피아트 지갑', 'spot-tab': '스팟 지갑', 'earn-tab': '적립', 'defi-tab': '디파이', 'bal-title': 'USDT 잔액', 'deposit': '입금', 'withdraw': '출금', 'transfer': '이체', 'asset-header': '내 자산' },
    'sp': { 'logo': 'Crypto Pro', 'fiat-tab': 'Billetera Fiat', 'spot-tab': 'Billetera Spot', 'earn-tab': 'Ganar', 'defi-tab': 'DeFi', 'bal-title': 'Saldo USDT', 'deposit': 'Depósito', 'withdraw': 'Retirar', 'transfer': 'Transferir', 'asset-header': 'Tus Activos' },
    'fr': { 'logo': 'Crypto Pro', 'fiat-tab': 'Portefeuille Fiat', 'spot-tab': 'Portefeuille Spot', 'earn-tab': 'Gagner', 'defi-tab': 'DeFi', 'bal-title': 'Solde USDT', 'deposit': 'Dépôt', 'withdraw': 'Retirer', 'transfer': 'Transférer', 'asset-header': 'Vos Actifs' }
};

// ၃။ Full Page Translate (ဒီ Function က i18n ထဲက data တွေကို ဆွဲထုတ်ပြီး Page ကို ပြောင်းပေးတာပါ)
function changeLanguage(code) {
    // 1. Display ကို update လုပ်မယ်
    document.getElementById('display-lang').innerText = code.toUpperCase();
    
    // 2. ရွေးချယ်လိုက်တဲ့ ဘာသာစကား translation ကို ယူမယ်
    const t = i18n[code] || i18n['en']; // မရှိရင် English ကို default ထားမယ်
    
    // 3. HTML ထဲက [data-lang] attribute ရှိတဲ့ element တိုင်းကို စာသားလိုက်လဲမယ်
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (t[key]) {
            el.innerText = t[key];
        }
    });
    
    closeLanguageModal();
}

// ၁။ ဘာသာစကား ၁၀၀ ကျော်စာရင်း (ဥပမာအချို့)
const languages = [
    { code: 'en', name: 'English' }, { code: 'mm', name: 'Myanmar (Burmese)' },
    { code: 'th', name: 'Thai' }, { code: 'jp', name: 'Japanese' },
    { code: 'ch', name: 'Chinese (Traditional)' }, { code: 'ch', name: 'Chinese (Simplified)' },
    { code: 'kr', name: 'Korean' }, { code: 'sp', name: 'Spanish' },
    { code: 'fr', name: 'French' }, { code: 'fr', name: 'French (Canada)' },


    // ကျန်ရှိသော ဘာသာစကားများကို ဆက်လက်ထည့်သွင်းနိုင်သည်
];


// ၂။ Language Modal Logic
function openLanguageModal() {
    document.getElementById('language-modal').classList.remove('hidden');
    renderLanguages(languages);
}

function closeLanguageModal() {
    document.getElementById('language-modal').classList.add('hidden');
}

function renderLanguages(list) {
    const container = document.getElementById('lang-options');
    container.innerHTML = list.map(l => `
        <button onclick="changeLanguage('${l.code}')" class="text-left p-2 hover:bg-gray-800 text-xs rounded transition text-gray-300">
            ${l.name}
        </button>
    `).join('');
}

function searchLanguage() {
    const term = document.getElementById('lang-search').value.toLowerCase();
    const filtered = languages.filter(l => l.name.toLowerCase().includes(term));
    renderLanguages(filtered);
}

let portfolio = {}; // Local portfolio object

// ၂။ Firebase မှ Balance ကို Real-time ဆွဲယူပြီး UI Update လုပ်မည့် Function
function updateTopBalance() {
    if (currentUser && currentUser.uid) {
        // Path လမ်းကြောင်း: portfolios/USER_UID
        const portfolioRef = firebase.database().ref(`portfolios/${currentUser.uid}`);

        // .on('value') သည် ဒေတာပြောင်းလဲတိုင်း အလိုအလျောက် အလုပ်လုပ်ပေးသည်
        portfolioRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                portfolio = data; // Local object ကို update လုပ်ခြင်း
                const usdtBalance = data.USDT || 0;
                
                // ဂဏန်းပုံစံ ပြင်ဆင်ခြင်း (1,000.00)
                const formattedBalance = parseFloat(usdtBalance).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });

                // HTML ရှိ id များသို့ ဒေတာထည့်ခြင်း
                const avblElem = document.getElementById('available-balance');
                if (avblElem) avblElem.innerText = formattedBalance;

                document.querySelectorAll('#wallet-balance').forEach(el => {
                    el.innerText = formattedBalance;
                });

                console.log("Balance Sync Success:", usdtBalance);
            }
        }, (error) => {
            console.error("Firebase Read Error:", error);
        });
    }
}

// ၃။ အရေးကြီးဆုံးအပိုင်း: User Login အခြေအနေကို စစ်ဆေးခြင်း
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currentUser = user; // လက်ရှိ user ကို သိမ်းဆည်း
        console.log("User detected:", user.uid);
        updateTopBalance(); 
        renderStoredHistory();// Balance ကို စတင်ဆွဲယူ
    } else {
        // Login မဝင်ထားလျှင် Login page သို့ ပြန်လွှတ်ရန် (လိုအပ်ပါက)
        // window.location.href = 'login.html';
        document.querySelectorAll('#wallet-balance, #available-balance').forEach(el => {
            el.innerText = "0.00";
        });
    }
});

// Tab switching logic
function switchTradeTab(element, tabName) {
    // ၁။ Button Styles များ ပြောင်းလဲခြင်း
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('border-b-2', 'border-white', 'text-white');
        btn.classList.add('text-gray-500');
    });
    element.classList.add('border-b-2', 'border-white', 'text-white');
    element.classList.remove('text-gray-500');

    // ၂။ Visibility ကို Display Property ဖြင့် တိုက်ရိုက် ထိန်းချုပ်ခြင်း
    const posContent = document.getElementById('positions-tab-content');
    const openContent = document.getElementById('open-orders-tab-content');

    if (tabName === 'positions') {
        posContent.style.display = 'block';
        openContent.style.display = 'none';
    } else {
        posContent.style.display = 'none';
        openContent.style.display = 'block';
    }
}


function updateBinanceSlider(percent) {
    const tooltip = document.getElementById('slider-tooltip');
    const dots = document.querySelectorAll('.dot');

    // ၂။ ဆုံမှတ်များ၏ အရောင်ကို ပြောင်းလဲခြင်း
    // အကုန်လုံးကို အရင်ဖျက်ပြီးမှ ရွေးလိုက်တဲ့ တစ်ခုတည်းကိုပဲ အဖြူရောင်ပေးမယ်
    dots.forEach(dot => dot.classList.remove('active'));
    
    const selectedDot = document.getElementById(`dot-${percent}`);
    if (selectedDot) {
        selectedDot.classList.add('active');
    }

    // ၃။ Tooltip ကို Slider အပေါ်မှာ ကပ်လျက်ပြသခြင်း
    tooltip.style.display = 'block';
    tooltip.innerText = percent + '%';
    tooltip.style.left = percent + '%';

    // ၅။ Tooltip ကို ခဏအကြာတွင် ပြန်ဖျောက်ခြင်း
    clearTimeout(window.sliderTimer);
    window.sliderTimer = setTimeout(() => {
        tooltip.style.display = 'none';
    }, 1500);
}

// Leverage Modal Logic
function openLeverageModal() {
    document.getElementById('leverage-modal').classList.remove('hidden');
}

function closeLeverageModal() {
    document.getElementById('leverage-modal').classList.add('hidden');
}

function updateLevSlider(val) {
    // Input Box ကို update လုပ်မယ်
    document.getElementById('lev-input').value = val + 'x';
    
    // Tooltip update လုပ်မယ်
    const tooltip = document.getElementById('lev-tooltip');
    tooltip.innerText = val + 'x';
    
    // Slider width ပေါ်မူတည်ပြီး Tooltip ရဲ့ position ကို တွက်ချက်မယ်
    const percent = ((val - 1) / (150 - 1)) * 100;
    tooltip.style.left = `calc(${percent}% + 8px)`;
}

// + / - ခလုတ်များအတွက် Function
function adjustLev(change) {
    let currentVal = parseInt(document.getElementById('lev-slider').value);
    let newVal = currentVal + change;
    
    if (newVal >= 1 && newVal <= 150) {
        document.getElementById('lev-slider').value = newVal;
        updateLevSlider(newVal);
    }
}

// ၅။ Confirm နှိပ်လိုက်တဲ့အခါ အပြင်က Button မှာ တန်ဖိုးသွားပြောင်းရန် (အရေးကြီးဆုံး)
function confirmLeverage() {
    const slider = document.getElementById('lev-slider');
    const leverageDisplayBtn = document.getElementById('leverage-display-btn'); // အပြင်က Button ID

    if (slider && leverageDisplayBtn) {
        const finalValue = slider.value + "x";
        
        // အပြင်က Button ပေါ်က စာသားကို ပြောင်းလဲလိုက်ခြင်း
        leverageDisplayBtn.innerText = finalValue;
        
        console.log("Leverage set to:", finalValue);
        
        // Modal ကို ပိတ်မည်
        closeLeverageModal();
        
        // (Optional) အကယ်၍ Leverage ပြောင်းရင် Cost တွေပြန်တွက်ချင်ရင် ဒီမှာ function ခေါ်နိုင်ပါတယ်
        if (typeof updateOrderAmount === "function") updateOrderAmount();
    }
}

//
// Modal ဖွင့်ခြင်း/ပိတ်ခြင်း
function openDefaultSettingsModal() {
    document.getElementById('default-settings-modal').classList.remove('hidden');
}

function closeDefaultSettingsModal() {
    document.getElementById('default-settings-modal').classList.add('hidden');
}

// On/Off Switch Logic
function toggleDefaultSettings(isEnabled) {
    const content = document.getElementById('default-settings-content');
    if (isEnabled) {
        content.classList.remove('opacity-30', 'pointer-events-none');
    } else {
        content.classList.add('opacity-30', 'pointer-events-none');
    }
}

// Slider Update
function updateDefSlider(val) {
    document.getElementById('def-lev-input').value = val + 'x';
    const tooltip = document.getElementById('def-tooltip');
    tooltip.innerText = val + 'x';
    
    // Position tooltip
    const percent = ((val - 1) / (50 - 1)) * 100;
    tooltip.style.left = `calc(${percent}% + 4px)`;
}

// + / - Buttons
function adjustDefLev(change) {
    const slider = document.getElementById('def-slider');
    let newVal = parseInt(slider.value) + change;
    if (newVal >= 1 && newVal <= 50) {
        slider.value = newVal;
        updateDefSlider(newVal);
    }
}

// Margin Mode Selection
function setDefMargin(mode) {
    const crossBtn = document.getElementById('mode-cross');
    const isoBtn = document.getElementById('mode-isolated');
    
    if (mode === 'Cross') {
        crossBtn.className = "border border-blue-500 bg-[#2b3139] py-2 text-center rounded cursor-pointer text-xs text-white";
        isoBtn.className = "border border-gray-700 py-2 text-center rounded cursor-pointer text-xs text-gray-500";
    } else {
        isoBtn.className = "border border-blue-500 bg-[#2b3139] py-2 text-center rounded cursor-pointer text-xs text-white";
        crossBtn.className = "border border-gray-700 py-2 text-center rounded cursor-pointer text-xs text-gray-500";
    }
}

//
// Variable များ သတ်မှတ်ခြင်း
let currentDefMarginMode = 'Cross';

// Modal ဖွင့်ခြင်း/ပိတ်ခြင်း
function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

// Margin Mode ရွေးချယ်ခြင်း (UI feedback)
function selectMarginMode(mode) {
    // ဤနေရာတွင် UI selection ပြောင်းလဲမှုများကို ထည့်သွင်းနိုင်သည်
    console.log("Selected Mode:", mode);
}

//let selectedAssetMode = 'Single'; 

function selectAssetMode(mode) {
    selectedAssetMode = mode;
    const singleBox = document.getElementById('mode-single');
    const multiBox = document.getElementById('mode-multi');
    const singleIcon = document.getElementById('icon-bg-single');
    const multiIcon = document.getElementById('icon-bg-multi');

    if (mode === 'Single') {
        // Highlight Single
        singleBox.classList.replace('border-transparent', 'border-blue-500');
        singleIcon.classList.replace('bg-gray-700', 'bg-blue-600/20');
        singleIcon.classList.replace('text-gray-400', 'text-blue-500');

        // Unhighlight Multi
        multiBox.classList.replace('border-blue-500', 'border-transparent');
        multiIcon.classList.replace('bg-blue-600/20', 'bg-gray-700');
        multiIcon.classList.replace('text-blue-500', 'text-gray-400');
    } else {
        // Highlight Multi
        multiBox.classList.replace('border-transparent', 'border-blue-500');
        multiIcon.classList.replace('bg-gray-700', 'bg-blue-600/20');
        multiIcon.classList.replace('text-gray-400', 'text-blue-500');

        // Unhighlight Single
        singleBox.classList.replace('border-blue-500', 'border-transparent');
        singleIcon.classList.replace('bg-blue-600/20', 'bg-gray-700');
        singleIcon.classList.replace('text-blue-500', 'text-gray-400');
    }
}

function confirmAssetMode() {
    const assetBtn = document.getElementById('asset-mode-btn'); 
    if (!assetBtn) {
        console.error("Error: 'asset-mode-btn' ID ကို ရှာမတွေ့ပါ။ အပြင်က S Button မှာ id='asset-mode-btn' ထည့်ထားဖို့ လိုပါတယ်။");
        return;
    }

    if (selectedAssetMode === 'Single') {
        assetBtn.innerText = 'S';
    } else {
        assetBtn.innerText = 'M';
    }
    
    closeModal('asset-mode-modal'); 
}

function handleOrderTypeChange() {
    const typeSelect = document.getElementById('order-type-select');
    if (!typeSelect) return;

    const type = typeSelect.value;
    const container = document.getElementById('dynamic-inputs-container');
    const priceRow = document.getElementById('price-input-row');
    
    // selectedCoinName မရှိခဲ့ရင် 'AAPL' လို့ default ထားမယ်
    const coinSymbol = (typeof selectedCoinName !== 'undefined' && selectedCoinName) ? selectedCoinName : "AAPL";
    
    if (!container) return;

    container.innerHTML = ""; // အဟောင်းတွေကို အရင်ဖျက်မယ်
    if (priceRow) priceRow.style.display = "flex"; // Price box ကို ပုံမှန်အတိုင်း ပြထားမယ်

    switch (type) {
        case "Market":
            if (priceRow) priceRow.style.display = "none";
            break;
        case "Stop Limit":
            container.innerHTML = `
                <div class="input-row"><label>Stop</label><input type="text" placeholder="Stop (USDT)"></div>
                <div class="input-row"><label>Limit</label><input type="text" placeholder="Limit (USDT)"></div>
            `;
            break;
        case "Stop Market":
            container.innerHTML = `<div class="input-row"><label>Stop</label><input type="text" placeholder="Stop (USDT)"></div>`;
            break;
        case "Trailing Stop":
            container.innerHTML = `
                <div class="input-row"><label>T/D (%)</label><input type="text" id="td-input-box" placeholder="Trailing Delta"></div>
                <div class="risk-boxes">
                    <div class="r-box" onclick="document.getElementById('td-input-box').value='0.5%'">0.5%</div>
                    <div class="r-box" onclick="document.getElementById('td-input-box').value='1%'">1%</div>
                    <div class="r-box" onclick="document.getElementById('td-input-box').value='1.5%'">1.5%</div>
                    <div class="r-box" onclick="document.getElementById('td-input-box').value='2%'">2%</div>
                    <div class="r-box" onclick="document.getElementById('td-input-box').value='5%'">5%</div>
                    
                </div>
            `;
            break;
        case "OCO":
            container.innerHTML = `
                <div class="input-row"><label>TP Limit</label><input type="text" placeholder="TP Limit (USDT)"></div>
                <div class="input-row"><label>SL Trigger</label><input type="text" placeholder="SL Trigger (USDT)"></div>
                <div class="input-row"><label>SL Limit</label><input type="text" placeholder="SL Limit"></div>
            `;
            break;
        case "TWAP":
    container.innerHTML = `
        <div class="input-row"><label>Total Size</label><input type="text" id="twap-total-size" placeholder="Total Size"></div>
        <div class="risk-boxes">
            <div class="r-box twap-asset-btn active" onclick="selectTwapAsset(this)">${coinSymbol}</div>
            <div class="r-box twap-asset-btn" onclick="selectTwapAsset(this)">USDT</div>
        </div>
        <div class="input-row"><label>Total Time</label><input type="text" id="twap-total-time" placeholder="Total Time"></div>
        <div class="risk-boxes">
            <div class="r-box time-btn" onclick="selectTwapTime(this, '30m')">30m</div>
            <div class="r-box time-btn" onclick="selectTwapTime(this, '1h')">1h</div>
            <div class="r-box time-btn" onclick="selectTwapTime(this, '6h')">6h</div>
            <div class="r-box time-btn" onclick="selectTwapTime(this, '12h')">12h</div>
        </div>
        <div class="choice-item" style="margin: 10px 0;">
            <input type="checkbox" id="optional-param-check" onchange="toggleOptionalParams()">
            <label for="optional-param-check" style="cursor:pointer">Optional Parameters</label>
        </div>
        <div id="optional-params-fields" style="display: none; border-left: 2px; padding-left: 10px;">
            <div class="input-row"><label>Delay</label><input type="text" placeholder="Delay Start Time"></div>
            <div class="input-row"><label>Limit</label><input type="text" placeholder="Limit Price (USDT)"></div>
        </div>
    `;
    break;    }
}


// ၁။ TWAP Asset (BTC/USDT) Select လုပ်ရန်
function selectTwapAsset(element) {
    // ၎င်း box ထဲမှာရှိတဲ့ asset button အားလုံးကို active ဖြုတ်မယ်
    const parent = element.parentElement;
    parent.querySelectorAll('.r-box').forEach(btn => btn.classList.remove('active'));
    // နှိပ်လိုက်တဲ့ button ကို active လုပ်မယ်
    element.classList.add('active');
}

// ၂။ TWAP Time Select လုပ်ရန်
function selectTwapTime(element, time) {
    const parent = element.parentElement;
    parent.querySelectorAll('.r-box').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    
    // Total Time input ထဲကို တန်ဖိုးထည့်မယ်
    const timeInput = document.getElementById('twap-total-time');
    if(timeInput) timeInput.value = time;
}

// ၃။ Optional Parameters Toggle (ID ကို သေချာစစ်ပါ)
function toggleOptionalParams() {
    const checkbox = document.getElementById('optional-param-check');
    const fields = document.getElementById('optional-params-fields');
    if (checkbox && fields) {
        fields.style.display = checkbox.checked ? "block" : "none";
    }
}

// အပြင်ဘက်ကို နှိပ်ရင် Dropdown ပိတ်ရန်
window.addEventListener('click', function(e) {
    if (!dropdownWrapper.contains(e.target)) {
        dropdownWrapper.classList.remove('active');
    }
});


// ၁။ TP/SL နှင့် Iceberg Toggle Logic
document.getElementById('tp-sl-check').addEventListener('change', function() {
    document.getElementById('tp-sl-fields').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('iceberg-check').addEventListener('change', function() {
    document.getElementById('iceberg-fields').style.display = this.checked ? 'block' : 'none';
});


function showNotification(message) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = 'float-notification';
    notification.innerText = message;

    container.appendChild(notification);

    // ၃ စက္ကန့်ပြည့်ရင် HTML ထဲကနေ လုံးဝဖျက်ထုတ်မယ်
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showNotification1(message) {
    const container = document.getElementById('notification-container1');
    const notification = document.createElement('div');
    notification.className = 'float-notification1';
    notification.innerText = message;

    container.appendChild(notification);

    // ၃ စက္ကန့်ပြည့်လျှင် HTML ထဲမှ ဖျက်ထုတ်မည်
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// --- Checkout Modal မပွင့်ခင် Balance အရင်စစ်ဆေးသည့် Logic ---
function openCheckout() {
    const coinQty = document.getElementById('coin-amount').value;
    const totalUsdt = document.getElementById('order-amount').value;
    const coinName = selectedCoinName;

    if (!coinQty || coinQty <= 0) {
        showNotification("Please enter a valid amount!");
        return;
    }

    // Firebase မှ လာသော global portfolio variable ကို သုံးပါမည်
    let availableUSDT = parseFloat(portfolio["USDT"]) || 0;
    let requiredUSDT = parseFloat(totalUsdt);

    if (availableUSDT < requiredUSDT) {
        showNotification("Your Balance is insufficient!");
        return; 
    }

    document.getElementById('checkout-coin-name').innerText = `${coinName}/USDT`;
    document.getElementById('checkout-coin-qty').innerText = coinQty;
    document.getElementById('checkout-total-usdt').innerText = `${totalUsdt} USDT`;
    
    document.getElementById('checkout-modal').classList.remove('hidden');
}

// ၃။ Checkout Modal ပိတ်ခြင်း
function closeCheckout() {
    document.getElementById('checkout-modal').classList.add('hidden');
    document.getElementById('payment-options').classList.add('hidden');
}

// ၄။ Payment Methods ရွေးချယ်မှု ပြသခြင်း
function togglePaymentMethods() {
    const options = document.getElementById('payment-options');
    options.classList.toggle('hidden');
}

function selectPayment(type, name) {
    selectedWalletType = type; // Global variable ကို update လုပ်မယ်
    document.getElementById('payment-name').innerText = name;
    togglePaymentMethods();
}

async function confirmCheckoutTrade() {
    try {
        // ၁။ Modal ကို အရင်ပိတ်လိုက်မယ်
        closeCheckout();

        // ၂။ addBuyLongTrade ကို တိုက်ရိုက်ခေါ်မယ် (အရင်က addTradeToHistory('Buy/Long') နေရာမှာ အစားထိုးတာပါ)
        if (typeof addBuyLongTrade === "function") {
            
            // await သုံးပြီး function ပြီးဆုံးအောင် စောင့်မယ်
            await addBuyLongTrade();
            
        } else {
            console.error("Critical Error: addBuyLongTrade function not found!");
            showNotification("System Error: Trade function missing.");
        }
    } catch (error) {
        console.error("Trade execution failed:", error);
        if (typeof showNotification === "function") {
            showNotification("Trade Failed! Please try again.", "error");
        }
    }
}

function toggleSection(id) {
            const section = document.getElementById(id);
            section.classList.toggle('active');
            window.dispatchEvent(new Event('resize'));
        }


        function initChart(symbol) {
            new TradingView.widget({
                "autosize": true, "symbol": symbol, "interval": "5", "theme": "dark", "style": "1", "container_id": "chart-area", "hide_side_toolbar": true
            });
        }

const FINNHUB_KEY = 'd6rg521r01qr194miqr0d6rg521r01qr194miqrg'; // သင့် API Key

// ၁။ Stock ပြောင်းလဲမှုကို ကိုင်တွယ်ရန်
async function handleStockChange(symbol) {
    // Label ကို update လုပ်ခြင်း
    const cleanSymbol = symbol.includes(':') ? symbol.split(':')[1] : symbol;
        selectedCoinName = cleanSymbol; 

    document.getElementById('stock-name-display').innerText = cleanSymbol;

    // စျေးနှုန်းအသစ်ကို Finnhub မှ ဆွဲယူခြင်း
    fetchStockPrice(symbol);

    // TradingView Chart ကို update လုပ်ခြင်း
    updateTradingViewChart(symbol);
}

// ၂။ Live Price ဆွဲယူခြင်း
async function fetchStockPrice(symbol) {
    try {
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`);
        const data = await response.json();
        
        if (data.c) {
            // Price Input ထဲသို့ စျေးနှုန်းထည့်ခြင်း
            document.getElementById('order-price').value = data.c.toFixed(2);
        }
    } catch (error) {
        console.error("Price fetch error:", error);
    }
}

// ၃။ TradingView Widget ကို Update လုပ်ခြင်း
function updateTradingViewChart(symbol) {
    if (typeof TradingView !== 'undefined') {
        new TradingView.widget({
            "autosize": true,
            "symbol": symbol,
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "container_id": "tradingview_widget"
        });
    }
}

// Page Load လုပ်ချိန်မှာ ပထမဆုံးတန်ဖိုး (AAPL) အတွက် စျေးနှုန်းဆွဲထားရန်
window.onload = function() {
    handleStockChange('AAPL');
};


/* Start */

// ၁။ Finnhub မှာ Symbol သွားရှာတဲ့ Function
async function searchSymbols(query) {
    const resultsContainer = document.getElementById('search-results');
    if (query.length < 1) {
        resultsContainer.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`https://finnhub.io/api/v1/search?q=${query}&token=${FINNHUB_KEY}`);
        const data = await response.json();
        if (data.result) {
            displaySearchResults(data.result);
        }
    } catch (error) {
        console.error("Search Error:", error);
    }
}

function displaySearchResults(stocks) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';
    resultsContainer.style.display = 'block';

    stocks.forEach(stock => {
        const li = document.createElement('li');
        li.style.padding = '10px';
        li.style.cursor = 'pointer';
        li.style.borderBottom = '1px solid #2a2e39';
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.gap = '10px';

        // Logo ပုံအတွက် URL (Clearbit API သို့မဟုတ် TradingView ရဲ့ static image ကို သုံးနိုင်ပါတယ်)
        // ဒီမှာတော့ ရိုးရှင်းအောင် Symbol ပေါ်မူတည်ပြီး Logo ဆွဲတဲ့ link ကို သုံးထားပါတယ်
        const cleanSym = stock.symbol.split(':')[0]; // Currency pair တွေအတွက် symbol သန့်စင်ခြင်း
        const logoUrl = `https://static2.finnhub.io/logo/${cleanSym}.png`;

        li.innerHTML = `
            <img src="${logoUrl}" onerror="this.src='https://ui-avatars.com/api/?name=${stock.symbol}&background=random'" 
                 style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;">
            <div style="display: flex; flex-direction: column;">
                <span style="font-weight: bold; color: #ffffff; font-size: 14px;">${stock.symbol}</span>
                <small style="color: #848e9c; font-size: 11px;">${stock.description}</small>
            </div>
        `;
        
        li.onmouseover = () => li.style.background = '#2a2e39';
        li.onmouseout = () => li.style.background = 'transparent';

        li.onclick = function() {
            document.getElementById('stock-search-input').value = stock.symbol;
            resultsContainer.style.display = 'none';
            handleStockChange(stock.symbol); // မူရင်း Function ကို လှမ်းခေါ်ခြင်း
        };
        
        resultsContainer.appendChild(li);
    });
}

// အပြင်ဘက်ကို နှိပ်ရင် Dropdown ပိတ်သွားအောင် လုပ်ခြင်း
document.addEventListener('click', function(event) {
    const container = document.getElementById('search-results');
    const input = document.getElementById('stock-search-input');
    if (event.target !== input) {
        container.style.display = 'none';
    }
});


// ၁။ Coin Amount ရိုက်တဲ့အခါ USDT ကို တွက်ပေးခြင်း
document.getElementById('coin-amount').addEventListener('input', function() {
    const coinQty = parseFloat(this.value);
    const price = parseFloat(document.getElementById('order-price').value);
    
    if (!isNaN(coinQty) && price > 0) {
        const totalUsdt = coinQty * price;
        document.getElementById('order-amount').value = totalUsdt.toFixed(2);
    } else {
        document.getElementById('order-amount').value = "";
    }
});

// ၂။ USDT Amount ရိုက်တဲ့အခါ Coin အရေအတွက်ကို ပြန်တွက်ပေးခြင်း
document.getElementById('order-amount').addEventListener('input', function() {
    const usdtAmt = parseFloat(this.value);
    const price = parseFloat(document.getElementById('order-price').value);
    
    if (!isNaN(usdtAmt) && price > 0) {
        const coinQty = usdtAmt / price;
        document.getElementById('coin-amount').value = coinQty.toFixed(6);
    } else {
        document.getElementById('coin-amount').value = "";
    }
});

/* End */

// Global Variable အဖြစ် လက်ရှိရွေးထားတဲ့ Wallet Type ကို သိမ်းထားမယ် (Default: spotBalance)
let selectedWalletType = 'spotBalance'; 

function switchTradePage(mode) {
    if (mode === 'future') {
        // Main page (main.html) မှာရှိတဲ့ Hidden Stock Future Tab ကို လှမ်းခေါ်မယ်
        if (window.parent && window.parent.switchToStockFuture) {
            window.parent.switchToStockFuture();
        }
    } else {
        // အကယ်၍ Spot ကို ပြန်နှိပ်ရင် (လက်ရှိ page က spot ဖြစ်နေလို့ ဘာမှမလုပ်ခိုင်းလည်း ရပါတယ်)
        if (window.parent && window.parent.switchToStockTab) {
            window.parent.switchToStockTab();
        }
    }
}

// လက်ရှိ ဘယ် Page မှာ ရောက်နေလဲဆိုတာကို ကြည့်ပြီး Tab အရောင်ကို အလိုအလျောက် ပြောင်းပေးခြင်း
window.addEventListener('DOMContentLoaded', (event) => {
    if (window.location.pathname.includes('stockfuturetrading.html')) {
        document.getElementById('tab-future').style.color = "white";
        document.getElementById('tab-future').style.borderBottom = "2px solid white";
        document.getElementById('tab-spot').style.color = "#848e9c";
        document.getElementById('tab-spot').style.borderBottom = "2px solid transparent";
    }
});


async function addBuyLongTrade() {
    if (!currentUser) {
        showNotification("Please login first!");
        return;
    }

    const priceInput = document.getElementById('order-price');
    const amountInput = document.getElementById('coin-amount');
    const totalInput = document.getElementById('order-amount');
    
    // Order Type ကို Dropdown ကနေ ယူခြင်း
    const orderTypeSelect = document.getElementById('order-type-select');
    const selectedOrderType = orderTypeSelect ? orderTypeSelect.value : "Market";

    const marginTypeBtn = document.getElementById('margin-mode-btn');
    const marginType = marginTypeBtn ? marginTypeBtn.innerText : "Cross";

    const leverageBtn = document.getElementById('leverage-display-btn');
    const leverageText = leverageBtn ? leverageBtn.innerText : "20x";
    
    const price = parseFloat(priceInput.value) || 0;
    const amount = parseFloat(amountInput.value) || 0;
    const totalUSDT = parseFloat(totalInput.value) || 0;
    const side = 'Buy'; 
    const coinSymbol = selectedCoinName; 

    if (totalUSDT <= 0 || amount <= 0) {
        showNotification("Please enter amount!");
        return;
    }

    const tradingFee = totalUSDT * 0.0005;
    const totalCost = totalUSDT + tradingFee; 
    const usdtBalance = parseFloat(portfolio["USDT"]) || 0;

    if (usdtBalance < totalCost) {
        showNotification("Your USDT Balance is insufficient!");
        return;
    }

    let currentPortfolio = { ...portfolio };
    currentPortfolio["USDT"] = usdtBalance - totalCost;
    currentPortfolio[coinSymbol] = (parseFloat(currentPortfolio[coinSymbol]) || 0) + amount;

    const tradeData = {
        dateTime: new Date().toLocaleString(),
        side: side,
        orderType: selectedOrderType, // ရွေးချယ်ထားတဲ့ Dropdown value ကို သိမ်းဆည်းမယ်
        amount: amount.toFixed(6),
        marketPrice: price.toFixed(2),
        totalUSDT: totalUSDT.toFixed(2),
        status: "Complete",
        fee: tradingFee.toFixed(2),
        coinSymbol: coinSymbol,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };

    try {
        await firebase.database().ref(`portfolios/${currentUser.uid}`).set(currentPortfolio);
        await firebase.database().ref(`spot-stock-trade-history/${currentUser.uid}`).push(tradeData);
        portfolio = currentPortfolio; 
        if (typeof updateTopBalance === "function") updateTopBalance();
        showNotification1(`Buy successful!`);
    } catch (error) {
        showNotification("Error: " + error.message);
    }
}

async function addSellShortTrade() {
    if (!currentUser) {
        showNotification("Please login first!");
        return;
    }

    const priceInput = document.getElementById('order-price');
    const amountInput = document.getElementById('coin-amount');
    const totalInput = document.getElementById('order-amount');
    
    const orderTypeSelect = document.getElementById('order-type-select');
    const selectedOrderType = orderTypeSelect ? orderTypeSelect.value : "Market";
    const leverageText = document.getElementById('leverage-display-btn')?.innerText || "20x";
    const leverageValue = parseInt(leverageText) || 20;

    const price = parseFloat(priceInput.value) || 0; 
    const amount = parseFloat(amountInput.value) || 0; // Trader ရိုက်လိုက်တဲ့ Coin Amount
    const totalUSDTValue = parseFloat(totalInput.value) || 0; 
    const side = 'Sell'; 
    const coinSymbol = selectedCoinName; 

    if (totalUSDTValue <= 0 || amount <= 0) {
        showNotification("Please enter amount!");
        return;
    }

    let currentPortfolio = { ...portfolio };
    const usdtBalance = parseFloat(currentPortfolio["USDT"]) || 0;
    const coinBalance = parseFloat(currentPortfolio[coinSymbol]) || 0;

    if (coinBalance < amount) {
        showNotification(`Insufficient ${coinSymbol} balance!`); 
        return;
    }

    // --- ၁။ Weighted Average Entry Price တွက်ခြင်း ---
    let weightedEntryPrice = 0;
    try {
        const historySnapshot = await firebase.database().ref(`spot-stock-trade-history/${currentUser.uid}`).once('value');
        const historyData = historySnapshot.val();
        
        if (historyData) {
            let totalBuyAmount = 0;
            let totalBuyCost = 0;
            Object.values(historyData).forEach(trade => {
                if (trade.coinSymbol === coinSymbol && trade.side === 'Buy' && trade.status === "Complete") {
                    const buyAmt = parseFloat(trade.amount);
                    totalBuyAmount += buyAmt;
                    totalBuyCost += (buyAmt * parseFloat(trade.marketPrice));
                }
            });
            weightedEntryPrice = totalBuyAmount > 0 ? (totalBuyCost / totalBuyAmount) : price;
        } else {
            weightedEntryPrice = price;
        }
    } catch (e) { weightedEntryPrice = price; }

    // --- ၂။ Entry Price ကို Adjust လုပ်ခြင်း (User Formula) ---
    const adjustedEntryPrice = price;

    // --- ၃။ PNL တွက်ချက်ခြင်း (Full Amount ကို သုံးထားသည်) ---
    const tradingFee = totalUSDTValue * 0.0005;
    const grossPNL = amount * (price - adjustedEntryPrice);
    const netRealizedPNL = grossPNL - tradingFee;

    // --- ၄။ Portfolio Update (Wallet ထဲမှ Amount အပြည့်နုတ်သည်) ---
    currentPortfolio[coinSymbol] = coinBalance - amount;
    currentPortfolio["USDT"] = usdtBalance + totalUSDTValue + netRealizedPNL;

    const tradeData = {
        dateTime: new Date().toLocaleString(),
        side: side,
        orderType: selectedOrderType,
        status: "Complete",
        amount: amount.toFixed(6), // ဤနေရာတွင် မူရင်း Amount ကိုသာ သိမ်းသည်
        totalUSDT: totalUSDTValue.toFixed(2), 
        marketPrice: price.toFixed(2), 
        entryPrice: adjustedEntryPrice.toFixed(2), 
        realizedPNL: netRealizedPNL.toFixed(2), 
        fee: tradingFee.toFixed(2), 
        coinSymbol: coinSymbol,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };

    try {
        await firebase.database().ref(`portfolios/${currentUser.uid}`).set(currentPortfolio);
        await firebase.database().ref(`spot-stock-trade-history/${currentUser.uid}`).push(tradeData);
        portfolio = currentPortfolio; 
        if (typeof updateTopBalance === "function") updateTopBalance();
        showNotification1(`Sell successful!`);
    } catch (error) {
        showNotification("Error: " + error.message);
    }
}

function renderStoredHistory() {
    const tbody = document.getElementById('history-body');
    const positionCountBadge = document.getElementById('pos-count'); // Count ပြမည့် element id ကို စစ်ပါ
    
    if (!tbody || !currentUser) return;

    const historyRef = firebase.database().ref(`spot-stock-trade-history/${currentUser.uid}`);
    historyRef.on('value', (snapshot) => {
        const data = snapshot.val();
        tbody.innerHTML = ""; 

        if (!data) {
            tbody.innerHTML = `<div class="py-10 text-center text-gray-500 text-xs">No trade history available.</div>`;
            if (positionCountBadge) positionCountBadge.innerText = "0"; // Data မရှိရင် 0 ပြရန်
            return;
        }

        // --- History Count ကို ရေတွက်ခြင်း ---
        const historyEntries = Object.entries(data);
        const totalCount = historyEntries.length;
        
        // UI ရှိ Badge သို့မဟုတ် Tab Title တွင် အရေအတွက်ကို Update လုပ်ခြင်း
        if (positionCountBadge) {
            positionCountBadge.innerText = totalCount;
        }

        historyEntries.reverse().forEach(([tradeId, trade]) => {
            const isBuy = (trade.side === 'Buy' || trade.side === 'Buy/Long');
            const sideClass = isBuy ? 'text-green-500' : 'text-red-500';
            const pnlClass = parseFloat(trade.realizedPNL) >= 0 ? 'text-green-400' : 'text-red-400';

            const card = `
                <div class="trade-card p-4 mb-3" style="background: #1e2329; border-radius: 8px;">
                    <div class="grid grid-cols-3 gap-2">
                        <div class="flex flex-col">
                            <span class="text-[12px] text-gray-500 leading-tight mb-1">${trade.dateTime}</span>
                            <div class="flex items-center gap-2 mb-2">
                                <span class="${sideClass} font-bold text-[13px]">${trade.side.toUpperCase()}</span>
                                <span class="text-gray-400 text-[13px]">${trade.orderType || 'Market'}</span>
                            </div>
                           
                            <div class="mt-auto">
                                <span class="text-gray-500 block text-[13px]">Amount (${trade.coinSymbol})</span>
                                <span class="text-white text-[12px] font-medium">${trade.amount}</span>
    
                                 ${!isBuy ? `<span class="text-gray-500 block text-[13px] mt-2">Entry Price (USDT)</span>
                                  <span class="text-white text-[11px]">${trade.entryPrice}</span>` : ''}
                            </div>
                        </div>

                        <div class="flex flex-col justify-end px-2 pb-0.5">
                            <div class="mb-3">
                                <span class="text-gray-500 block text-[12px]">Market Price (USDT)</span>
                                <span class="text-white text-[12px]">${trade.marketPrice}</span>
                            </div>
                            <div>
                                <span class="text-gray-500 block text-[12px]">Total (USDT)</span>
                                <span class="text-white text-[12px]">${trade.totalUSDT || '0.00'}</span>
                            </div>
                        </div>

                        <div class="flex flex-col text-right">
                            <div class="mb-auto">
                                <span class="text-green-400 text-[12px] font-medium block">Complete</span>
                            </div>
                            <div class="mt-2">
                                ${!isBuy ? `
                                    <span class="text-gray-500 block text-[13px]">Net Realized PNL</span>
                                    <span class="${pnlClass} text-[12px] font-bold block mb-2">${trade.realizedPNL} USDT</span>
                                ` : ''}
                                <span class="text-gray-500 block text-[13px]">Fee (USDT)</span>
                                <span class="text-gray-300 text-[12px]">${trade.fee}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            tbody.innerHTML += card;
        });
    });
}

// Initial Render
renderStoredHistory();

function renderOrderHistory() {
    const historyBody = document.getElementById('order-history-body');
    if (!historyBody || !currentUser) return;

    // History ကို တစ်ကြိမ်ပဲ ယူမှာဖြစ်လို့ .once ကို သုံးပါတယ်
    firebase.database().ref(`spot-stock-trade-history/${currentUser.uid}`).once('value', (snapshot) => {
        const data = snapshot.val();
        historyBody.innerHTML = "";

        if (!data) {
            historyBody.innerHTML = `<div class="py-10 text-center text-gray-500 text-xs">No trade history available.</div>`;
            return;
        }

        let entries = Object.entries(data);
        // Status "Complete" ဖြစ်သွားတဲ့ Trade ဒေတာများကိုသာ Filter လုပ်ပါမယ်
        let completedTrades = entries.filter(([id, trade]) => trade.status === "Complete");

        if (completedTrades.length === 0) {
            historyBody.innerHTML = `<div class="py-10 text-center text-gray-500 text-xs">No completed trades available.</div>`;
            return;
        }

        // နောက်ဆုံးလုပ်ထားတာကို အပေါ်ဆုံးမှာပြဖို့ reverse လုပ်ပါမယ်
        completedTrades.reverse().forEach(([tradeId, trade]) => {
            const isBuy = (trade.side === 'Buy' || trade.side === 'Buy/Long');
            const sideClass = isBuy ? 'text-green-500' : 'text-red-500';
            const pnlClass = parseFloat(trade.realizedPNL) >= 0 ? 'text-green-400' : 'text-red-400';

            // သင်ပေးထားသော Card Style အသစ်
            const card = `
                <div class="trade-card p-4 mb-3" style="background: #1e2329; border-radius: 8px;">
                    <div class="grid grid-cols-3 gap-2">
                        <div class="flex flex-col">
                            <span class="text-[12px] text-gray-500 leading-tight mb-1">${trade.dateTime}</span>
                            <div class="flex items-center gap-2 mb-2">
                                <span class="${sideClass} font-bold text-[13px]">${trade.side.toUpperCase()}</span>
                                <span class="text-gray-400 text-[13px]">${trade.orderType || 'Market'}</span>
                            </div>
                           
                            <div class="mt-auto">
                                <span class="text-gray-500 block text-[13px]">Amount (${trade.coinSymbol})</span>
                                <span class="text-white text-[12px] font-medium">${trade.amount}</span>

                                 ${!isBuy ? `<span class="text-gray-500 block text-[13px] mt-2">Entry Price (USDT)</span>
                                  <span class="text-white text-[11px]">${trade.entryPrice}</span>` : ''}
                            </div>
                        </div>

                        <div class="flex flex-col justify-end px-2 pb-0.5">
                            <div class="mb-3">
                                <span class="text-gray-500 block text-[12px]">Market Price (USDT)</span>
                                <span class="text-white text-[12px]">${trade.marketPrice}</span>
                            </div>
                            <div>
                                <span class="text-gray-500 block text-[12px]">Total (USDT)</span>
                                <span class="text-white text-[12px]">${trade.totalUSDT || '0.00'}</span>
                            </div>
                        </div>

                        <div class="flex flex-col text-right">
                            <div class="mb-auto">
                                <span class="text-green-400 text-[12px] font-medium block">Complete</span>
                            </div>
                            <div class="mt-2">
                                ${!isBuy ? `
                                    <span class="text-gray-500 block text-[13px]">Net Realized PNL</span>
                                    <span class="${pnlClass} text-[12px] font-bold block mb-2">${trade.realizedPNL} USDT</span>
                                ` : ''}
                                <span class="text-gray-500 block text-[13px]">Fee (USDT)</span>
                                <span class="text-gray-300 text-[12px]">${trade.fee}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            historyBody.innerHTML += card;
        });
    });
}



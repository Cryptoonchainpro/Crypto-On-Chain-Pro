// ၁။ Global Variables များ ကြေညာခြင်း
let binanceApiUrl = 'https://api.binance.com'; // Default အနေနဲ့ Global ကို ထားမယ်
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

let selectedWalletType = 'spotBalance';

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

// လက်ရှိ Login ဝင်ထားတဲ့ User ကို ယူမယ်
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// User တစ်ယောက်ချင်းစီအတွက် သီးသန့် Key ကို သတ်မှတ်မယ် (portfolio.js နဲ့ ကိုက်ညီအောင်)
const userPortfolioKey = currentUser ? `portfolio_${currentUser.id}` : 'portfolio';

// Variable များကို ထိပ်ဆုံးတွင် တစ်ကြိမ်သာ ကြေညာပါ
// localStorage မှ portfolio data ကို ဖတ်ယူခြင်း

let allPairs = [];
let filteredPairs = [];
let currentPage = 1;
const itemsPerPage = 10;
let currentPrice = [];
let selectedCoinName = "BTC";
let isPairSelected = false; // User က တစ်ခုခု ရွေးပြီးပြီလား သိရန်
// ကုဒ်အသစ်ဖြင့် အစားထိုးရန်
let tradeHistory = JSON.parse(localStorage.getItem('tradeHistory')) || [];

// Page စဖွင့်ချိန်မှာ သိမ်းထားတဲ့ History တွေကို ဇယားထဲမှာ ပြပေးရန်

window.onload = function() {
    renderStoredHistory();
    updateTopBalance(); // Balance ကို စဖွင့်ချင်း update လုပ်ရန်
    // ဤ function ကို ခေါ်လိုက်ပါ
initializeApp();

};

// ၁။ Binance API မှ Data အားလုံးကို စတင်ခေါ်ယူခြင်း (24h Change အပါအဝင်)
async function fetchFullMarketData() {
    try {
        const response = await fetch(`${binanceApiUrl}/api/v3/ticker/24hr`);
        const data = await response.json();
        allPairs = data.filter(item => item.symbol.endsWith('USDT'));
        
        // Search Filter မရှိလျှင် အားလုံးပြရန်
        const searchTerm = document.getElementById('market-search').value.toUpperCase();
        if (!searchTerm) {
            filteredPairs = allPairs;
        } else {
            filteredPairs = allPairs.filter(item => item.symbol.includes(searchTerm));
        }
        
        renderMarketTable();
    } catch (error) {
        console.error("Market Data Fetch Error:", error);
    }
}

// ၄။ Search လုပ်ဆောင်ချက်
document.getElementById('market-search').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toUpperCase();
    filteredPairs = allPairs.filter(item => item.symbol.replace('USDT', '').includes(searchTerm));
    currentPage = 1;
    renderMarketTable();
});

// ၅။ Pagination Logic
function updatePagination() {
    const totalPages = Math.ceil(filteredPairs.length / itemsPerPage) || 1;
    document.getElementById('page-info').innerText = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prev-page').disabled = (currentPage === 1);
    document.getElementById('next-page').disabled = (currentPage === totalPages);
}

document.getElementById('next-page').addEventListener('click', () => {
    if (currentPage * itemsPerPage < filteredPairs.length) {
        currentPage++;
        renderMarketTable();
    }
});

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderMarketTable();
    }
});

// Interval များ သတ်မှတ်ခြင်း
setInterval(updateOrderBook, 800);
setInterval(updateMarketPrices, 1000); // ၁ စက္ကန့်တစ်ခါ စျေးနှုန်း Update
setInterval(fetchFullMarketData, 60000); // ၁ မိနစ်တစ်ခါ Data အားလုံး Refresh

// Initial Load
fetchFullMarketData();

// [အောက်က ကုဒ်များကို မဖျက်ပါနှင့်]
document.querySelectorAll('.c-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.c-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// ၄။ renderMarketTable function ရဲ့ အောက်ဆုံးမှာ setupTradeButtons() ကို ခေါ်ပေးရပါမယ်
function renderMarketTable() {
    const tbody = document.getElementById('market-body');
    if (!tbody) return;
    tbody.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredPairs.slice(startIndex, endIndex);

    currentData.forEach(item => {
        const symbol = item.symbol;
        const name = symbol.replace('USDT', '');
        const price = parseFloat(item.lastPrice).toLocaleString(undefined, { minimumFractionDigits: 2 });
        const change = parseFloat(item.priceChangePercent).toFixed(2);

        const row = `
            <tr>
                <td>
                    <div class="pair-info">
                        <div>
                            <span class="pair-name">${name}</span><span class="pair-sub">/USDT</span>
                        </div>
                    </div>
                </td>
                <td class="price-cell">${price}</td>
                <td>
            <span class="badge-change ${change >= 0 ? 'up-bg' : 'down-bg'}">
                ${change >= 0 ? '+' : ''}${change}%
            </span>
        </td>
                <td class="text-right"><button class="trade-btn">Trade</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    updatePagination();
    setupTradeButtons(); // ဒီနေရာမှာ ပြန်ခေါ်ပေးတာက အရေးကြီးပါတယ် (Table page ပြောင်းတိုင်း အလုပ်လုပ်ဖို့)
}


// ၂။ updateMarketPrices function ထဲမှာ BTC စျေးကို Order Book ဆီ ပို့ပေးမယ့် logic ထည့်ပါ
async function updateMarketPrices() {
    try {
        const response = await fetch(`${binanceApiUrl}/api/v3/ticker/price`);
        const data = await response.json();
        const usdtPrices = data.filter(d => d.symbol.endsWith('USDT'));
        
        allPairs.forEach(pair => {
            const updated = usdtPrices.find(u => u.symbol === pair.symbol);
            if (updated) pair.lastPrice = updated.price;
        });

        // --- အသစ်ထည့်ရန် အပိုင်း ---
        // အကယ်၍ User က ဘာမှ မရွေးရသေးရင် BTC ရဲ့ Real Market Price ကို ယူမယ်
        if (!isPairSelected) {
            const btcData = usdtPrices.find(u => u.symbol === "BTCUSDT");
            if (btcData) {
                currentPrice = parseFloat(btcData.price);
            }
        }
        // ------------------------

        const rows = document.querySelectorAll('#market-body tr');
        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentData = filteredPairs.slice(startIndex, startIndex + itemsPerPage);

        rows.forEach((row, index) => {
            if (currentData[index]) {
                const priceCell = row.querySelector('.price-cell');
                const newPrice = parseFloat(currentData[index].lastPrice).toLocaleString(undefined, { minimumFractionDigits: 2 });
                if (priceCell && priceCell.innerText !== newPrice) {
                    priceCell.innerText = newPrice;
                }
            }
        });
    } catch (e) { console.log("Price Update Error"); }
}

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


// USDT Amount ကို ကိုယ်တိုင်ရိုက်နေချိန်မှာလည်း Risk Amount ပါ လိုက်ပြောင်းစေရန်
document.getElementById('order-amount').addEventListener('input', function() {
    const activeRiskBox = document.querySelector('.r-box.active');
    const price = parseFloat(document.getElementById('order-price').value);
    const usdtAmt = parseFloat(this.value);

    // Coin Amount ကို အရင်ကအတိုင်း တွက်ချက်ပေးဆဲဖြစ်သည်
    if (!isNaN(usdtAmt) && price > 0) {
        document.getElementById('coin-amount').value = (usdtAmt / price).toFixed(6);
    }

    // Risk Amount ကိုပါ တစ်ခါတည်း update လုပ်ပေးခြင်း
    if (activeRiskBox && !isNaN(usdtAmt)) {
        const percentValue = parseFloat(activeRiskBox.getAttribute('data-val')) / 100;
        document.getElementById('risk-amount-input').value = (usdtAmt * percentValue).toFixed(2);
    }
});

// ၁။ TP/SL နှင့် Iceberg Toggle Logic
document.getElementById('tp-sl-check').addEventListener('change', function() {
    document.getElementById('tp-sl-fields').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('iceberg-check').addEventListener('change', function() {
    document.getElementById('iceberg-fields').style.display = this.checked ? 'block' : 'none';
});


// Dropdown Toggle လုပ်ခြင်း
const pairDropdownBtn = document.getElementById('pair-dropdown-btn');
const dropdownWrapper = document.querySelector('.dropdown');

pairDropdownBtn.addEventListener('click', function() {
    dropdownWrapper.classList.toggle('active');
    if (dropdownWrapper.classList.contains('active')) {
        updatePairList(""); // Dropdown ပွင့်တာနဲ့ အားလုံးကို ပြမယ်
        document.getElementById('pair-search').focus();
    }
});

// Pair List ကို Update လုပ်ပေးတဲ့ Function
function updatePairList(searchTerm = "") {
    const listDiv = document.getElementById('pair-list-results');
    if (!listDiv) return;

    const filtered = allPairs.filter(p => p.symbol.includes(searchTerm.toUpperCase()));

    listDiv.innerHTML = filtered.map(p => {
        const change = parseFloat(p.priceChangePercent).toFixed(2);
        return `
            <div class="pair-item" onclick="selectPair('${p.symbol}', ${p.lastPrice}, '${change}')">
                <span>${p.symbol.replace('USDT', '/USDT')}</span>
                <span style="color: ${change >= 0 ? '#00ffad' : '#ff3b3b'}">${change >= 0 ? '+' : ''}${change}%</span>
            </div>
        `;
    }).join('');
}

// Search Box မှာ ရိုက်တဲ့အခါ Filter လုပ်ခြင်း
document.getElementById('pair-search').addEventListener('input', function(e) {
    updatePairList(e.target.value);
});

// Pair တစ်ခုကို ရွေးချယ်လိုက်တဲ့အခါ လုပ်ဆောင်မယ့် Function
function selectPair(symbol, price, change) {
    selectedCoinName = symbol.replace('USDT', '');
    selectedPairPrice = parseFloat(price);
    currentPrice = selectedPairPrice; // Order Book စျေးနှုန်းကိုပါ ပြောင်းလဲရန်
    isPairSelected = true; // User က pair ရွေးထားကြောင်း သတ်မှတ်

    // --- UI Update: Pair Display ---
    document.getElementById('current-pair-name').innerText = symbol.replace('USDT', '/USDT');
    const changeSpan = document.getElementById('current-pair-change');
    changeSpan.innerText = (change >= 0 ? '+' : '') + change + '%';
    changeSpan.style.color = change >= 0 ? '#00ffad' : '#ff3b3b';

    // --- UI Update: Order Form ---
    document.getElementById('order-price').value = selectedPairPrice.toFixed(2);
    document.getElementById('selected-coin-symbol').innerText = selectedCoinName;
    
    // Amount တွေကို Reset လုပ်ပေးခြင်း (Pair အသစ်အတွက်)
    document.getElementById('coin-amount').value = "";
    document.getElementById('order-amount').value = "";
    document.getElementById('risk-amount-input').value = "0.00";

    // --- UI Update: Dropdown ပိတ်ရန် (ဒီအပိုင်းကို ပြင်ဆင်ထားပါသည်) ---
    const dropdownWrapper = document.querySelector('.dropdown');
    if (dropdownWrapper) {
        dropdownWrapper.classList.remove('active');
    }
    
    // Search Box ကို Reset လုပ်ခြင်း
    const pairSearchInput = document.getElementById('pair-search');
    if (pairSearchInput) {
        pairSearchInput.value = "";
    }

    // --- Order Book ကို ချက်ချင်း Update လုပ်ရန် ---
    updateOrderBook(); 
}

// ၂။ Trade Button (Market Overview ထဲက ခလုတ်) အတွက်လည်း ထိုနည်းအတိုင်း ချိတ်ဆက်ပေးရန်
function setupTradeButtons() {
    document.querySelectorAll('.trade-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const pairNameFull = row.querySelector('.pair-name').innerText; // BTC
            const symbol = pairNameFull + "USDT";
            const pairPrice = parseFloat(row.querySelector('.price-cell').innerText.replace(/,/g, ''));
            
            // 24h Change ကို Table ထဲမှ ရယူရန်
            const changeText = row.querySelector('td:nth-child(3)').innerText.replace('%', '');
            
            // အပေါ်က selectPair function ကိုပဲ ပြန်သုံးပြီး UI အားလုံး update လုပ်မယ်
            selectPair(symbol, pairPrice, changeText);

            // Form ဆီသို့ Scroll ဆင်းပေးခြင်း
            document.querySelector('.trading-tools').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ၃။ updateOrderBook function ထဲမှာ currentPrice အတိုင်း real-time ပြောင်းနေဖို့
function updateOrderBook() {
    const askContainer = document.getElementById('asks');
    const bidContainer = document.getElementById('bids');
    if (!askContainer || !bidContainer) return;

    // စျေးနှုန်း အနည်းငယ် လှုပ်ခတ်နေစေရန်
    let volatility = (Math.random() - 0.5) * (currentPrice * 0.0005); 
    currentPrice += volatility;

    document.getElementById('mid-price').innerText = currentPrice.toLocaleString(undefined, {minimumFractionDigits: 2});
    
    // Input Box ထဲမှာ စျေးနှုန်းကို User က ကိုယ်တိုင် ရိုက်မနေမှသာ Auto-update လုပ်မယ်
    if(document.activeElement.id !== "order-price") {
        document.getElementById('order-price').value = currentPrice.toFixed(2);
    }

    let askHTML = ''; let bidHTML = '';
    // စျေးနှုန်းအလိုက် Order Book list ကို ပြောင်းလဲခြင်း
    for (let i = 6; i >= 1; i--) {
        askHTML += `<div class="row red"><span>${(currentPrice + i * (currentPrice * 0.0001)).toFixed(2)}</span><span>${(Math.random() * 2).toFixed(3)}</span></div>`;
    }
    for (let i = 1; i <= 6; i++) {
        bidHTML += `<div class="row green"><span>${(currentPrice - i * (currentPrice * 0.0001)).toFixed(2)}</span><span>${(Math.random() * 2).toFixed(3)}</span></div>`;
    }
    askContainer.innerHTML = askHTML;
    bidContainer.innerHTML = bidHTML;
}

function updateTradeHistoryTable() {
    const tbody = document.getElementById('trade-history-body'); 
    if (!tbody || !currentUser) return;

    // Firebase မှ tradeHistory/UID လမ်းကြောင်းကို ဖတ်မည်
    const historyRef = firebase.database().ref(`tradeHistory/${currentUser.uid}`);

    // .on('value') ကိုသုံးထားလို့ Trade အသစ်ဝင်လာတိုင်း ဇယားက အလိုအလျောက် Update ဖြစ်နေမှာပါ
    historyRef.on('value', (snapshot) => {
        const data = snapshot.val();
        tbody.innerHTML = ""; // ဇယားကို အရင်ရှင်းထုတ်မယ်

        if (!data) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-gray-500">No trading record found.</td></tr>`;
            return;
        }

        // Object ကို Array ပြောင်းပြီး နောက်ဆုံးလုပ်ထားတဲ့ Trade က အပေါ်ဆုံးရောက်အောင် Reverse လုပ်မယ်
        const tradesArray = Object.values(data).reverse();

        tradesArray.forEach(trade => {
            // သင့်ရဲ့ Trade Data ပုံစံအတိုင်း ပြန်ထုတ်ယူခြင်း
            const time = trade.date || trade.time || 'N/A';
            const pair = trade.asset || 'BTC/USDT';
            const side = trade.side || 'BUY';
            const price = trade.price || '0.00';
            const amount = trade.total || trade.totalValue || '0.00'; // USDT Amount
            const status = trade.status || 'Success';

            const row = `
                <tr class="border-b border-gray-800/50">
                    <td class="py-3 px-2 text-[11px] text-gray-400">${time}</td>
                    <td class="py-3 px-2 text-[11px] font-bold text-white">${pair}</td>
                    <td class="py-3 px-2 text-[11px] text-gray-400">Market</td>
                    <td class="py-3 px-2 text-[11px] font-bold ${side.toLowerCase() === 'buy' ? 'text-green-500' : 'text-red-500'}">
                        ${side.toUpperCase()}
                    </td>
                    <td class="py-3 px-2 text-[11px] font-mono text-gray-300">${price}</td>
                    <td class="py-3 px-2 text-[11px] font-mono text-gray-300">${amount}</td> 
                    <td class="py-3 px-2 text-[11px] font-bold" style="color: #00ffad;">${status}</td> 
                </tr>`;
            tbody.innerHTML += row;
        });
    });
}

// ၃။ Hide Button နှိပ်တဲ့အခါ History 5 ခု ပြန်ပေါ်လာစေရန်
document.querySelector('.hide-btn').addEventListener('click', function() {
    // လက်ရှိ Table Body ကို Clear လုပ်ပြီး ၅ ခု ပြန်ဖြည့်မယ်
    updateTradeHistoryTable();
    alert("Showing last 5 history records.");
});

// futuretrades.js ထဲက handleOrderTypeChange ကို ဒီအတိုင်း အစားထိုးကြည့်ပါ
function handleOrderTypeChange() {
    const typeSelect = document.getElementById('order-type-select');
    if (!typeSelect) return;

    const type = typeSelect.value;
    const container = document.getElementById('dynamic-inputs-container');
    const priceRow = document.getElementById('price-input-row');
    
    // selectedCoinName မရှိခဲ့ရင် 'BTC' လို့ default ထားမယ်
    const coinSymbol = (typeof selectedCoinName !== 'undefined' && selectedCoinName) ? selectedCoinName : "BTC";
    
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

//
function openFuturesModal() {
    document.getElementById('futures-modal').style.display = 'flex';
}

function closeFuturesModal() {
    document.getElementById('futures-modal').style.display = 'none';
}

function closeModalOnOutsideClick(event) {
    const modal = document.getElementById('futures-modal');
    if (event.target === modal) {
        closeFuturesModal();
    }
}

function checkAgreements() {
    const agreeRules = document.getElementById('agree-rules').checked;
    const agreeRisks = document.getElementById('agree-risks').checked;
    const openBtn = document.getElementById('open-now-btn');

    if (agreeRules && agreeRisks) {
        openBtn.disabled = false;
        openBtn.classList.remove('open-now-disabled');
        openBtn.classList.add('open-now-active');
    } else {
        openBtn.disabled = true;
        openBtn.classList.remove('open-now-active');
        openBtn.classList.add('open-now-disabled');
    }
}


// Market Overview ကို အဖွင့်အပိတ်လုပ်မည့် Function
function toggleMarketOverview() {
    const marketSection = document.getElementById('market-overview-section');
    const dropdownIcon = document.getElementById('dropdown-icon');
    const mainDropdownIcon = document.getElementById('main-dropdown-icon');

    if (marketSection.style.display === "none") {
        marketSection.style.display = "block";
        dropdownIcon.classList.add('rotated');
        if(mainDropdownIcon) mainDropdownIcon.classList.add('rotated');
    } else {
        marketSection.style.display = "none";
        dropdownIcon.classList.remove('rotated');
        if(mainDropdownIcon) mainDropdownIcon.classList.remove('rotated');
    }
}

// Search Box ဘေးက Icon ကို နှိပ်ရင်လည်း အလုပ်လုပ်စေရန်
document.getElementById('market-toggle-btn').addEventListener('click', toggleMarketOverview);

// Function to handle Profile Dropdown
function toggleProfileDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('profile-dropdown');
    dropdown.classList.toggle('hidden');
}

// Delivery Selection Function
function selectDelivery(element, time, profit) {
    // အရင် active ဖြစ်နေတဲ့ item ထဲက active class ကို ဖြုတ်မယ်
    document.querySelectorAll('.delivery-item').forEach(item => {
        item.classList.remove('active');
    });

    // အခုနှိပ်လိုက်တဲ့ item ကို active class ထည့်မယ် (နှစ်ခုစလုံးကို select လုပ်ပြီးသားဖြစ်သွားမယ်)
    element.classList.add('active');

    // လိုအပ်ရင် တန်ဖိုးတွေကို variable ထဲ သိမ်းထားနိုင်ပါတယ်
    document.getElementById('selected-delivery-time').value = time;
    document.getElementById('selected-delivery-profit').value = profit;

    console.log(`Selected: Time=${time}, Profit=${profit}`);
}
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

// futuretrades.js ရဲ့ အောက်ဆုံးမှာ ထည့်ပါ
function applyMaxAmount() {
    // ၁။ လက်ရှိ ရွေးထားတဲ့ Coin Symbol ကို Label ကနေ ယူမယ် (ဥပမာ- BTC)
    const coinSymbol = document.getElementById('selected-coin-symbol').innerText;
    
    // ၂။ portfolio object ထဲမှာ အဲ့ဒီ coin ရှိမရှိ စစ်မယ်၊ မရှိရင် 0 လို့ ယူမယ်
    // ဒီနေရာမှာ portfolio object က မူရင်းအတိုင်းပဲ ရှိနေရပါမယ်
    const balance = (typeof portfolio !== 'undefined' && portfolio[coinSymbol]) ? portfolio[coinSymbol] : 0;
    
    // ၃။ Input Box ထဲကို အရေအတွက် ထည့်ပေးမယ်
    const amountInput = document.getElementById('coin-amount');
    if (amountInput) {
        amountInput.value = balance;
        
        // ၄။ Total USDT တွက်ချက်မှုရှိရင် အလုပ်လုပ်အောင် event ပေးပို့မယ်
        amountInput.dispatchEvent(new Event('input'));
    }
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

// ၁။ Market တစ်ခုလုံးကို ပိတ်/ဖွင့် လုပ်မည့် Function
function toggleMarketOverview() {
    const mainContainer = document.getElementById('market-full-container');
    
    if (mainContainer.style.display === 'none' || mainContainer.style.display === '') {
        mainContainer.style.display = 'block';
    } else {
        mainContainer.style.display = 'none';
    }
}

// ၂။ ပွင့်လာတဲ့အခါ Tab ပြောင်းကြည့်မည့် Function
function switchMarketTab(tabName) {
    const cryptoSection = document.getElementById('market-overview-section');
    const stocksSection = document.getElementById('stocks-overview');
    const cryptoBtn = document.getElementById('crypto-tab-btn');
    const stocksBtn = document.getElementById('stocks-tab-btn');

    if (tabName === 'crypto') {
        cryptoSection.style.display = 'block';
        stocksSection.style.display = 'none';
        
        // UI Highlight
        cryptoBtn.classList.add('text-blue-500', 'border-b-2', 'border-blue-500');
        cryptoBtn.classList.remove('text-gray-400');
        stocksBtn.classList.remove('text-blue-500', 'border-b-2', 'border-blue-500');
        stocksBtn.classList.add('text-gray-400');
    } else {
        cryptoSection.style.display = 'none';
        stocksSection.style.display = 'block';
        
        // UI Highlight
        stocksBtn.classList.add('text-blue-500', 'border-b-2', 'border-blue-500');
        stocksBtn.classList.remove('text-gray-400');
        cryptoBtn.classList.remove('text-blue-500', 'border-b-2', 'border-blue-500');
        cryptoBtn.classList.add('text-gray-400');
    }
}


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
        await firebase.database().ref(`Spot-trade-history/${currentUser.uid}`).push(tradeData);
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
        const historySnapshot = await firebase.database().ref(`Spot-trade-history/${currentUser.uid}`).once('value');
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
        await firebase.database().ref(`Spot-trade-history/${currentUser.uid}`).push(tradeData);
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

    const historyRef = firebase.database().ref(`Spot-trade-history/${currentUser.uid}`);
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
    firebase.database().ref(`Spot-trade-history/${currentUser.uid}`).once('value', (snapshot) => {
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

async function checkUserRegionAndSetAPI() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code === 'US') {
            binanceApiUrl = 'https://api.binance.us';
            console.log("Region: US (Using Binance.US)");
        } else {
            binanceApiUrl = 'https://api.binance.com';
            console.log("Region: Global (Using Binance.com)");
        }
    } catch (error) {
        console.log("Region check failed, defaulting to Global API");
        binanceApiUrl = 'https://api.binance.com';
    }
}

async function initializeApp() {
    await checkUserRegionAndSetAPI(); // ၁။ အရင်ဆုံး Region စစ်မယ်
    fetchFullMarketData();           // ၂။ ပြီးမှ ဒေတာစဆွဲမယ်
    setInterval(updateMarketPrices, 3000); // ၃။ စျေးနှုန်း Update လုပ်မယ်
}

// --- (၁) Coin ရွေးပြီးတာနဲ့ Search Box ထဲကစာကိုဖျက်မယ်၊ Dropdown ပိတ်မယ် ---
function selectCoinFromOrderForm(symbol) {
    const coinData = allPairs.find(p => p.symbol === symbol);

    if (coinData) {
        const price = parseFloat(coinData.lastPrice);
        const change = parseFloat(coinData.priceChangePercent).toFixed(2);
        
        // (၁) Chart နဲ့ ဈေးနှုန်း Update လုပ်ခြင်း
        if (typeof selectPair === "function") {
            selectPair(symbol, price, change);
        }

        // (၂) သင်ပြောင်းလဲချင်တဲ့အပိုင်း - Search Box ထဲက စာသားကို လုံးဝ ဖျက်ထုတ်လိုက်မယ်
        const searchInput = document.getElementById('order-coin-search');
        if (searchInput) {
            searchInput.value = ""; // ဒီနေရာမှာ value ကို blank string ပေးလိုက်လို့ ရိုက်ထားတာတွေ ပျောက်သွားပါမယ်
        }
    }
    
    // (၃) Dropdown ကို ပိတ်ပြီး content ကို ရှင်းထုတ်မယ်
    const searchDropdown = document.getElementById('search-results-dropdown');
    if (searchDropdown) {
        searchDropdown.classList.add('hidden');
        searchDropdown.innerHTML = ''; 
    }
}

// --- (၂) အပြင်ဘက်ကို နှိပ်တဲ့အခါ Dropdown ပိတ်ရန် ---
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('search-results-dropdown');
    const searchInput = document.getElementById('order-coin-search');
    
    if (dropdown && searchInput) {
        if (!searchInput.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.add('hidden');
        }
    }
});

// --- (၃) Search Box ထဲက စာတွေကို filter လုပ်တဲ့အပိုင်း ---
function filterOrderCoins() {
    const searchInput = document.getElementById('order-coin-search');
    const query = searchInput.value.toUpperCase();
    const dropdown = document.getElementById('search-results-dropdown');
    
    if (!query || query.trim() === "") {
        dropdown.classList.add('hidden');
        dropdown.innerHTML = '';
        return;
    }

    const matches = allPairs.filter(p => p.symbol.includes(query) && p.symbol.endsWith('USDT')).slice(0, 10);

    if (matches.length > 0) {
        dropdown.innerHTML = matches.map(p => `
            <div onclick="selectCoinFromOrderForm('${p.symbol}')" 
                style="padding: 10px 12px; cursor: pointer; display: flex; justify-content: space-between; border-bottom: 1px solid #2b3139; font-size: 12px;">
                <span style="color: white; font-weight: bold;">${p.symbol.replace('USDT', '')}</span>
                <span style="color: #0ecb81;">$${parseFloat(p.lastPrice).toLocaleString()}</span>
            </div>
        `).join('');
        dropdown.classList.remove('hidden');
    } else {
        dropdown.innerHTML = `<div style="padding: 10px; color: #848e9c; text-align: center; font-size: 12px;">No results found</div>`;
        dropdown.classList.remove('hidden');
    }
}
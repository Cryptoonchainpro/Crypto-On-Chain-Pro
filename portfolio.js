

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

// --- ၁။ အခြေခံ ဒေတာများ (Firebase နှင့် ချိတ်ဆက်ရန်) ---
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
let allPrices = [];
let myChart = null;
let isBalanceHidden = false;
let portfolio = { "USDT": 0 }; // Default Value

document.addEventListener('DOMContentLoaded', () => {
    // Firebase Live Listener (Balance ပြောင်းလဲမှုကို နားထောင်ရန်)
    if (currentUser && currentUser.uid) {
        const userUid = currentUser.uid;
        const portfolioRef = firebase.database().ref(`portfolios/${userUid}`);

        portfolioRef.on('value', (snapshot) => {
            const data = snapshot.val();
            portfolio = data || { "USDT": 0 };
            updateDashboard(); // ဒေတာအသစ်ရတိုင်း UI ကို Update လုပ်မယ်
        });
    }

    // မူရင်းအတိုင်း ၂၀ စက္ကန့်တစ်ခါ ဈေးနှုန်း Update လုပ်ရန်
    setInterval(updateDashboard, 20000); 
    
    if(localStorage.getItem('theme') === 'light') document.body.classList.add('light-mode');
});

// Finnhub API Key (ဒီနေရာမှာ သင့်ရဲ့ API Key ကို ထည့်ပါ)
const FINNHUB_API_KEY = 'd6rg521r01qr194miqr0d6rg521r01qr194miqrg';

async function updateDashboard() {
    const assetBody = document.getElementById('asset-body');
    const plDisplay = document.getElementById('total-pl');
    
    try {
        const res = await fetch('https://api.binance.us/api/v3/ticker/price');
        allPrices = await res.json();

        let totalNW = 0;
        let labels = [];
        let dataValues = [];

        const assetEntries = Object.entries(portfolio);
        
        for (const [coin, amount] of assetEntries) {
            let currentAmount = parseFloat(amount) || 0;
            if(currentAmount <= 0 && coin !== 'USDT') {
                // Table Row အစား Card ID ဖြစ်သော card- ကို ရှာပြီး ဖျက်သည်
                const oldCard = document.getElementById(`card-${coin}`);
                if(oldCard) oldCard.remove();
                continue;
            }

            let price = 0;
            let stockLogoUrl = ""; 
            let isStock = false;

            if (coin === 'USDT') {
                price = 1;
            } else {
                const cryptoData = allPrices.find(p => p.symbol === coin + 'USDT');
                if (cryptoData) {
                    price = parseFloat(cryptoData.price);
                } else {
                    isStock = true; 
                    try {
                        const profileRes = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${coin}&token=${FINNHUB_API_KEY}`);
                        const profileData = await profileRes.json();
                        stockLogoUrl = profileData.logo;

                        const stockRes = await fetch(`https://finnhub.io/api/v1/quote?symbol=${coin}&token=${FINNHUB_API_KEY}`);
                        const stockData = await stockRes.json();
                        price = stockData.c ? parseFloat(stockData.c) : 0;
                    } catch (err) {
                        console.error("Stock Data Error:", err);
                        price = 0;
                    }
                }
            }

            const value = currentAmount * price;
            totalNW += value;

            if (value > 0.01) { 
                labels.push(coin);
                dataValues.push(value.toFixed(2));
            }

            // --- Card Style UI Update Section ---
            let card = document.getElementById(`card-${coin}`);
            
            if (!card) {
                const cryptoLogo = `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${coin.toLowerCase()}.png`;
                const initialLogo = isStock ? (stockLogoUrl || `https://logo.clearbit.com/${coin}.com`) : cryptoLogo;
                const fallbackLogo = `https://ui-avatars.com/api/?name=${coin}&background=random&color=fff`;

                const newCard = document.createElement('div');
                newCard.id = `card-${coin}`;
                // Card အတွက် Premium Design Styling များ
                newCard.className = "bg-[#061121] border border-gray-800/50 rounded-2xl p-5 hover:border-blue-500/50 transition-all duration-300 shadow-xl group";
                newCard.innerHTML = `
                    <div class="flex justify-between items-start mb-5">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-xl bg-[#0a192f] flex items-center justify-center overflow-hidden border border-gray-700/30 group-hover:scale-105 transition-transform shadow-inner">
                                <img src="${initialLogo}" 
                                     onerror="this.src='${fallbackLogo}'" 
                                     class="w-full h-full ${isStock ? 'object-cover' : 'p-2 object-contain'}">
                            </div>
                            <div>
                                <h3 class="font-bold text-white text-lg leading-tight">${coin}</h3>
                                <p class="text-[10px] text-gray-500 uppercase tracking-widest">${isStock ? 'Stock' : 'Crypto'}</p>
                            </div>
                        </div>
                        <button onclick="${isStock ? 'window.parent.switchToStockTab()' : 'window.parent.switchToTradeTab()'}" 
                            class="bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95">
                            Trade
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-2 mb-4 border-t border-gray-800/20 pt-4">
                        <div>
                            <p class="text-[10px] text-gray-500 uppercase font-semibold">Holding</p>
                            <p class="font-mono font-bold text-gray-200 text-sm">${currentAmount.toLocaleString(undefined, {maximumFractionDigits: 4})}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-[10px] text-gray-500 uppercase font-semibold">Price</p>
                            <p id="price-${coin}" class="font-mono text-gray-400 text-sm">$-</p>
                        </div>
                    </div>

                    <div class="bg-black/30 rounded-xl p-3 flex justify-between items-center border border-gray-800/10">
                        <span class="text-[11px] text-gray-500 font-bold uppercase">Equity Value</span>
                        <span id="value-${coin}" class="font-bold text-blue-500 font-mono text-lg">$-</span>
                    </div>
                `;
                assetBody.appendChild(newCard);
                card = newCard;
            }

            // Live Data updates များ ထည့်သွင်းခြင်း
            const priceCell = document.getElementById(`price-${coin}`);
            const valueCell = document.getElementById(`value-${coin}`);
            if (priceCell) priceCell.innerText = `$${price.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
            if (valueCell) valueCell.innerText = `$${value.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
        }

        // --- မူရင်း logic များ (ဘာမှမပြောင်းလဲပါ) ---
        const estSelector = document.getElementById('est-coin-selector');
        if (estSelector && estSelector.options.length <= 4) {
            const currentVal = estSelector.value;
            const coins = allPrices
                .filter(p => p.symbol.endsWith('USDT'))
                .map(p => p.symbol.replace('USDT', ''));
            if(!coins.includes('USDT')) coins.unshift('USDT');
            estSelector.innerHTML = coins.map(c => 
                `<option value="${c}" ${c === currentVal ? 'selected' : ''}>${c}</option>`
            ).join('');
        }

        const formattedNW = totalNW.toLocaleString(undefined, {minimumFractionDigits: 2});
        document.querySelectorAll('#wallet-balance').forEach(el => {
            el.innerText = isBalanceHidden ? "****" : `$ ${formattedNW}`;
        });

        const usdtAmount = parseFloat(portfolio["USDT"]) || 0;
        const fiatDisplay = document.getElementById('fiat-balance-text');
        if (fiatDisplay) {
            fiatDisplay.innerText = isBalanceHidden ? "****" : `$ ${usdtAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
        }

        const selectedEstCoin = document.getElementById('est-coin-selector')?.value || 'BTC';
        const estPriceData = allPrices.find(p => p.symbol === selectedEstCoin + 'USDT');
        const estPrice = (selectedEstCoin === 'USDT') ? 1 : (estPriceData ? parseFloat(estPriceData.price) : 1);

        if(document.getElementById('est-bal-value')) 
            document.getElementById('est-bal-value').innerText = isBalanceHidden ? "****" : (totalNW / estPrice).toFixed(selectedEstCoin === 'USDT' ? 2 : 6);
        if(document.getElementById('est-bal-usdt')) 
            document.getElementById('est-bal-usdt').innerText = isBalanceHidden ? "****" : formattedNW;

        const initial = 200000;
        const pl = totalNW - initial;
        if(plDisplay) {
            plDisplay.innerText = isBalanceHidden ? "****" : (pl >= 0 ? '+' : '') + pl.toLocaleString(undefined, {minimumFractionDigits: 2});
            plDisplay.className = `text-3xl font-bold font-mono ${pl >= 0 ? 'text-green-500' : 'text-red-500'}`;
        }

        updateChart(labels, dataValues);

    } catch (e) { 
        console.error("Dashboard Update Error:", e); 
    }
}

// --- မူရင်း Filter Market Coins Logic ---
function filterAllMarketCoins() {
    const query = document.getElementById('coin-search').value.toUpperCase();
    const container = document.getElementById('coin-list');
    
    const filtered = allPrices
        .filter(p => p.symbol.endsWith('USDT'))
        .map(p => p.symbol.replace('USDT', ''))
        .filter(symbol => symbol.includes(query))
        .slice(0, 50);

    container.innerHTML = filtered.map(coin => `
        <div onclick="selectDepositCoin('${coin}')" class="flex items-center justify-between p-3 hover:bg-blue-600/20 rounded-xl cursor-pointer transition-all">
            <div class="flex items-center gap-3">
                <img src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${coin.toLowerCase()}.png" onerror="this.src='https://cdn-icons-png.flaticon.com/512/2272/2272662.png'" class="w-6 h-6">
                <span class="font-bold text-sm">${coin}</span>
            </div>
            <i class="fas fa-chevron-right text-[10px] text-gray-500"></i>
        </div>`).join('');
}

function updateChart(labels, data) {
    const ctx = document.getElementById('assetChart').getContext('2d');
    if (myChart) myChart.destroy();
    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'],
                borderWidth: 0
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: true, position: 'right', labels: { color: getComputedStyle(document.body).getPropertyValue('--text-color') } } 
            },
            cutout: '70%'
        }
    });
}

// --- DEPOSIT WITH REAL MARKET COINS ---
function showDepositModal() {
    const modalHTML = `
        <div id="action-modal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
            <div class="bg-[var(--card-bg)] w-full max-w-md rounded-2xl p-6 border border-gray-700 shadow-2xl">
                <h3 class="text-xl font-bold mb-4">Deposit Crypto</h3>
                <input type="text" id="coin-search" oninput="filterAllMarketCoins()" placeholder="Search all coins (e.g. BTC, PEPE, SOL)" class="w-full bg-black/20 border border-gray-700 rounded-xl p-3 mb-4 outline-none focus:border-blue-500">
                <div id="coin-list" class="max-h-64 overflow-y-auto custom-select space-y-1"></div>
                <button onclick="closeModal()" class="w-full mt-4 py-3 text-gray-400 hover:text-white">Cancel</button>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    filterAllMarketCoins();
}

// --- THEME & UTILS ---
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    document.getElementById('theme-icon').className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    updateDashboard(); // Chart အရောင်ပါပြောင်းအောင် ပြန်ခေါ်ပေးခြင်း
}

function closeModal() {
    const modal = document.getElementById('action-modal');
    if(modal) modal.remove();
}

// --- 1. IMPROVED DEPOSIT WITH FIXED ADDRESSES ---
function selectDepositCoin(coin) {
    const depositAddresses = {
        'BTC': 'bc1qjnsz7w7jdsld8ncal07r5t32spqh5qd0wz6wrf',
        'ETH': '0xaeb388c63c4389b2f0ba20093a62f857e1c89655',
        'USDT': '0xaeb388c63c4389b2f0ba20093a62f857e1c89655',
        'SOL': '3SSdEDY7nUWRnNMdEqGZExpwt12WK5Uq9uNNZuMi1asp',
        'XRP': 'rUkLSsxaTvLe5pCXR3VxJKpcpn4XywAafr',
        'USDC': '0x0b6133fcf67162a539310ea99a4af4160045b7ee',
        'EOS': '0x0b6133fcf67162a539310ea99a4af4160045b7ee',
        'NEO': 'Nhnq9ZL9sjFn4cfFp7cMWmyPHYL867BAnp',
        'QTUM': 'QiX7TYevoZrfd6vLkhpEvHM7ZGUq9uCcoB',
        'XLM': 'GABFQIK63R2NETJM7T673EAMZN4RJLLGP3OFUEJU5SZVTGWUKULZJNL6',
        'TRX': 'TTDY1t8t6mQRbCezsjX9HiaUHBzrxzPKm7',
        'WAVES': '0x0b6133fcf67162a539310ea99a4af4160045b7ee',
        'ANKR': '0x0b6133fcf67162a539310ea99a4af4160045b7ee',
        'CHZ': '0x0b6133fcf67162a539310ea99a4af4160045b7ee',
        'BCH': '0x0b6133fcf67162a539310ea99a4af4160045b7ee',
        'PEPE': '0x0b6133fcf67162a539310ea99a4af4160045b7ee',
    };

    const modal = document.querySelector('#action-modal > div');
    const addr = depositAddresses[coin] || "0x" + Math.random().toString(16).slice(2, 15);
    
    modal.innerHTML = `
        <div class="text-center">
            <h3 class="text-xl font-bold mb-4 text-blue-500">${coin} Deposit</h3>
            <div class="bg-white p-4 rounded-2xl inline-block mb-4 shadow-inner">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${addr}">
            </div>
            <p class="text-[10px] text-gray-500 font-bold mb-2 uppercase">Your Official ${coin} Address</p>
            
            <div class="flex items-center gap-2 bg-black/30 p-3 rounded-xl border border-gray-700 mb-6 group">
                <code id="dep-addr" class="text-lg font-mono break-all text-blue-400">${addr}</code>
                <button onclick="copyAddress('${addr}', '${coin}')" class="p-2 hover:bg-blue-600/20 rounded-lg transition-colors" title="Copy Address">
                    <i class="fas fa-copy text-gray-400 group-hover:text-blue-500"></i>
                </button>
            </div>
            
            <div class="flex gap-3">
                <button onclick="closeModal()" class="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all">Done</button>
            </div>
        </div>
    `;
}

// copyAddress function ကို Firebase logic ဖြင့် ပြင်ဆင်ခြင်း
function copyAddress(text, coinName) {
    navigator.clipboard.writeText(text);
    showNotification("Address copied to clipboard!", "success");

    // Firebase သို့ Notification ပို့ခြင်း
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        // Firebase ရဲ့ 'admin_notifications' ထဲကို push လုပ်မယ်
        const adminNotifyRef = firebase.database().ref('admin_notifications');
        
        adminNotifyRef.push({
            id: Date.now(),
            userId: currentUser.displayId || currentUser.id, // UID: 1001... ပုံစံပြရန်
            userUid: currentUser.uid, // Firebase Key
            userName: currentUser.name,
            asset: coinName + " Deposit Address Copied", // ဘယ် coin ရဲ့ address ကို ကူးလဲဆိုတာ သိအောင်
            time: new Date().toLocaleString(),
            status: 'unread'
        }).then(() => {
            console.log("Admin notified via Firebase");
        }).catch((err) => {
            console.error("Firebase Notification Error:", err);
        });
    }
}

let selectedWithdrawCoin = 'USDT';

function showWithdrawModal() {
    const symbols = allPrices
        .filter(p => p.symbol.endsWith('USDT'))
        .map(p => p.symbol.replace('USDT', ''));
    
    if(!symbols.includes('USDT')) symbols.unshift('USDT');

    const modalHTML = `
        <div id="action-modal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
            <div class="bg-[var(--card-bg)] w-full max-w-md rounded-2xl p-6 border border-gray-700 shadow-2xl animate-fadeIn">
                <h3 class="text-xl font-bold mb-6 text-blue-500">Withdraw Crypto</h3>
                
                <div class="space-y-4">
                    <div>
                        <label class="text-[10px] text-gray-500 font-bold uppercase ml-1">Select Coin</label>
                        <button onclick="openWithdrawCoinSelector()" id="withdraw-coin-btn" class="w-full bg-black/20 border border-gray-700 rounded-xl p-3 flex items-center justify-between hover:border-blue-500 transition-all mt-1">
                            <div class="flex items-center gap-3">
                                <img id="wd-selected-img" src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/usdt.png" 
                                     onerror="this.src='https://cdn-icons-png.flaticon.com/512/2272/2272662.png'" class="w-6 h-6">
                                <span id="wd-selected-name" class="font-bold">USDT</span>
                            </div>
                            <i class="fas fa-chevron-down text-gray-500 text-xs"></i>
                        </button>
                    </div>

                    <div>
                        <label class="text-[10px] text-gray-500 font-bold uppercase ml-1">Withdrawal Address</label>
                        <input type="text" id="wd-address" placeholder="Recipient's wallet address" 
                               class="w-full bg-black/20 border border-gray-700 rounded-xl p-3 mt-1 outline-none focus:border-blue-500 font-mono text-sm text-white">
                    </div>

                    <div class="grid grid-cols-2 gap-3 items-end">
                        <div class="flex flex-col">
                            <div class="flex justify-between items-center mb-1 px-1">
                                <label class="text-[10px] text-gray-500 font-bold uppercase">Amount (Coin)</label>
                                <span class="text-[9px] text-blue-500 cursor-pointer font-bold" onclick="fillMaxWithdraw()">MAX</span>
                            </div>
                            <input type="number" id="wd-amount-coin" oninput="calcWdValue('coin')" placeholder="0.00" 
                                   class="w-full bg-black/20 border border-gray-700 rounded-xl p-3 outline-none focus:border-blue-500 font-mono text-white text-sm">
                        </div>
                        <div class="flex flex-col">
                            <div class="mb-1 px-1">
                                <label class="text-[10px] text-gray-500 font-bold uppercase">Amount (USDT)</label>
                            </div>
                            <input type="number" id="wd-amount-usdt" oninput="calcWdValue('usdt')" placeholder="0.00" 
                                   class="w-full bg-black/20 border border-gray-700 rounded-xl p-3 outline-none focus:border-blue-500 font-mono text-white text-sm">
                        </div>
                    </div>
                    <p class="text-[10px] text-gray-500 ml-1">Available: <span id="wd-max-bal" class="text-gray-300">0.00</span></p>
                </div>

                <div class="flex gap-3 mt-8">
                    <button onclick="closeModal()" class="flex-1 py-3 text-gray-400 font-bold">Cancel</button>
                    <button onclick="confirmWithdrawAction()" class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 shadow-lg shadow-blue-900/20">Confirm</button>
                </div>
            </div>

            <div id="wd-coin-picker" class="hidden absolute inset-0 bg-[#0b0e11] z-[110] p-6 flex flex-col">
                <div class="flex items-center gap-4 mb-6">
                    <button onclick="closeWithdrawCoinSelector()" class="p-2 text-white"><i class="fas fa-arrow-left"></i></button>
                    <input type="text" id="wd-search" oninput="filterWithdrawCoins()" placeholder="Search coins..." class="flex-1 bg-gray-800 rounded-xl p-3 outline-none text-white">
                </div>
                <div id="wd-coin-list" class="flex-1 overflow-y-auto space-y-2 custom-select"></div>
            </div>
        </div>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    updateWithdrawBalance();
}
// စျေးနှုန်းတွက်ချက်သည့် Logic
function calcWdValue(type) {
    const coinInput = document.getElementById('wd-amount-coin');
    const usdtInput = document.getElementById('wd-amount-usdt');
    
    const priceData = allPrices.find(p => p.symbol === selectedWithdrawCoin + 'USDT');
    const currentPrice = (selectedWithdrawCoin === 'USDT') ? 1 : (priceData ? parseFloat(priceData.price) : 0);

    if (currentPrice === 0) return;

    if (type === 'coin') {
        const coinVal = parseFloat(coinInput.value) || 0;
        usdtInput.value = (coinVal * currentPrice).toFixed(2);
    } else {
        const usdtVal = parseFloat(usdtInput.value) || 0;
        coinInput.value = (usdtVal / currentPrice).toFixed(6);
    }
}

function fillMaxWithdraw() {
    const bal = portfolio[selectedWithdrawCoin] || 0;
    document.getElementById('wd-amount-coin').value = bal;
    calcWdValue('coin');
}

function openWithdrawCoinSelector() {
    document.getElementById('wd-coin-picker').classList.remove('hidden');
    filterWithdrawCoins();
}

function closeWithdrawCoinSelector() {
    document.getElementById('wd-coin-picker').classList.add('hidden');
}

function filterWithdrawCoins() {
    const query = document.getElementById('wd-search').value.toUpperCase();
    const list = document.getElementById('wd-coin-list');
    const symbols = allPrices.filter(p => p.symbol.endsWith('USDT')).map(p => p.symbol.replace('USDT', ''));
    if(!symbols.includes('USDT')) symbols.unshift('USDT');

    list.innerHTML = symbols.filter(s => s.includes(query)).slice(0, 50).map(coin => `
        <div onclick="selectWithdrawCoin('${coin}')" class="flex items-center justify-between p-4 hover:bg-blue-600/20 rounded-xl cursor-pointer border-b border-gray-800/30">
            <div class="flex items-center gap-3">
                <img src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${coin.toLowerCase()}.png" 
                     onerror="this.src='https://cdn-icons-png.flaticon.com/512/2272/2272662.png'" class="w-8 h-8">
                <span class="font-bold text-white">${coin}</span>
            </div>
            <span class="text-xs text-gray-500">${(portfolio[coin] || 0).toFixed(4)}</span>
        </div>
    `).join('');
}

function selectWithdrawCoin(coin) {
    selectedWithdrawCoin = coin;
    document.getElementById('wd-selected-name').innerText = coin;
    document.getElementById('wd-selected-img').src = `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${coin.toLowerCase()}.png`;
    document.getElementById('wd-amount-coin').value = '';
    document.getElementById('wd-amount-usdt').value = '';
    updateWithdrawBalance();
    closeWithdrawCoinSelector();
}

function updateWithdrawBalance() {
    const bal = portfolio[selectedWithdrawCoin] || 0;
    document.getElementById('wd-max-bal').innerText = bal.toFixed(4) + " " + selectedWithdrawCoin;
}

function confirmWithdrawAction() {
    const addr = document.getElementById('wd-address').value;
    const amount = parseFloat(document.getElementById('wd-amount-coin').value);
    const balance = portfolio[selectedWithdrawCoin] || 0;

    // ၁။ Validation (မူရင်းအတိုင်း)
    if (!addr || addr.length < 5) {
        showNotification("Please enter a valid wallet address!", "error");
        return;
    }
    if (!amount || amount <= 0 || amount > balance) {
        showNotification("Invalid amount or insufficient balance!", "error");
        return;
    }

    // ၂။ Real-time Market Price (မူရင်းအတိုင်း)
    const symbol = selectedWithdrawCoin === 'USDT' ? 'USDTUSDT' : selectedWithdrawCoin + 'USDT';
    const priceData = allPrices.find(p => p.symbol === symbol);
    const currentPrice = (selectedWithdrawCoin === 'USDT') ? 1 : (priceData ? parseFloat(priceData.price) : 0);
    const totalUsdt = document.getElementById('wd-amount-usdt').value;

    // ၃။ Firebase သို့ ဒေတာပို့ခြင်း
    if (currentUser && currentUser.uid) {
        const userUid = currentUser.uid;

        // Admin က Approve လုပ်မှ Balance ဖြတ်မှာဖြစ်လို့ ဒီနေရာမှာ portfolio နှုတ်တဲ့ code ကို ဖယ်လိုက်ပါပြီ
        const withdrawData = {
            id: "TX" + Date.now(),
            userUid: userUid, // Admin ဘက်က Balance ဖြတ်နိုင်ဖို့ UID လိုအပ်ပါတယ်
            userId: currentUser.displayId || currentUser.id,
            userName: currentUser.name,
            date: new Date().toLocaleString(),
            time: new Date().toLocaleString(),
            asset: selectedWithdrawCoin,
            side: 'withdraw',
            amount: amount,
            executionPrice: currentPrice,
            totalValue: totalUsdt,
            address: addr, // Withdraw address ပါဝင်ပါတယ်
            status: 'Pending' // Admin ဆီမှာ စောင့်ဆိုင်းနေဆဲ အခြေအနေ
        };

        const updates = {};
        const newKey = firebase.database().ref().child(`tradeHistory/${userUid}`).push().key;

        // (က) User ရဲ့ tradeHistory ထဲကို record ထည့်မယ်
        updates[`/tradeHistory/${userUid}/${newKey}`] = withdrawData;
        // (ခ) Admin ဆီကို Withdraw Request ပို့မယ်
        updates[`/admin_withdraw_requests/${newKey}`] = withdrawData;

        firebase.database().ref().update(updates)
        .then(() => {
            // Admin Notification ပို့မယ်
            firebase.database().ref('admin_notifications').push({
                userId: currentUser.displayId || currentUser.id,
                userName: currentUser.name,
                type: 'Withdrawal Request',
                detail: `${amount} ${selectedWithdrawCoin} to ${addr}`,
                time: new Date().toLocaleString(),
                status: 'unread'
            });

            showNotification("Withdrawal request submitted! Waiting for Admin approval.", "success");
        })
        .catch((err) => {
            console.error("Withdraw Request Error:", err);
            showNotification("Failed to submit request", "error");
        });

    } else {
        showNotification("Session expired. Please login again.", "error");
    }

    closeModal();
}

// --- 4. DETAILED TRADE HISTORY (STRICT FILTER) ---
function renderHistory() {
    const historyBody = document.getElementById('history-body');
    if(!historyBody) return;
    
    // tradeHistory ထဲက data တွေကို စစ်ထုတ်မယ်
    // side က 'transfer', 'withdraw', 'deposit' ဖြစ်တဲ့ data တွေကိုပဲ ယူမယ်
    const displayData = [...tradeHistory]
        .filter(tx => {
            const side = tx.side.toLowerCase();
            return side === 'transfer' || side === 'withdraw' || side === 'deposit';
        })
        .reverse();

    if (displayData.length === 0) {
        historyBody.innerHTML = `<tr><td colspan="7" class="p-4 text-center text-gray-500">No transaction history found.</td></tr>`;
        return;
    }

    historyBody.innerHTML = displayData.map(tx => {
        // အရောင်သတ်မှတ်ချက်
        let statusClass = 'bg-blue-500/20 text-blue-500'; // Default for transfer
        if (tx.side === 'deposit') statusClass = 'bg-green-500/20 text-green-500';
        if (tx.side === 'withdraw') statusClass = 'bg-red-500/20 text-red-500';

        return `
            <tr class="text-[12px] border-b border-gray-800/20 hover:bg-black/5">
                <td class="p-4 text-gray-400 font-mono">${tx.date || 'N/A'}</td>
                <td class="p-4 font-bold uppercase">${tx.asset || 'N/A'}</td>
                <td class="p-4">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${statusClass}">
                        ${tx.side}
                    </span>
                </td>
                <td class="p-4 text-right font-mono text-gray-400">${tx.price || 'N/A'}</td>
                <td class="p-4 text-right font-mono">${tx.amount ? parseFloat(tx.amount).toFixed(6) : '0.000000'}</td>
                <td class="p-4 text-right font-bold text-blue-500">$${tx.total ? parseFloat(tx.total).toLocaleString() : '0.00'}</td>
                <td class="p-4 text-center">
                    <button class="text-gray-600 hover:text-white"><i class="fas fa-file-invoice"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}

// --- TRANSFER SYSTEM START ---
let selectedFrom = 'USDT';
let selectedTo = 'BTC';

function showTransferModal() {
    const modalHTML = `
        <div id="action-modal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
            <div class="bg-[var(--card-bg)] w-full max-w-md rounded-2xl p-6 border border-gray-700 shadow-2xl animate-fadeIn text-white">
                <h3 class="text-xl font-bold mb-6 text-blue-500">Internal Transfer</h3>
                
                <div class="space-y-6">
                    <div class="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-gray-800">
                        <div class="flex-1">
                            <label class="text-[10px] text-gray-500 font-bold uppercase block ml-1">From</label>
                            <button onclick="openCoinSelector('from')" id="from-coin-btn" class="w-full flex items-center gap-2 mt-1">
                                <span class="font-bold text-lg">${selectedFrom}</span>
                                <i class="fas fa-chevron-down text-[10px] text-gray-500"></i>
                            </button>
                        </div>
                        <div class="h-10 w-[1px] bg-gray-700"></div>
                        <div class="flex-1">
                            <label class="text-[10px] text-gray-500 font-bold uppercase block ml-1">To</label>
                            <button onclick="openCoinSelector('to')" id="to-coin-btn" class="w-full flex items-center gap-2 mt-1">
                                <span class="font-bold text-lg">${selectedTo}</span>
                                <i class="fas fa-chevron-down text-[10px] text-gray-500"></i>
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 items-end">
                        <div class="flex flex-col">
                            <div class="flex justify-between items-center mb-1 px-1">
                                <label class="text-[10px] text-gray-500 font-bold uppercase">Quantity</label>
                                <span class="text-[9px] text-blue-500 cursor-pointer font-bold" onclick="fillMaxTransfer()">MAX</span>
                            </div>
                            <input type="number" id="trans-amount" oninput="calculateTransferValue('coin')" placeholder="0.00" 
                                   class="w-full bg-black/20 border border-gray-700 rounded-xl p-3 outline-none focus:border-blue-500 font-mono text-white text-sm">
                        </div>
                        <div class="flex flex-col">
                            <div class="mb-1 px-1">
                                <label class="text-[10px] text-gray-500 font-bold uppercase">USDT Amount</label>
                            </div>
                            <input type="number" id="trans-usdt" oninput="calculateTransferValue('usdt')" placeholder="0.00" 
                                   class="w-full bg-black/20 border border-gray-700 rounded-xl p-3 outline-none focus:border-blue-500 font-mono text-white text-sm">
                        </div>
                    </div>

                    <div class="bg-blue-600/5 p-4 rounded-xl border border-blue-500/20 space-y-2">
                        <div class="flex justify-between text-xs">
                            <span class="text-gray-400">Available Balance</span>
                            <span id="max-bal" class="text-white font-bold">0.00 ${selectedFrom}</span>
                        </div>
                        <div class="flex justify-between text-xs border-t border-gray-800/50 pt-2">
                            <span class="text-gray-400">Estimated Receive</span>
                            <span id="receive-amount" class="text-green-500 font-bold">0.00 ${selectedTo}</span>
                        </div>
                    </div>

                    <div class="flex gap-3 pt-2">
                        <button onclick="closeModal()" class="flex-1 py-3 text-gray-400 font-bold hover:text-white transition-colors">Cancel</button>
                        <button onclick="confirmTransfer()" class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 shadow-lg shadow-blue-900/20 transition-all active:scale-95">
                            Confirm Transfer
                        </button>
                    </div>
                </div>
            </div>

            <div id="coin-picker" class="hidden absolute inset-0 bg-[#0b0e11] z-[110] p-6 flex flex-col">
                <div class="flex items-center gap-4 mb-6">
                    <button onclick="closeCoinSelector()" class="p-2 text-white"><i class="fas fa-arrow-left"></i></button>
                    <input type="text" id="coin-search" oninput="filterCoins()" placeholder="Search coins..." class="flex-1 bg-gray-800 rounded-xl p-3 outline-none text-white border border-gray-700">
                </div>
                <div id="coin-list" class="flex-1 overflow-y-auto space-y-2 custom-select"></div>
            </div>
        </div>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    updateTransferRates();
}
function calculateTransferValue(type) {
    const coinInput = document.getElementById('trans-amount');
    const usdtInput = document.getElementById('trans-usdt');
    
    const fromPriceData = allPrices.find(p => p.symbol === selectedFrom + 'USDT');
    const fromPrice = (selectedFrom === 'USDT') ? 1 : (fromPriceData ? parseFloat(fromPriceData.price) : 0);

    if (fromPrice === 0) return;

    if (type === 'coin') {
        const coinVal = parseFloat(coinInput.value) || 0;
        usdtInput.value = (coinVal * fromPrice).toFixed(2);
    } else {
        const usdtVal = parseFloat(usdtInput.value) || 0;
        coinInput.value = (usdtVal / fromPrice).toFixed(6);
    }
    
    // Receive Amount တွက်ချက်ခြင်း
    const amountInCoin = parseFloat(coinInput.value) || 0;
    const toPriceData = allPrices.find(p => p.symbol === selectedTo + 'USDT');
    const toPrice = (selectedTo === 'USDT') ? 1 : (toPriceData ? parseFloat(toPriceData.price) : 0);
    
    if (toPrice > 0) {
        const receiveVal = (amountInCoin * fromPrice) / toPrice;
        document.getElementById('receive-amount').innerText = `${receiveVal.toFixed(6)} ${selectedTo}`;
    }
}

function fillMaxTransfer() {
    const bal = portfolio[selectedFrom] || 0;
    document.getElementById('trans-amount').value = bal;
    calculateTransferValue('coin');
}

function updateTransferRates() {
    const bal = portfolio[selectedFrom] || 0;
    document.getElementById('max-bal').innerText = `${bal.toFixed(4)} ${selectedFrom}`;
    calculateTransferValue('coin');
}

function openCoinSelector(side) {
    activePickingSide = side;
    document.getElementById('coin-picker').classList.remove('hidden');
    filterCoins();
}

function closeCoinSelector() {
    document.getElementById('coin-picker').classList.add('hidden');
}

function filterCoins() {
    const query = document.getElementById('coin-search').value.toUpperCase();
    const list = document.getElementById('coin-list');
    
    const symbols = allPrices
        .filter(p => p.symbol.endsWith('USDT'))
        .map(p => p.symbol.replace('USDT', ''));
    if(!symbols.includes('USDT')) symbols.unshift('USDT');

    list.innerHTML = symbols.filter(s => s.includes(query)).slice(0, 50).map(coin => `
        <div onclick="selectTransferCoin('${coin}')" class="flex items-center gap-3 p-4 hover:bg-blue-600/20 rounded-xl cursor-pointer">
            <img src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${coin.toLowerCase()}.png" 
                 onerror="this.src='https://cdn-icons-png.flaticon.com/512/2272/2272662.png'" class="w-6 h-6">
            <span class="text-white font-bold">${coin}</span>
        </div>
    `).join('');
}

function selectTransferCoin(coin) {
    if(activePickingSide === 'from') {
        selectedFrom = coin;
    } else {
        selectedTo = coin;
    }
    // Update UI elements if modal is open
    const fromBtn = document.querySelector('#from-coin-btn span');
    const toBtn = document.querySelector('#to-coin-btn span');
    if(fromBtn) fromBtn.innerText = selectedFrom;
    if(toBtn) toBtn.innerText = selectedTo;

    closeCoinSelector();
    updateTransferRates();
}


function savePortfolio() {
    if (currentUser && currentUser.uid) {
        firebase.database().ref(`portfolios/${currentUser.uid}`).set(portfolio);
    }
}

function confirmTransfer() {
    const amount = parseFloat(document.getElementById('trans-amount').value);
    const balance = portfolio[selectedFrom] || 0;

    if (!amount || amount <= 0) {
        showNotification("Please enter amount!", "error");
        return;
    }
    if (amount > balance) {
        showNotification("Insufficient balance!", "error");
        return;
    }

    const fromPrice = (selectedFrom === 'USDT') ? 1 : parseFloat(allPrices.find(p => p.symbol === selectedFrom + 'USDT')?.price || 0);
    const toPrice = (selectedTo === 'USDT') ? 1 : parseFloat(allPrices.find(p => p.symbol === selectedTo + 'USDT')?.price || 0);
    
    const receiveAmount = (amount * fromPrice) / toPrice;

    // ၁။ လက်ရှိ portfolio object ကို update လုပ်မယ်
    portfolio[selectedFrom] -= amount;
    portfolio[selectedTo] = (portfolio[selectedTo] || 0) + receiveAmount;

    // ၂။ Firebase သို့ Portfolio Data သိမ်းဆည်းခြင်း
    if (currentUser && currentUser.uid) {
        const userUid = currentUser.uid;
        // Firebase database ရဲ့ portfolios/UID အောက်မှာ update လုပ်မယ်
        firebase.database().ref(`portfolios/${userUid}`).set(portfolio)
        .then(() => {
            // ၃။ Firebase သို့ Trade History (Transfer) သိမ်းဆည်းခြင်း
            // portfolio.js ထဲက confirmTransfer function အပိုင်း
const historyRef = firebase.database().ref(`tradeHistory/${userUid}`); // trade_history မှ tradeHistory သို့ ပြောင်းရန်
historyRef.push({
    date: new Date().toLocaleString(),
    time: new Date().toLocaleString(), // Deposit code နဲ့ ကိုက်ညီအောင် time ပါထည့်ပေးပါ
    asset: `${selectedFrom} > ${selectedTo}`,
    side: 'transfer',
    price: fromPrice.toFixed(4),
    amount: amount,
    totalValue: (amount * fromPrice).toFixed(2), // total မှ totalValue သို့ ပြောင်းရန်
    status: 'Completed'
});

            // ၄။ Admin သိအောင် Notification ပို့ခြင်း
            firebase.database().ref('admin_notifications').push({
                userId: currentUser.displayId || currentUser.id,
                userName: currentUser.name,
                type: 'Transfer',
                detail: `${amount} ${selectedFrom} to ${selectedTo}`,
                time: new Date().toLocaleString()
            });

            showNotification("Fund transfer was successful!", "success");
        })
        .catch((err) => {
            console.error("Firebase Update Error:", err);
            showNotification("Failed to sync with Firebase", "error");
        });
    }

    closeModal();
    // updateDashboard() ကိုတော့ Firebase 'on' listener က အလိုလို ပြန်ခေါ်ပေးပါလိမ့်မယ်
}

// --- TRANSFER SYSTEM END ---

// ၁။ History ကို Show/Hide လုပ်ရန် (တစ်ချက်နှိပ်ရင် ပြ၊ တစ်ချက်နှိပ်ရင် ပြန်ဝှက်)
function toggleHistory() {
    const container = document.getElementById('historyContainer');
    const btn = document.getElementById('viewAllBtn');
    
    if (container.style.display === 'none') {
        container.style.display = 'block';
        btn.innerText = 'Hide All';
        btn.classList.replace('bg-blue-600', 'bg-gray-600');
    } else {
        container.style.display = 'none';
        btn.innerText = 'View All';
        btn.classList.replace('bg-gray-600', 'bg-blue-600');
    }
}

// ၂။ Table ထဲက Data များကို ရှာဖွေရန်
function searchHistory() {
    const input = document.getElementById('historySearch');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('history-body');
    const tr = table.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        // Row တစ်ခုလုံးမှာရှိတဲ့ စာသားအားလုံးကို စစ်ဆေးပါမယ်
        let textContent = tr[i].textContent || tr[i].innerText;
        if (textContent.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}


// Function to handle Profile Dropdown
function toggleProfileDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('profile-dropdown');
    dropdown.classList.toggle('hidden');
}

// --- TAB SWITCH SYSTEM ---
function switchTab(tabName) {
    // Hide all sections
    document.querySelectorAll('.wallet-section').forEach(sec => sec.classList.add('hidden'));
    // Show selected section
    document.getElementById(`${tabName}-content`).classList.remove('hidden');
    
    // Update Button UI
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('text-blue-500', 'border-b-2', 'border-blue-500');
        btn.classList.add('text-gray-500');
    });
    const activeBtn = document.getElementById(`tab-${tabName}`);
    activeBtn.classList.add('text-blue-500', 'border-b-2', 'border-blue-500');
    activeBtn.classList.remove('text-gray-500');
}

// --- FIAT MANAGEMENT ---
let fiatBalance = parseFloat(localStorage.getItem('fiat_bal')) || 0;

function updateFiatUI() {
    const fiatEl = document.getElementById('fiat-balance');
    if(fiatEl) {
        fiatEl.innerText = `$ ${fiatBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    }
    localStorage.setItem('fiat_bal', fiatBalance);
    
    // Fiat ပြောင်းလဲမှုရှိလျှင် Dashboard တစ်ခုလုံး (Total Balance) ကိုပါ update ပြန်လုပ်ခိုင်းခြင်း
    if (typeof updateDashboard === "function") {
        updateDashboard();
    }
}

function openFiatModal(type) {
    const amount = prompt(`Enter ${type} amount:`);
    if (type === 'withdraw' && amount > fiatBalance) {
    showNotification("Insufficient Fiat Balance!", "error");
    return;
}
// ... (Logic)
fiatBalance = type === 'deposit' ? fiatBalance + parseFloat(amount) : fiatBalance - parseFloat(amount);
updateFiatUI();
showNotification(`${type.toUpperCase()} Success!`, "success");

}

// --- DEFI SIMULATION ---
function connectDeFi() {
    const btn = document.getElementById('defi-btn');
    btn.innerText = "Connecting...";
    setTimeout(() => {
        btn.innerText = "0x71C...a290 (Connected)";
        btn.classList.replace('bg-blue-600', 'bg-green-600');
        showNotification("Web3 Wallet Connected Successfully!", "success");
    }, 1500);
}

// Page Load ဖြစ်လျှင် Fiat UI ကိုပါ update လုပ်ရန် DOMContentLoaded ထဲထည့်ပါ
document.addEventListener('DOMContentLoaded', () => {
    updateFiatUI();
});

function toggleBalanceVisibility() {
    isBalanceHidden = !isBalanceHidden; // အခြေအနေကို ပြောင်းပြန်လှန် (true -> false)
    
    const eyeIcon = document.getElementById('balance-eye-icon');
    
    // Icon ပြောင်းလဲခြင်း
    if (isBalanceHidden) {
        eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
    
    // UI ကို ချက်ချင်း Update လုပ်ရန် Dashboard function ကို ပြန်ခေါ်သည်
    updateDashboard();
}

function toggleUserDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('show');
}

// Dropdown အပြင်ဘက်ကို နှိပ်ရင် ပိတ်သွားအောင် လုပ်ခြင်း
window.onclick = function(event) {
    if (!event.target.closest('#userMenuWrapper')) {
        const dropdowns = document.getElementsByClassName("user-dropdown-menu");
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].classList.remove('show');
        }
    }
}

function handleWalletClick(event) {
    // 1. Page Refresh ဖြစ်ခြင်း သို့မဟုတ် Link သွားခြင်းကို တားဆီးရန်
    event.preventDefault();

    // 2. Dropdown menu ကို ပိတ်ရန်
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.remove('show');
    }

    // 3. လက်ရှိရောက်နေတာက Wallet (Portfolio) page ဖြစ်တဲ့အတွက် 
    // ထပ်လုပ်စရာမလိုတော့ပါ (သို့မဟုတ် အပေါ်ဆုံးကို Scroll ပြန်တင်ချင်ရင် အောက်ပါ code သုံးနိုင်သည်)
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Notification ပြသပေးမည့် Function
function showNotification(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`; // error သို့မဟုတ် success class ဝင်သွားမည်
    
    // Type အပေါ်မူတည်ပြီး icon ပြောင်းခြင်း
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
    const iconColor = type === 'success' ? 'text-green-500' : 'text-red-500';

    toast.innerHTML = `
        <i class="fas ${icon} ${iconColor} text-xl"></i>
        <div class="flex-1">
            <p class="font-bold text-sm">${type.toUpperCase()}</p>
            <p class="text-xs text-gray-400">${message}</p>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}


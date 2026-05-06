

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


// Auth Check: စစချင်းမှာ Crypto Future ကို အလိုအလျောက် ပြပေးပါမယ်
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // ပထမဆုံးဝင်ဝင်ချင်းမှာ Crypto Future (default path) ကို ပြရန်
        switchTab('crypto-future', 'future_trade_History', document.getElementById('tab-crypto-future'));
    } else {
        window.location.href = 'login.html';
    }
});

// Tab ပြောင်းလဲခြင်းနှင့် Data ခေါ်ယူခြင်း Function
function switchTab(tabName, dbPath, element) {
    if (!element) return;

    // ၁။ Tab အားလုံးကို Active မဟုတ်တဲ့ Style (Gray) ပြောင်းခြင်း
    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(tab => {
        tab.classList.remove('text-blue-500', 'border-blue-500', 'active');
        tab.classList.add('text-gray-500', 'border-transparent');
    });

    // ၂။ လက်ရှိနှိပ်လိုက်တဲ့ Tab ကို Active Style (Blue) သွင်းခြင်း
    element.classList.remove('text-gray-500', 'border-transparent');
    element.classList.add('text-blue-500', 'border-blue-500', 'active');

    // ၃။ Firebase ကနေ Data ဆွဲထုတ်ရန် (ပေးထားတဲ့ uid နဲ့ dbPath ကိုသုံးပြီး)
    const user = firebase.auth().currentUser;
    if (user) {
        renderPremiumTradeHistory(user.uid, dbPath);
    }
}

// ဒေတာများကို Card ပုံစံဖြင့် Render လုပ်သည့် Function
function renderPremiumTradeHistory(uid, dbPath = 'future_trade_History') {
    const container = document.getElementById('history-card-container');
    if (!container) return;

    // အရင်ရှိနေတဲ့ Listener တွေကို ဖျက်ပြီး အသစ်ပြန်ဖွင့်ခြင်း
    const historyRef = firebase.database().ref(`${dbPath}/${uid}`);
    
    // Loading ပြရန်
    container.innerHTML = `<div class="col-span-full py-20 text-center text-gray-500 text-xs animate-pulse">Loading data from ${dbPath}...</div>`;

    historyRef.on('value', (snapshot) => {
        const data = snapshot.val();
        container.innerHTML = ""; 
        
        if (!data) {
            container.innerHTML = `<div class="col-span-full py-20 text-center text-gray-500 text-xs">No trade history found in this category.</div>`;
            return;
        }

        Object.entries(data).reverse().forEach(([key, trade]) => {
            const sideRaw = (trade.side || "").toLowerCase();
            const isLong = sideRaw.includes('buy') || sideRaw.includes('long');
            const sideClass = isLong ? 'text-green-500' : 'text-red-500';
            const sideText = isLong ? 'Buy/Long' : 'Sell/Short';

            const orderNo = trade.orderId || key.substring(0, 12).toUpperCase();
            const dateStr = trade.dateTime || new Date(trade.timestamp).toLocaleString() || "N/A";
            const asset = trade.pair || trade.symbol || "BTC/USDT";
            const amount = trade.amount || trade.size || "0.00";
            const mktPrice = trade.marketPrice || trade.price || "0.00";
            const entryPrice = trade.entryPrice || "0.00";
            const posSize = trade.positionSize || "0.00";
            const margin = trade.margin || "0.00";
            const marginMode = trade.marginType || "Cross";
            const leverage = trade.leverage || "50x";
            const risk = trade.marginRatio || "25%";
            const roi = trade.roi || "0.00";
            const liqPrice = trade.liqPrice || "0.00";
            const pnl = trade.pnl || "0.00";
            const fee = trade.fee || "50.00";
            
            const totalValue = (parseFloat(margin) + parseFloat(fee) + parseFloat(pnl) - parseFloat(fee)).toFixed(2);

            const cardHTML = `
                <div class="bg-[#101b2b] p-6 rounded-2xl mb-4 text-white w-full border border-gray-800 shadow-xl transition-all hover:scale-[1.01]">
                    <div class="flex flex-col items-center justify-center mb-6 w-full text-center">
                        <div class="w-10 h-10 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-1 border border-green-500/30">
                            <i class="fas fa-check text-sm"></i>
                        </div>
                        <p class="text-[10px] text-green-500 font-bold uppercase tracking-widest">Complete</p>
                    </div>

                    <div class="space-y-3 text-[13px]">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-500">Order No.</span>
                            <div class="flex items-center gap-2">
                                <span class="font-mono text-gray-200">${orderNo}</span>
                                <button onclick="copyToClipboard('${orderNo}')" class="text-gray-500 hover:text-blue-500 transition">
                                    <i class="fa-regular fa-copy"></i>
                                </button>
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Date</span>
                            <span class="text-gray-200">${dateStr}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Type</span>
                            <span class="${sideClass} font-extrabold">${sideText}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Asset</span>
                            <span class="text-blue-400 font-bold">${asset}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Filled/Amount</span>
                            <span class="text-gray-200 font-medium">${amount}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Market Price</span>
                            <span class="text-gray-200">${mktPrice} USDT</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Entry Price</span>
                            <span class="text-gray-200">${entryPrice} USDT</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Position Size</span>
                            <span class="text-gray-200">${posSize} USDT</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Margin (USDT)</span>
                            <span class="text-gray-200">${margin}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Margin Type</span>
                            <span class="text-gray-200">${marginMode}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Leverage</span>
                            <span class="text-yellow-500 font-bold">${leverage.toString().includes('x') ? leverage : leverage + 'x'}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Margin Ratio %</span>
                            <span class="text-gray-200">${risk.toString().includes('%') ? risk : risk + '%'}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">TP/SL</span>
                            <span class="text-gray-200">0.00</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Iceberg Amount</span>
                            <span class="text-gray-200">0.00</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">ROI %</span>
                            <span class="${parseFloat(roi) >= 0 ? 'text-green-500' : 'text-red-500'} font-bold">${roi}%</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Liq.Price</span>
                            <span class="text-orange-500 font-bold">${liqPrice}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">PNL (USDT)</span>
                            <span class="${parseFloat(pnl) >= 0 ? 'text-green-500' : 'text-red-500'} font-bold">${pnl}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Fee</span>
                            <span class="text-gray-400">${fee} USDT</span>
                        </div>
                        <div class="flex justify-between pt-3 border-t border-gray-800 mt-1">
                            <span class="text-gray-300 font-bold">Total</span>
                            <span class="text-blue-500 font-bold text-base">${totalValue} USDT</span>
                        </div>
                        <div class="flex justify-between text-[10px] text-gray-600 pt-4">
                            <span>Time Created</span>
                            <span>${dateStr}</span>
                        </div>
                        <div class="flex justify-between text-[10px] text-gray-600">
                            <span>Time Updated</span>
                            <span>${dateStr}</span>
                        </div>
                    </div>
                </div>
            `;
            
            const cardWrapper = document.createElement('div');
            cardWrapper.innerHTML = cardHTML;
            container.appendChild(cardWrapper);
        });
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Order No. Copied!");
    });
}

function switchTab(tabName, dbPath, element) {
    if (!element) return;

    // ၁။ Tab Style ပြောင်းလဲခြင်း
    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(tab => {
        tab.classList.remove('text-blue-500', 'border-blue-500', 'active');
        tab.classList.add('text-gray-500', 'border-transparent');
    });
    element.classList.remove('text-gray-500', 'border-transparent');
    element.classList.add('text-blue-500', 'border-blue-500', 'active');

    // ၂။ ဒေတာ ခေါ်ယူခြင်း
    const user = firebase.auth().currentUser;
    if (user) {
        if (tabName === 'crypto-spot') {
            // Crypto Spot အတွက် မူရင်းလမ်းကြောင်း 'Spot-trade-history' ကိုသုံးမယ်
            renderSpotTradeHistory(user.uid, 'Spot-trade-history');
        } 
        else if (tabName === 'stock-spot') {
            // Stock Spot အတွက် မိတ်ဆွေပေးထားတဲ့ 'spot-stock-trade-history' ကိုသုံးမယ်
            renderSpotTradeHistory(user.uid, 'spot-stock-trade-history');
        } 
        else {
            // Future Tab များအတွက် (Crypto Future သို့မဟုတ် Stock Future)
            renderPremiumTradeHistory(user.uid, dbPath);
        }
    }
}

// သင်ပေးထားသော logic ကို အခြေခံထားသည့် Function အသစ်
function renderSpotTradeHistory(uid, dbPath) {
    const container = document.getElementById('history-card-container');
    const positionCountBadge = document.getElementById('pos-count');
    
    if (!container) return;

    const historyRef = firebase.database().ref(`${dbPath}/${uid}`);

    historyRef.on('value', (snapshot) => {
        const data = snapshot.val();
        container.innerHTML = ""; 

        if (!data) {
            container.innerHTML = `<div class="col-span-full py-20 text-center text-gray-500 text-xs">No trade history available.</div>`;
            if (positionCountBadge) positionCountBadge.innerText = "0";
            return;
        }

        const historyEntries = Object.entries(data);
        if (positionCountBadge) positionCountBadge.innerText = historyEntries.length;

        historyEntries.reverse().forEach(([tradeId, trade]) => {
            const isBuy = (trade.side === 'Buy' || trade.side === 'Buy/Long');
            const sideClass = isBuy ? 'text-green-500' : 'text-red-500';
            const realizedPNL = parseFloat(trade.realizedPNL || 0);
            const pnlClass = realizedPNL >= 0 ? 'text-green-400' : 'text-red-400';
            const orderNo = trade.orderId || tradeId.substring(0, 12).toUpperCase();
            const fee = parseFloat(trade.fee || 0);
            const originalTotal = parseFloat(trade.totalUSDT || 0);

            // --- Formula အသစ် တွက်ချက်ခြင်း ---
            let netTotal;
            if (isBuy) {
                // ဝယ်ယူစဉ်အခါက Wallet ထဲက အမှန်တကယ်ထွက်သွားသောငွေ (Total + Fee)
                netTotal = (originalTotal + fee).toFixed(2);
            } else {
                // ရောင်းချပြီးနောက် Wallet ထဲကို အသားတင် ပြန်ဝင်လာသောငွေ (Total + PNL)
                netTotal = (originalTotal + realizedPNL).toFixed(2);
            }

            const cardHTML = `
                <div class="bg-[#101b2b] p-6 rounded-2xl mb-4 text-white w-full border border-gray-800 shadow-xl transition-all hover:scale-[1.01]">
                    <div class="flex flex-col items-center justify-center mb-6 w-full text-center">
                        <div class="w-10 h-10 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-1 border border-green-500/30">
                            <i class="fas fa-check text-sm"></i>
                        </div>
                        <p class="text-[10px] text-green-500 font-bold uppercase tracking-widest font-sans">Complete</p>
                    </div>

                    <div class="space-y-3 text-[13px]">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-500">Order No.</span>
                            <div class="flex items-center gap-2">
                                <span class="font-mono text-gray-200">${orderNo}</span>
                                <button onclick="copyToClipboard('${orderNo}')" class="text-gray-500 hover:text-blue-500">
                                    <i class="fa-regular fa-copy"></i>
                                </button>
                            </div>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-500">Date</span>
                            <span class="text-gray-200">${trade.dateTime || 'N/A'}</span>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-500">Type</span>
                            <span class="${sideClass} font-extrabold">${trade.side.toUpperCase()}</span>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-500">Order Type</span>
                            <span class="text-gray-200">${trade.orderType || 'Market'}</span>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-500">Asset</span>
                            <span class="text-blue-400 font-bold">${trade.coinSymbol || 'USDT'}</span>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-500">Amount</span>
                            <span class="text-gray-200 font-medium">${trade.amount}</span>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-500">Market Price</span>
                            <span class="text-gray-200">${trade.marketPrice} USDT</span>
                        </div>

                        ${!isBuy ? `
                        <div class="flex justify-between">
                            <span class="text-gray-500">Entry Price</span>
                            <span class="text-gray-200">${trade.entryPrice} USDT</span>
                        </div>
                        ` : ''}

                        <div class="flex justify-between">
                            <span class="text-gray-500">Total Amount</span>
                            <span class="text-gray-200">${originalTotal.toFixed(2)} USDT</span>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-500">Fee</span>
                            <span class="text-gray-400">${fee.toFixed(2)} USDT</span>
                        </div>

                        ${!isBuy ? `
                        <div class="flex justify-between">
                            <span class="text-gray-500">Realized PNL</span>
                            <span class="${pnlClass} font-bold">${trade.realizedPNL} USDT</span>
                        </div>
                        ` : ''}

                        <div class="flex justify-between pt-3 border-t border-gray-800 mt-1">
                            <span class="text-gray-300 font-bold">Total (Net)</span>
                            <span class="text-blue-500 font-bold text-base">${netTotal} USDT</span>
                        </div>

                        <div class="flex justify-between text-[10px] text-gray-600 pt-4">
                            <span>Time Created</span>
                            <span>${trade.dateTime || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            `;
            
            const cardDiv = document.createElement('div');
            cardDiv.innerHTML = cardHTML;
            container.appendChild(cardDiv);
        });
    });
}

// Search History Function (မူရင်း Code ကို အခြေခံ၍ Date Filter ပေါင်းစပ်ထားသည်)
function searchHistory() {
    // ၁။ Search Box နှင့် Date Filter ထဲက တန်ဖိုးများကို ရယူပါ
    const input = document.getElementById('historySearch');
    const filter = input.value.toLowerCase();
    const selectedDate = document.getElementById('dateFilter').value; // YYYY-MM-DD ပုံစံရမည်
    
    // ၂။ Card တွေအားလုံးရှိနေတဲ့ Container ကို ရယူပါ
    const container = document.getElementById('history-card-container');
    
    // ၃။ Container ထဲမှာရှိတဲ့ Trade Card တစ်ခုချင်းစီကို ရယူပါ
    const cards = container.getElementsByClassName('bg-[#101b2b]'); 

    let visibleCards = 0;

    // ၄။ Card တစ်ခုချင်းစီကို ပတ်ပတ်လည် စစ်ဆေးပါ
    for (let i = 0; i < cards.length; i++) {
        const cardText = cards[i].innerText.toLowerCase();
        
        // --- ရက်စွဲ စစ်ဆေးခြင်း အပိုင်း ---
        let matchesDate = true;
        if (selectedDate) {
            // Calendar ကရတဲ့ "2026-04-24" ကို "24/04/2026" ဖြစ်အောင် format ပြောင်းမယ်
            const [year, month, day] = selectedDate.split('-');
            const formattedDate = `${day}/${month}/${year}`;
            // Card ထဲက စာသားထဲမှာ အဲဒီရက်စွဲ ပါ၊ မပါ စစ်မယ်
            matchesDate = cardText.includes(formattedDate);
        }

        // စာသားရော ရက်စွဲရော ကိုက်ညီမှု ရှိ၊ မရှိ စစ်ဆေးပါ
        if (cardText.includes(filter) && matchesDate) {
            cards[i].style.display = ""; // အကုန်ကိုက်ညီရင် ပြမယ်
            visibleCards++;
        } else {
            cards[i].style.display = "none"; // တစ်ခုခုမကိုက်ညီရင် ဖျောက်ထားမယ်
        }
    }

    // ၅။ ရှာဖွေမှုရလဒ် မတွေ့ရှိပါက Message ပြသခြင်း
    let noResultMsg = document.getElementById('no-search-result');
    if (visibleCards === 0) {
        if (!noResultMsg) {
            noResultMsg = document.createElement('div');
            noResultMsg.id = 'no-search-result';
            noResultMsg.className = 'col-span-full py-10 text-center text-gray-500 text-sm';
            noResultMsg.innerText = "No matching trade history found.";
            container.appendChild(noResultMsg);
        }
    } else {
        if (noResultMsg) noResultMsg.remove();
    }
}

// ထပ်မံဖြည့်စွက်ချက် - Tab ပြောင်းတဲ့အခါ Search Box ကို ရှင်းပစ်ရန်
const originalSwitchTab = window.switchTab;
window.switchTab = function(tabId, dbPath, element) {
    // Search input ကို ရှင်းလင်းပါ
    const searchInput = document.getElementById('historySearch');
    if (searchInput) searchInput.value = '';
    
    // မူရင်း switchTab function ကို ပြန်ခေါ်ပါ
    if (typeof originalSwitchTab === 'function') {
        originalSwitchTab(tabId, dbPath, element);
    }
};


// ၁။ Market ဒေတာစသိမ်းမည့် Variable
let binanceApiUrl = 'https://api.binance.com'; // Default အနေနဲ့ Global ကို ထားမယ်
let cryptoData = [];
const featuredCoins = ['BTCUSDT', 'ETHUSDT', 'XRPUSDT', 'SOLUSDT']; // API အတွက် Symbol အပြည့်အစုံသုံးပါ

// ၂။ API ကနေ Real-time Data ဆွဲယူခြင်း
async function fetchMarketData() {
    try {
        // Binance API ကနေ 24h ticker ဒေတာကို ခေါ်ယူခြင်း
        const response = await fetch(`${binanceApiUrl}/api/v3/ticker/24hr`);
        const data = await response.json();

        // ကိုယ်ပြချင်တဲ့ Coin တွေကိုပဲ စစ်ထုတ်ယူခြင်း (ဥပမာ - USDT pair များသာ)
        const symbolsToShow = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'XRPUSDT', 'ADAUSDT', 'AVAXUSDT', 'DOTUSDT', 'TRXUSDT', 'LINKUSDT'];
        
        cryptoData = data.filter(coin => symbolsToShow.includes(coin.symbol)).map(coin => ({
            id: coin.symbol.toLowerCase(),
            symbol: coin.symbol.replace('USDT', ''), // 'BTCUSDT' ကို 'BTC' လို့ပဲပြရန်
            fullSymbol: coin.symbol,
            price: parseFloat(coin.lastPrice),
            change: parseFloat(coin.priceChangePercent)
        }));

        renderMarket(); // ဒေတာရပြီဆိုရင် UI မှာပြရန်
    } catch (error) {
        console.error('Error fetching market data:', error);
    }
}

// ၃။ UI မှာ ဒေတာများ ထည့်သွင်းခြင်း
function renderMarket() {
    const marketBody = document.getElementById('marketBody');
    const topCards = document.getElementById('topCards');
    if (!marketBody || !topCards) return;

    marketBody.innerHTML = '';
    topCards.innerHTML = '';

    cryptoData.forEach((coin, index) => {
        // --- ၁။ Table Row (Stock Table Style အတိုင်း) ---
        const row = document.createElement('tr');
        // Crypto အတွက် Volume နဲ့ Market Cap ကို Demo data သုံးထားပါတယ် (API ကနေ တိုက်ရိုက်ယူရင်လဲ ရပါတယ်)
        const volume = coin.volume || (Math.random() * 500 + 100).toFixed(1) + 'M';
        const mktCap = coin.mktCap || (Math.random() * 50 + 10).toFixed(2) + 'B';

        row.innerHTML = `
    <td>
        <div style="display: flex; flex-direction: column;">
            <strong style="font-size: 14px; color: #fff;">${coin.symbol}</strong>
            <span style="color: #94a3b8; font-size: 11px;">${coin.symbol} / USDT</span>
        </div>
    </td>
    <td><div style="font-weight: bold;">$${coin.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</div></td>
    <td style="text-align: right;"> 
        <span class="change-badge ${coin.change >= 0 ? 'up-bg' : 'down-bg'}">
            ${coin.change >= 0 ? '+' : ''}${coin.change}%
        </span>
    </td>
`;
        marketBody.appendChild(row);


// --- ၂။ Top Cards (Premium Gradient Sparkline Style) ---
if (index < 4) {
    const card = document.createElement('div');
    card.className = 'premium-stock-card'; 
    card.style.flex = "1 1 calc(25% - 1rem)";
    card.style.minWidth = "240px";

    const isUp = coin.change >= 0;

    card.innerHTML = `
        <div class="card-identity">
            <div class="coin-logo-bg" id="logo-bg-${coin.symbol}">
                <img src="https://bin.bnbstatic.com/static/images/home/asset-logo/${coin.symbol}.png" 
                     onload="document.getElementById('logo-bg-${coin.symbol}').classList.add('active')"
                     onerror="this.src='https://bin.bnbstatic.com/static/images/home/asset-logo/BTC.png'" alt="">
            </div>
            <div class="coin-name-group">
                <span class="coin-full-name">${coin.symbol} Asset</span>
                <span class="coin-symbol-tag">${coin.symbol}/USDT</span>
            </div>
        </div>

        <div class="chart-container">
            <canvas id="sparkline-${coin.symbol}" class="sparkline-canvas"></canvas>
        </div>

        <div class="card-footer">
            <div class="price-info">
                <h3 class="display-price" style="color: #ffffff;">$${coin.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
                <span class="change-tag ${isUp ? 'up' : 'down'}">${isUp ? '+' : ''}${coin.change}% 24H</span>
            </div>
            <button class="premium-buy-btn" onclick="goToTradeTab()">Buy</button>
        </div>
    `;
    topCards.appendChild(card);

    setTimeout(() => drawPremiumSparkline(`sparkline-${coin.symbol}`, isUp), 100);
}

});
}

// ၄။ စက္ကန့်အနည်းငယ်ကြာတိုင်း Update ဖြစ်အောင် လုပ်ခြင်း
function startRealTimeUpdates() {
    fetchMarketData(); // ပထမဆုံးအကြိမ် ခေါ်ယူခြင်း
    setInterval(fetchMarketData, 5000); // ၅ စက္ကန့်တစ်ခါ Update လုပ်ခြင်း
}

// Run functions on load
window.onload = () => {
    startRealTimeUpdates();
    // animateCounters() ရှိရင် ဒီမှာ ဆက်ထားနိုင်ပါတယ်
    initializeApp();
};

//// Stock Overview Section Start ////

// ၁။ Stock စာရင်း (Binance Symbol မလိုတော့ပါ)
const stocks = ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'GOOGL', 'AMZN', 'META', 'AMD', 'NFLX', 'COIN'];
const API_KEY = 'd6rg521r01qr194miqr0d6rg521r01qr194miqrg'; // သင်၏ API Key ကို ဒီမှာထည့်ပါ

async function fetchRealTimeStocks() {
    try {
        // တစ်ခုချင်းစီအတွက် ဈေးနှုန်းခေါ်ယူခြင်း
        const promises = stocks.map(symbol => 
            fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`)
            .then(res => res.json())
            .then(data => ({
                symbol: symbol,
                name: getStockName(symbol), // နာမည်ပြန်ထုတ်ပေးသည့် function
                price: data.c,        // Current Price (တကယ့်ဈေးအစစ်)
                change: data.dp.toFixed(2), // Percent Change
                volume: (Math.random() * 100).toFixed(1) + 'M', // Volume ကို Demo အနေနဲ့ထားပါ (ဒါမှမဟုတ် data.v သုံးနိုင်သည်)
                relVol: (Math.random() * 1.5 + 0.5).toFixed(1) + 'x',
                mktCap: (Math.random() * 2 + 1).toFixed(2) + 'T'
            }))
        );

        const liveStockData = await Promise.all(promises);
        renderStocks(liveStockData);
        
    } catch (error) {
        console.error('Data fetching failed:', error);
    }
}

// နာမည်များ ပြန်ပေးရန် Helper Function
function getStockName(symbol) {
    const names = {
        'AAPL': 'Apple Inc.', 'TSLA': 'Tesla, Inc.', 'NVDA': 'NVIDIA Corp.',
        'MSFT': 'Microsoft Corp.', 'GOOGL': 'Alphabet Inc.', 'AMZN': 'Amazon.com',
        'META': 'Meta Platforms', 'AMD': 'AMD, Inc.', 'NFLX': 'Netflix, Inc.', 'COIN': 'Coinbase Global'
    };
    return names[symbol] || symbol;
}

// renderStocks function ကတော့ အရင်အတိုင်း ထားနိုင်ပါတယ်။
// ဒါပေမယ့် stock.change က string ဖြစ်သွားနိုင်လို့ parseFloat ပြန်လုပ်ပေးဖို့ လိုနိုင်ပါတယ်။

function renderStocks(data) {
    const stockBody = document.getElementById('stockBody');
    const stockTopCards = document.getElementById('stock-top-cards');
    if(!stockBody || !stockTopCards) return;

    stockBody.innerHTML = '';
    stockTopCards.innerHTML = '';

    data.forEach((stock, index) => {
        // --- ၁။ Table Row ဆောက်ခြင်း ---
        const row = document.createElement('tr');
        row.style.cursor = "pointer"; // Mouse ထောက်ရင် လက်ညှိုးပုံပေါ်စေရန်
        row.onclick = () => goToMarketTab(); // နှိပ်ရင် Market Tab ကိုသွားရန်

        row.innerHTML = `
    <td>
        <div style="display: flex; flex-direction: column;">
            <strong style="font-size: 14px; color: #fff;">${stock.symbol}</strong>
            <span style="color: #94a3b8; font-size: 11px;">${stock.name}</span>
        </div>
    </td>
    <td><div style="font-weight: bold;">$${stock.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</div></td>
    <td style="text-align: right;"> 
        <span class="change-badge ${stock.change >= 0 ? 'up-bg' : 'down-bg'}">
            ${stock.change >= 0 ? '+' : ''}${stock.change}%
        </span>
    </td>
`;
        stockBody.appendChild(row);

        // --- ၂။ Trending Price Cards (အသစ်ပြင်ဆင်ထားသော Premium Style) ---
        if (index < 4) {
            const card = document.createElement('div');
            card.className = 'stock-card';
            
            const isUp = stock.change >= 0;

            card.innerHTML = `
                <div class="coin-identity">
                    <div class="coin-logo-circle">${stock.symbol.substring(0, 1)}</div>
                    <div class="coin-info-text">
                        <span class="coin-full-name">${stock.name}</span>
                        <span class="coin-symbol-sub">${stock.symbol}</span>
                    </div>
                </div>

                <div class="sparkline-wrapper">
                    <canvas id="spark-canvas-${stock.symbol}" style="width:100%; height:100%;"></canvas>
                </div>

                <div class="card-bottom">
                    <div class="price-box">
                        <h3 class="main-price">$${stock.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
                        <span class="${isUp ? 'up-color' : 'down-color'}" style="font-size: 13px; font-weight: 600;">
                            ${isUp ? '+' : ''}${stock.change}% 24H
                        </span>
                    </div>
                    <button class="buy-action-btn">Buy</button>
                </div>
            `;
            stockTopCards.appendChild(card);

            // Chart ဆွဲရန် function ကို ခေါ်ခြင်း
            setTimeout(() => {
                drawSparkline(`spark-canvas-${stock.symbol}`, isUp);
            }, 50);
        }
    });
}

// စာမျက်နှာပွင့်သည်နှင့် ဒေတာခေါ်ယူရန်
document.addEventListener('DOMContentLoaded', () => {
    fetchRealTimeStocks();
    setInterval(fetchRealTimeStocks, 3000); // ၃ စက္ကန့်တစ်ခါ အလိုအလျောက် Update လုပ်ပေးမည်
});
//// Stocks Overview Section End ////

function openTab(tabId) {
    // Content အားလုံးကို ဖျောက်ထားပါ
    const contents = document.getElementsByClassName('tab-content');
    for (let content of contents) {
        content.style.display = 'none';
    }

    // Tab ခလုတ်တွေရဲ့ Active Class ကို ဖယ်ထုတ်ပါ
    const buttons = document.getElementsByClassName('tab-btn');
    for (let btn of buttons) {
        btn.classList.remove('active');
        btn.style.color = '#94a3b8'; // Deactivated color
    }

    // ရွေးချယ်လိုက်တဲ့ Tab ကို ပြပါ
    document.getElementById(tabId).style.display = 'block';
    
    // နှိပ်လိုက်တဲ့ ခလုတ်ကို Active Style ပေးပါ
    event.currentTarget.classList.add('active');
    event.currentTarget.style.color = '#fff';
}

// စာမျက်နှာ စဖွင့်ချင်းမှာ ဒေတာနှစ်ခုလုံးကို Load လုပ်ထားပါ
document.addEventListener('DOMContentLoaded', () => {
    fetchMarketData(); // Crypto ဒေတာဆွဲရန်
    fetchRealTimeStocks(); // Stock ဒေတာဆွဲရန်
    
    // Update ပတ်နေတာတွေကိုလဲ ဆက်ထားပါ
    setInterval(fetchMarketData, 5000);
    setInterval(fetchRealTimeStocks, 5000);
});

function goToTradeTab() {
    // 1. Check if we are inside an iframe
    if (window.parent && window.parent.navigate) {
        
        // 2. Target the 3rd nav-item (index 2) which is 'Trade' 
        // Index 0: Home, 1: Market, 2: Trade
        const tradeNavItem = window.parent.document.querySelectorAll('.nav-item')[2];
        
        // 3. Call the parent's navigate function
        window.parent.navigate('trade', tradeNavItem);
    } else {
        // Fallback if not in iframe
        window.location.href = 'trade.html';
    }
}

// ၁။ User ID ယူပြီး Firebase Path သတ်မှတ်ခြင်း
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const userId = currentUser ? (currentUser.displayId || currentUser.uid) : 'guest';
const chatRef = db.ref(`ChatBox_History/${userId}`);

// ၂။ Date ရော Time ပါယူသည့် Function
function getDateTime() {
    const now = new Date();
    return now.toLocaleString('en-US', { 
        day: 'numeric', month: 'short', 
        hour: 'numeric', minute: 'numeric', hour12: true 
    });
}

// ၂။ UI ပေါ်တွင် စာပြသည့် Function (နှိပ်လို့ရအောင် HTML ပါခွင့်ပြုထားသည်)
function displayOnly(sender, text, time) {
    const chatLogs = document.getElementById('chat-logs');
    if (!chatLogs) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${sender === 'user' ? 'user-msg' : 'admin-msg'}`;
    
    // စာသားထဲမှာ \n ပါရင် <br> ပြောင်းပေးမယ်
    let formattedText = text.replace(/\n/g, '<br>');
    msgDiv.innerHTML = `${formattedText} <span class="msg-time">${time}</span>`;
    
    chatLogs.appendChild(msgDiv);
    chatLogs.scrollTop = chatLogs.scrollHeight;
}

// ၄။ Firebase သို့ စာလှမ်းပို့ခြင်း
function sendToFirebase(sender, text) {
    const time = getDateTime();
    chatRef.push({
        sender: sender,
        message: text,
        timestamp: time
    });
}

// ၅။ Firebase Listener (တစ်ခုတည်းသာ သုံးရပါမည် - စာနှစ်ခါမထပ်စေရန်)
chatRef.on('child_added', (snapshot) => {
    const data = snapshot.val();
    
    // Welcome Screen ဖျောက်ခြင်း
    const welcomeArea = document.getElementById('chat-welcome');
    const messageArea = document.getElementById('chat-messages-area');
    if (welcomeArea && messageArea) {
        welcomeArea.style.display = 'none';
        messageArea.style.display = 'flex';
    }

    // UI မှာ စာပြမယ်
    displayOnly(data.sender, data.message, data.timestamp);

    // Admin ဆီကစာဆိုရင် Popup ဖွင့်ပေးမယ်
    if (data.sender === 'admin') {
        const chatPopup = document.getElementById('chat-popup');
        if (chatPopup && chatPopup.style.display !== 'flex') {
            chatPopup.style.display = 'flex';
        }
    }
});

// ၆။ စာရိုက်ပြီး ပို့သည့်အခါ
function sendMessage() {
    const input = document.getElementById('user-msg-input');
    const text = input.value.trim();
    if (text !== "") {
        sendToFirebase('user', text);
        checkAutoReply(text);
        input.value = "";
        input.style.height = "40px";
    }
}

// ၅။ FAQ နှိပ်သည့်အခါ
function faqReply(question) {
    sendToFirebase('user', question);
    
    // Auto Reply စစ်ဆေးခြင်း
    const hasAutoReply = checkAutoReply(question);
    
    if (!hasAutoReply) {
        setTimeout(() => {
            let reply = "";

            if (question.includes('buy crypto')) {
                reply = `To buy crypto, follow these general steps:
                \n1. Choose a crypto platform like Crypto.com App.
                \n2. Create an account and complete KYC verification.
                \n3. Deposit fiat or another cryptocurrency.
                \n4. Navigate to 'Buy' section and select your crypto.
                \n5. Enter amount and confirm transaction.
                \n6. Crypto will be deposited in your account.
                \n\nNote: Perform proper research and choose a reputable platform.`;
            } 
            else if (question.includes('trade crypto')) {
                reply = `To trade cryptocurrency, follow these general steps:
                \n1. Choose a supported cryptocurrency exchange.
                \n2. Create account and complete KYC.
                \n3. Deposit funds into your account.
                \n4. Select the cryptocurrency pair to trade.
                \n5. Choose buy/sell and enter amount.
                \n6. Set price and order type (Market, Limit, etc.).
                \n7. Submit and wait for execution.
                \n8. Monitor and adjust strategies.
                \n\nImportant: Trading carries risk. Only trade what you can afford to lose.`;
            }
            else if (question.includes('safe')) {
                reply = "";
            }
            else if (question.includes('deposit')) {
                reply = "To make a deposit, go to 'Profile' > 'Wallet'.";
            }
            else {
                reply = "Our team will respond shortly.";
            }

            sendToFirebase('admin', reply);
        }, 1000);
    }
}

// ၈။ စကားစပြောရန်
function startChatting() {
    document.getElementById('chat-welcome').style.display = 'none';
    document.getElementById('chat-messages-area').style.display = 'flex';
    const chatLogs = document.getElementById('chat-logs');
    if (chatLogs.children.length === 0) {
        sendToFirebase('admin', 'Hello! How can we assist today?');
    }
}

function toggleChat() {
    const chat = document.getElementById('chat-popup');
    chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
    const chatLogs = document.getElementById('chat-logs');
    if (chatLogs) chatLogs.scrollTop = chatLogs.scrollHeight;
}

// Chat Box အပြင်ဘက်ကို နှိပ်ရင် ပိတ်သွားစေရန်
window.addEventListener('click', function(event) {
    const chatPopup = document.getElementById('chat-popup');
    const chatBtn = document.querySelector('.chat-float-btn');

    // အကယ်၍ Chat Popup ပွင့်နေတယ်၊ ပြီးတော့ နှိပ်လိုက်တဲ့နေရာက 
    // Chat Popup ရော၊ Chat Button ရော မဟုတ်ဘူးဆိုရင် ပိတ်လိုက်မယ်
    if (chatPopup.style.display === 'flex' && 
        !chatPopup.contains(event.target) && 
        !chatBtn.contains(event.target)) {
        chatPopup.style.display = 'none';
    }
});

function autoHeight(element) {
    element.style.height = "40px"; // မူလ အမြင့်
    element.style.height = (element.scrollHeight) + "px"; // စာရှိသလောက် အမြင့်
}

// ၁။ Deposit Address များ သတ်မှတ်ခြင်း
const cryptoAddresses = {
    "BTC": "bc1qjnsz7w7jdsld8ncal07r5t32spqh5qd0wz6wrf",
    "ETH": "0xaeb388c63c4389b2f0ba20093a62f857e1c89655",
    "USDT": "0xaeb388c63c4389b2f0ba20093a62f857e1c89655",
    "SOL": "3SSdEDY7nUWRnNMdEqGZExpwt12WK5Uq9uNNZuMi1asp",
    "XRP": "rUkLSsxaTvLe5pCXR3VxJKpcpn4XywAafr",
    "USDC": "0x0b6133fcf67162a539310ea99a4af4160045b7ee",
    "EOS": "0x0b6133fcf67162a539310ea99a4af4160045b7ee",
    "NEO": "Nhnq9ZL9sjFn4cfFp7cMWmyPHYL867BAnp",
    "QTUM": "QiX7TYevoZrfd6vLkhpEvHM7ZGUq9uCcoB",
    "XLM": "GABFQIK63R2NETJM7T673EAMZN4RJLLGP3OFUEJU5SZVTGWUKULZJNL6",
    "TRX": "TTDY1t8t6mQRbCezsjX9HiaUHBzrxzPKm7",
    "WAVES": "0x0b6133fcf67162a539310ea99a4af4160045b7ee",
    "ANKR": "0x0b6133fcf67162a539310ea99a4af4160045b7ee",
    "CHZ": "0x0b6133fcf67162a539310ea99a4af4160045b7ee",
    "BCH": "0x0b6133fcf67162a539310ea99a4af4160045b7ee",
    "PEPE": "0x0b6133fcf67162a539310ea99a4af4160045b7ee"    
       
};

// ၃။ Coin တစ်ခုခုကို နှိပ်လိုက်တဲ့အခါ Address ထွက်လာအောင် လုပ်ပေးမယ့် Function
function getSpecificAddress(coin) {
    const address = cryptoAddresses[coin];
    sendToFirebase('user', `${coin} Deposit Address`); // User ဘက်က နှိပ်လိုက်သလို ပြမယ်
    
    setTimeout(() => {
        // မူရင်းအတိုင်းပဲ ပြသော်လည်း Copy Icon လေးတစ်ခု ပိုထည့်လိုက်ခြင်းဖြစ်သည်
        const messageWithIcon = `${coin} Deposit Address\n\n${address} <i class="far fa-copy" onclick="copyText('${address}')" style="cursor: pointer; color: #fc9; margin-left: 5px;"></i>`;
        
        sendToFirebase('admin', messageWithIcon);
    }, 500);
}

// Copy ကူးပေးမယ့် function အသစ် (Floating Notification ဖြင့်)
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('copy-toast');
        
        // Notification ကို ပြသခြင်း
        toast.style.display = 'block';
        toast.style.animation = 'fadeIn 0.3s';

        // ၃ စက္ကန့်ကြာရင် ပြန်ဖျောက်ခြင်း
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }).catch(err => {
        console.error('Copy fail:', err);
    });
}

// ၄။ FAQ သို့မဟုတ် စာရိုက်သည့်အခါ Auto Reply စစ်ဆေးရန်
function checkAutoReply(text) {
    const input = text.toLowerCase();
    
    if (input.includes('deposit') && input.includes('address')) {
        let reply = "Please select the type of deposit you wish to make - \n\n";
        
        // Coin တစ်ခုချင်းစီကို နှိပ်လို့ရတဲ့ Link ပုံစံမျိုး ပြင်ဆင်မယ်
        Object.keys(cryptoAddresses).forEach(coin => {
            // JavaScript Function ကို လှမ်းခေါ်မယ့် Link အနေနဲ့ ပြမယ်
            reply += `<a href="javascript:void(0)" onclick="getSpecificAddress('${coin}')" style="color: #fc9; text-decoration: underline; display: block; margin: 5px 0;">• ${coin} Deposit Address</a>`;
        });
        
        setTimeout(() => {
            sendToFirebase('admin', reply);
        }, 800);
        return true;
    }
    return false;
}


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

function drawPremiumSparkline(canvasId, isUp) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Canvas size ကို reset လုပ်ပေးခြင်း (Rendering ပိုကောင်းစေရန်)
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const color = isUp ? '#00ff88' : '#ff3366';
    const points = Array.from({length: 12}, () => Math.random() * (canvas.height * 0.6) + (canvas.height * 0.2));
    const width = canvas.width;
    const height = canvas.height;
    const step = width / (points.length - 1);

    ctx.clearRect(0, 0, width, height);
    
    // ၁။ မျဉ်းကွေးအရင်ဆွဲပါ
    ctx.beginPath();
    ctx.moveTo(0, height - points[0]);
    for (let i = 0; i < points.length - 1; i++) {
        const xc = (i * step + (i + 1) * step) / 2;
        const yc = (height - points[i] + height - points[i+1]) / 2;
        ctx.quadraticCurveTo(i * step, height - points[i], xc, yc);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // ၂။ Area Fill (အရောင်ဖြည့်ခြင်း) - မျဉ်းကွေးအတိုင်း ပိတ်ပေးရပါမယ်
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, isUp ? 'rgba(0, 255, 136, 0.4)' : 'rgba(255, 51, 102, 0.4)');
    grad.addColorStop(1, 'rgba(12, 27, 46, 0)'); // Background ထဲ blend ဖြစ်သွားစေရန်

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
}

// Sparkline Chart ဆွဲပေးသည့် function (Axis, Grid, Numbers မပါသော Green Line)
function drawSparkline(canvasId, isUp) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const points = Array.from({length: 10}, () => Math.random() * (canvas.height * 0.5) + (canvas.height * 0.25));
    const step = canvas.width / (points.length - 1);
    const color = isUp ? '#00ff88' : '#ff3366';

    ctx.beginPath();
    ctx.moveTo(0, canvas.height - points[0]);
    
    for (let i = 0; i < points.length - 1; i++) {
        const xc = (i * step + (i + 1) * step) / 2;
        const yc = (canvas.height - points[i] + canvas.height - points[i+1]) / 2;
        ctx.quadraticCurveTo(i * step, canvas.height - points[i], xc, yc);
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Area fill effect
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, color + '33'); 
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fill();
}

function goToMarketTab() {
    if (window.parent && window.parent.navigate) {
        // Market Tab သည် များသောအားဖြင့် index 1 မှာရှိတတ်ပါသည်
        const marketNavItem = window.parent.document.querySelectorAll('.nav-item')[1];
        window.parent.navigate('market', marketNavItem);
    } else {
        window.location.href = 'market.html';
    }
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

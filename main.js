// --- Navigation System ---
function navigate(tabId, el) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    el.classList.add('active');
    
    // Auto-scroll to top for new tab
    window.scrollTo(0, 0);
}

// iframe ထဲကနေ လှမ်းခေါ်လို့ရအောင် window object မှာ assign လုပ်ထားပါ
window.switchToTradeTab = function() {
    // 'trade' tab ကို ပြောင်းဖို့ navigate function ကို ခေါ်တယ်
    // ဒုတိယ parameter အတွက် trade nav item ကို ရှာပြီး ထည့်ပေးလိုက်ပါမယ်
    const tradeNavItem = document.querySelector('.nav-item:nth-child(3)'); // Trade က ၃ ခုမြောက်ဖြစ်လို့
    if (typeof navigate === "function") {
        navigate('trade', tradeNavItem);
    }
};

// Stock Tab သို့ ပြောင်းရန်
window.switchToStockTab = function() {
    const stockNavItem = document.querySelector('.nav-item:nth-child(2)'); // Stock က 2 ခုမြောက် ဖြစ်လို့
    if (typeof navigate === "function") {
        navigate('market', stockNavItem); // main.html မှာ id="market" လို့ ပေးထားတာဖြစ်လို့
    }
};

// Setting Tab သို့ သွားရန်
window.switchToSetting = function() {
    const el = document.getElementById('nav-setting');
    navigate('setting', el);
};

// Stock Future Tab သို့ သွားရန်
window.switchToStockFuture = function() {
    const el = document.getElementById('nav-stock-future');
    navigate('stock-future', el);
};

// Transaction Tab သို့ သွားရန်
window.switchToTransaction = function() {
    const el = document.getElementById('nav-transaction');
    navigate('transaction', el);
};

// Trade History Tab သို့ သွားရန်
window.switchToTradeHistory = function() {
    const el = document.getElementById('nav-trade-history');
    navigate('trade-history', el);
};


// ၁။ လက်ရှိ Login ဝင်ထားတဲ့ User ကို ယူမယ်
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// ၂။ User ID အလိုက် သီးသန့် Key ကို သတ်မှတ်မယ်
const userHistoryKey = currentUser ? `tradeHistory_${currentUser.id}` : 'tradeHistory';

function renderStoredHistory() {
    // Dropdown filter ကို update လုပ်မယ်
    if (typeof updateAssetDropdown === "function") updateAssetDropdown();
    
    // History data တွေကို ဖော်ပြပေးမယ်
    renderHistory();
}

function renderHistory() {
    const historyBody = document.getElementById('history-body');
    if (!historyBody) return;

    const assetFilter = document.getElementById('asset-filter')?.value || 'all';
    const typeFilter = document.getElementById('type-filter')?.value || 'all';

    const history = JSON.parse(localStorage.getItem(userHistoryKey)) || [];

    const filteredHistory = history.filter(trade => {
        const matchesAsset = assetFilter === 'all' || trade.asset === assetFilter;
        
        // ဘေးထွက် ဒေတာများကို ဖယ်ထုတ်ပြီး Buy/Sell (သို့မဟုတ် Long/Short) ကိုပဲ ယူမည်
        const sideValue = trade.side ? trade.side.toLowerCase() : "";
        const isTradeType = sideValue.includes('buy') || 
                            sideValue.includes('sell') || 
                            sideValue.includes('long') || 
                            sideValue.includes('short');

        let matchesType = true;
        if (typeFilter !== 'all') {
            if (typeFilter === 'buy') matchesType = sideValue.includes('buy') || sideValue.includes('long');
            if (typeFilter === 'sell') matchesType = sideValue.includes('sell') || sideValue.includes('short');
        }

        // matchesAsset လည်း ကိုက်ညီရမည်၊ matchesType လည်း ကိုက်ညီရမည်၊ Buy/Sell အမျိုးအစားလည်း ဖြစ်ရမည်
        return matchesAsset && matchesType && isTradeType;
    });

    if (filteredHistory.length === 0) {
        historyBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-gray-500">No trading history found for this account.</td></tr>';
        return;
    }

    historyBody.innerHTML = filteredHistory.map((trade, index) => {
        const sideValue = trade.side ? trade.side.toLowerCase() : "";
        const isUp = sideValue.includes('buy') || sideValue.includes('long');
        
        return `
            <tr onclick="showTradeDetails(${index})" class="hover:bg-gray-800 cursor-pointer transition border-b border-gray-800">
                <td class="p-3 text-[11px] text-gray-400">${trade.date}</td>
                <td class="p-3 font-bold">${trade.asset}</td>
                <td class="p-3 font-bold ${isUp ? 'text-green-500' : 'text-red-500'}">
                    ${trade.side.toUpperCase()}
                </td>
                <td class="p-3">${trade.price}</td>
                <td class="p-3">${trade.amount}</td>
                <td class="p-3 text-white font-bold">${trade.total}</td>
            </tr>
        `;
    }).join('');
}

function showTradeDetails(index) {
    const history = JSON.parse(localStorage.getItem(userHistoryKey)) || [];
    const trade = history[index];
    if (!trade) return;

    const content = document.getElementById('details-content');
    if (content) {
        const isUp = trade.side.toLowerCase().includes('buy') || trade.side.toLowerCase().includes('long');
        content.innerHTML = `
            <div class="space-y-3">
                <div class="flex justify-between border-b border-gray-800 pb-2">
                    <span class="text-gray-400">Date</span>
                    <span class="text-white">${trade.date}</span>
                </div>
                <div class="flex justify-between border-b border-gray-800 pb-2">
                    <span class="text-gray-400">Asset</span>
                    <span class="text-white font-bold">${trade.asset}</span>
                </div>
                <div class="flex justify-between border-b border-gray-800 pb-2">
                    <span class="text-gray-400">Side</span>
                    <span class="${isUp ? 'text-green-500' : 'text-red-500'} font-bold">${trade.side.toUpperCase()}</span>
                </div>
                <div class="flex justify-between border-b border-gray-800 pb-2">
                    <span class="text-gray-400">Price</span>
                    <span class="text-white">${trade.price}</span>
                </div>
                <div class="flex justify-between pt-2">
                    <span class="text-gray-400 font-bold">Total Value</span>
                    <span class="text-blue-500 font-bold">${trade.total} USDT</span>
                </div>
            </div>
        `;
        document.getElementById('trade-details-modal').classList.remove('hidden');
    }
}

function closeTradeDetails() {
    document.getElementById('trade-details-modal').classList.add('hidden');
}

function updateAssetDropdown() {
    const assetFilter = document.getElementById('asset-filter');
    if (!assetFilter) return;

    const history = JSON.parse(localStorage.getItem(userHistoryKey)) || [];
    const assets = [...new Set(history.map(t => t.asset))];

    let options = '<option value="all">All Assets</option>';
    assets.forEach(asset => {
        options += `<option value="${asset}">${asset}</option>`;
    });
    assetFilter.innerHTML = options;
}

// Page load ဖြစ်ချိန်မှာ စတင်ပတ်မယ်
document.addEventListener('DOMContentLoaded', renderStoredHistory);
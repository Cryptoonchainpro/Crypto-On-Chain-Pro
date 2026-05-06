const FINNHUB_API_KEY = 'd6rg521r01qr194miqr0d6rg521r01qr194miqrg'; // ဤနေရာတွင် Key ထည့်ပါ
const symbols = [
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'PYPL', 'ADBE',
    'INTC', 'CSCO', 'PEP', 'AVGO', 'COST', 'TMUS', 'QCOM', 'TXN', 'AMAT', 'SBUX',
    'AMD', 'ISRG', 'INTU', 'AMGN', 'MDLZ', 'BKNG', 'GILD', 'ADP', 'ADI', 'VRTX',
    'REGN', 'FISV', 'MU', 'LRCX', 'ATVI', 'PANW', 'SNPS', 'CDNS', 'MNST', 'ORLY',
    'MAR', 'KLAC', 'CHTR', 'KDP', 'AEP', 'ADSK', 'PAYX', 'NXPI', 'LULU', 'EXC',
    'MELI', 'ILMN', 'IDXX', 'WDAY', 'CTAS', 'PCAR', 'BKR', 'KLA', 'MRVL', 'CPRT',
    'MCHP', 'DXCM', 'ROST', 'ODFL', 'TEAM', 'FAST', 'GEHC', 'ENPH', 'ZS', 'DDOG',
    'ANSS', 'ALGN', 'WBD', 'PDD', 'EBAY', 'DLTR', 'SIRI', 'ZM', 'JD', 'LCID',
    'RIVN', 'ABNB', 'DASH', 'MDB', 'AFRM', 'SQ', 'U', 'PLTR', 'DKNG', 'COIN',
    'HOOD', 'ROKU', 'SHOP', 'SE', 'BABA', 'BIDU', 'XPEV', 'LI',
    // --- ထပ်တိုး Stocks များ (Sample) ---
    'WMT', 'JPM', 'V', 'MA', 'PG', 'HD', 'CVX', 'LLY', 'BAC', 'PFE',
    'ABV', 'KO', 'NKE', 'DIS', 'TMO', 'XOM', 'WFC', 'CSX', 'UPS', 'BMY',
    'MS', 'ORCL', 'HON', 'UNH', 'LIN', 'PM', 'INTU', 'CAT', 'GE', 'IBM',
    'BA', 'AXP', 'LOW', 'SPGI', 'GS', 'RTX', 'BLK', 'AMAT', 'NOW', 'T',
    'DE', 'LMT', 'SNE', 'SYK', 'EL', 'MMC', 'CB', 'MDT', 'CI', 'C',
    'USB', 'PGR', 'ZTS', 'MO', 'SCHW', 'MDLZ', 'DUK', 'PLD', 'ADI', 'SO',
    'TJX', 'ETN', 'GILD', 'REGN', 'FIS', 'LRCX', 'BDX', 'ISRG', 'CME', 'EQIX',
    'VRTX', 'TGT', 'NEC', 'CL', 'BSX', 'WM', 'ITW', 'HUM', 'NSC', 'ICE',
    'ETN', 'BDX', 'HCA', 'APD', 'SHW', 'EW', 'MCO', 'ATVI', 'DXCM', 'GM',
    'F', 'UBER', 'SNOW', 'MSTR', 'COF', 'BBY', 'WBA', 'HPQ', 'DELL', 'STX'
    // စုစုပေါင်း ၂၀၀ ပြည့်အောင် နောက်ထပ် Symbol များကို ဒီနေရာမှာ ထပ်ဖြည့်နိုင်ပါတယ်
];

async function fetchStockData() {
    const tableBody = document.getElementById('stocks-body');
    tableBody.innerHTML = ''; // လတ်တလော table ကို ရှင်းထုတ်ပါ

    for (const symbol of symbols) {
        try {
            // Quote API ကို ခေါ်ယူခြင်း
            const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
            const data = await response.json();

            // Profile API (Company Name အတွက် - Optional)
            const profileResponse = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
            const profileData = await profileResponse.json();

            const price = data.c; // Current price
            const changePercent = data.dp; // Percent change

            const row = `
                <tr>
                    <td>
                        <div style="font-weight: bold;">${symbol}</div>
                        <div style="font-size: 0.8rem; color: #848e9c;">${profileData.name || 'N/A'}</div>
                    </td>
                    <td>$${price.toLocaleString()}</td>
                    <td style="color: ${changePercent >= 0 ? '#02c076' : '#f84960'};">
                        ${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%
                    </td>
                    <td>${(Math.random() * 10).toFixed(2)}M</td>
                    <td>
                        <button class="trade-btn btn-sm" 
        style="background-color: #0502c0; color: white;" 
        onclick="parent.switchToTradeTab()">
    Invest
</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    }
}

// စာမျက်နှာ စဖွင့်တာနဲ့ Data ခေါ်ယူပါ
document.addEventListener('DOMContentLoaded', fetchStockData);

// Real-time ဖြစ်စေဖို့ ၅ မိနစ်တစ်ခါ Update လုပ်ပေးပါ
setInterval(fetchStockData, 300000);

function filterStocksTable() {
    // Search Box မှ စာသားကို ယူသည်
    const input = document.getElementById('stock-search-input');
    const filter = input.value.toUpperCase();
    
    // Table Body ထဲရှိ Row အားလုံးကို ခေါ်ယူသည်
    const tableBody = document.getElementById('stocks-body');
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        // ပထမဆုံး Column (Symbol & Name ပါသော <td>) ကို ယူသည်
        const stockCol = rows[i].getElementsByTagName('td')[0];
        
        if (stockCol) {
            // <td> ထဲရှိ Symbol နှင့် Name စာသားအားလုံးကို ပေါင်းယူသည်
            const textValue = stockCol.textContent || stockCol.innerText;
            
            // ရှာဖွေသော စာသား ပါဝင်မှု ရှိ/မရှိ စစ်ဆေးသည်
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                rows[i].style.display = ""; // ပါဝင်လျှင် ပြမည်
            } else {
                rows[i].style.display = "none"; // မပါဝင်လျှင် ဖျောက်မည်
            }
        }
    }
}
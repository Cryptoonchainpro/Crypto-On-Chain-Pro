

let allTransactions = []; // Search လုပ်ဖို့အတွက် data ကို သိမ်းထားရန်

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const userUid = user.uid;
        // tradeHistory path တစ်ခုတည်းကနေ data အားလုံးကို နားထောင်မယ်
        const historyRef = firebase.database().ref(`tradeHistory/${userUid}`);

        historyRef.on('value', (snapshot) => {
            const historyData = snapshot.val();
            
            if (historyData) {
                // Object ကို Array ပြောင်းပြီး အချိန်အလိုက် နောက်ဆုံးလုပ်တာကို အပေါ်တင်မယ်
                allTransactions = Array.isArray(historyData) ? historyData : Object.values(historyData);
                allTransactions.reverse(); 
                displayHistory(allTransactions);
            } else {
                displayHistory([]);
            }
        }, (error) => {
            console.error("Firebase Read Error:", error);
        });

    } else {
        window.location.href = 'login.html';
    }
});

function displayHistory(history) {
    const container = document.getElementById('history-card-container');
    if (!container) return;
    
    container.innerHTML = "";

    if (history.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-20 text-center">
                <i class="fas fa-file-invoice text-5xl text-gray-700 mb-4"></i>
                <p class="text-gray-500">No record yet.</p>
            </div>
        `;
        return;
    }

    history.forEach(tx => {
        // Status သတ်မှတ်ချက်
        const isSuccess = tx.status === 'Successful' || tx.status === 'Completed';
        const statusClass = isSuccess ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500';
        
        // Date and Time
        const txTime = tx.time || tx.date || 'N/A';

        // Side အလိုက် စာသားပြောင်းလဲခြင်း (Display Title အတွက်)
        let sideTitle = '';
        let actionVerb = ''; // action စာသား (Deposited, Withdrawn, Transferred)
        let amountDisplay = `${tx.amount} ${tx.asset}`; // ပုံမှန်ပြမည့်ပမာဏ

        if (tx.side === 'deposit') {
            sideTitle = 'Deposit';
            actionVerb = 'Deposited';
        } else if (tx.side === 'transfer') {
            sideTitle = 'Transfer';
            actionVerb = 'Transferred';
            // Transfer ဖြစ်ခဲ့ရင် (ဥပမာ USDT > BTC ပုံစံမျိုးပြရန်)
            // tx.toAsset ရှိမရှိ စစ်ဆေးပြီး ရှိလျှင် ထည့်ပြပေးပါမည်
            if (tx.toAsset) {
                amountDisplay = `${tx.amount} ${tx.asset} > ${tx.toAsset}`;
            }
        } else {
            sideTitle = 'Withdrawal';
            actionVerb = 'Withdrawn';
        }

        const card = `
            <div class="portfolio-card p-5 rounded-2xl border border-gray-800 bg-[#0b1426] hover:border-blue-500/30 transition-all shadow-lg">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <p class="text-[10px] text-gray-500 font-mono mb-1">${txTime}</p>
                        <h4 class="font-bold text-[15px] text-white">
                            ${tx.asset} ${sideTitle}
                        </h4>
                    </div>
                    <span class="${statusClass} text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider">
                        ${tx.status || 'Pending'}
                    </span>
                </div>

                <div class="space-y-3">
                    <p class="text-sm text-gray-300 leading-relaxed">
                        You have successfully <span class="text-white font-semibold">${actionVerb}</span> 
                        <span class="text-white font-bold">${amountDisplay}</span> 
                        at <span class="text-gray-400">${txTime}</span>.
                    </p>

                    <div class="pt-3 border-t border-gray-800">
                        <p class="text-xs text-gray-400">
                            Total Value: <span class="text-green-400 font-mono font-bold">$${tx.totalValue || '0.00'}</span>
                        </p>
                        <p class="text-[10px] text-gray-500 mt-2 italic flex items-center gap-1">
                            <i class="fas fa-info-circle text-[9px]"></i>
                            If you do not recognize this activity. 
                            <a href="#" class="text-blue-500 hover:underline">Please Contact Us.</a>
                        </p>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Search လုပ်တဲ့ function (မူရင်း logic ကို မထိခိုက်စေဘဲ ထည့်ပေးထားပါတယ်)
function searchHistory() {
    const searchTerm = document.getElementById('historySearch').value.toLowerCase();
    const selectedDate = document.getElementById('dateFilter').value; // HTML ကနေရလာတာက "2026-04-24"

    const filtered = allTransactions.filter(tx => {
        // စာသားဖြင့် ရှာဖွေခြင်း
        const matchesText = (tx.asset && tx.asset.toLowerCase().includes(searchTerm)) || 
                           (tx.side && tx.side.toLowerCase().includes(searchTerm));

        let matchesDate = true;
        if (selectedDate) {
            // ၁။ Calendar ကရတဲ့ "2026-04-24" ကို "24/04/2026" ဖြစ်အောင် format ပြောင်းမယ်
            const [year, month, day] = selectedDate.split('-');
            const formattedDate = `${day}/${month}/${year}`; // Database ထဲကအတိုင်း / ပြောင်းလိုက်တာပါ

            // ၂။ ဒေတာထဲက ရက်စွဲ (tx.time သို့မဟုတ် tx.date) ကို ယူမယ်
            const txDateFull = tx.time || tx.date || ""; 
            
            // ၃။ ဒေတာထဲမှာ "24/04/2026, 12:55:19" ဆိုပြီး အချိန်ပါနေရင် ရက်စွဲ (ရှေ့ ၁၀ လုံး) ကိုပဲ ဖြတ်ယူမယ်
            const txDateOnly = txDateFull.substring(0, 10); 

            // ၄။ နှစ်ခုကို တိုက်စစ်မယ်
            matchesDate = (txDateOnly === formattedDate);
        }

        return matchesText && matchesDate;
    });

    displayHistory(filtered);
}

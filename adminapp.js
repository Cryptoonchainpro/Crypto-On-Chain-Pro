
const DB = {
    // User အားလုံးကို ဆွဲယူရန်
    getAllUsers: async () => {
        try {
            const snapshot = await db.ref('users').once('value');
            const data = snapshot.val();
            if (!data) return [];
            return Object.keys(data).map(key => ({
                uid: key,
                ...data[key]
            }));
        } catch (error) {
            console.error("Firebase Error:", error);
            return [];
        }
    },

    // Verification တောင်းဆိုထားသူများကို ဆွဲယူရန် (ဒါလေး အသစ်တိုးလိုက်တာပါ)
    getVerifications: async () => {
        try {
            const snapshot = await db.ref('Users_Verification').once('value');
            const data = snapshot.val();
            if (!data) return [];
            return Object.keys(data).map(key => ({
                uid: key,
                ...data[key]
            }));
        } catch (error) {
            console.error("Firebase Fetch Error:", error);
            return [];
        }
    }
};

// --- 2. Page Routing System (Views) ---
const Views = {
    
    dashboard: (users) => `
    <div style="margin-top: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; background: var(--bg-card); padding: 15px; border-radius: 12px; border: 1px solid var(--border);">
            <div>
                <h3 style="margin: 0; font-size: 18px;">Registered User Database</h3>
                <p style="color:var(--muted); font-size: 12px; margin-top: 5px;">Manage platform members in card view</p>
            </div>
            <div style="background: rgba(252, 213, 53, 0.1); border: 1px solid var(--accent); padding: 8px 15px; border-radius: 10px; text-align: right;">
                <div style="font-size: 10px; color: var(--accent); text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">Total Users</div>
                <div style="font-size: 20px; font-weight: 700; color: #fff;">${users.length}</div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">
            ${users.map(u => `
                <div class="user-card" onclick='showUserDetails(${JSON.stringify(u).replace(/'/g, "&apos;")})' 
                     style="background: var(--bg-card); border: 1px solid var(--border); padding: 20px; border-radius: 12px; position: relative; cursor: pointer; transition: 0.3s;">
                    
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                        <div style="width: 45px; height: 45px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #000; font-weight: bold; font-size: 18px;">
                            ${u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span class="status-pill ${u.status === 'Verified' ? 'success' : 'danger'}" style="font-size: 10px;">
                            ${u.status || 'Unverified'}
                        </span>
                    </div>

                    <div style="margin-bottom: 15px;">
                        <h4 style="margin: 0 0 5px 0; color: #fff;">${u.name || 'Unknown'}</h4>
                        <p style="margin: 0; font-size: 12px; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                            <i class="fas fa-envelope" style="width: 15px;"></i> ${u.contact || u.email || 'No Contact'}
                        </p>
                        <p style="margin: 5px 0 0 0; font-size: 11px; color: var(--accent);">
                            ID: #${u.displayId || (u.uid ? u.uid.substring(0,8) : 'N/A')}
                        </p>
                    </div>

                    <div style="border-top: 1px solid var(--border); padding-top: 15px; display: flex; justify-content: flex-end;">
                        <button onclick="event.stopPropagation(); deleteUser('${u.uid}')" 
                                style="background: rgba(220, 38, 38, 0.1); color: #ef4444; border: 1px solid #ef4444; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; transition: 0.3s;">
                            <i class="fas fa-trash-alt"></i> Remove
                        </button>
                    </div>
                </div>
            `).join('')}
            
            ${users.length === 0 ? `
                <div style="grid-column: 1/-1; text-align: center; padding: 50px; background: var(--bg-card); border-radius: 12px; border: 1px dotted var(--border);">
                    <i class="fas fa-users-slash" style="font-size: 40px; color: var(--muted); margin-bottom: 15px;"></i>
                    <p style="color: var(--muted);">No users found in the database.</p>
                </div>
            ` : ''}
        </div>
    </div>

    <div id="userModal" class="modal-overlay" style="display:none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modalUserName">User Details</h2>
                <span class="close-modal" onclick="closeModal()">&times;</span>
            </div>
            <div class="modal-grid" id="modalDataContainer"></div>
        </div>
    </div>
`,

   users: (users) => `
    <div style="margin-top: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
            <div>
                <h2 style="margin: 0; font-size: 22px; color: #fff;">User Management</h2>
                <p style="color: var(--muted); font-size: 13px; margin-top: 5px;">View and manage all registered platform members</p>
            </div>
            <div style="background: rgba(252, 213, 53, 0.1); border: 1px solid var(--accent); padding: 10px 20px; border-radius: 12px;">
                <span style="color: var(--muted); font-size: 11px; text-transform: uppercase; display: block;">Total Members</span>
                <span style="font-size: 20px; font-weight: 800; color: var(--accent);">${users.length}</span>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
            ${users.map(u => `
                <div class="user-control-card" 
                     style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; transition: all 0.3s ease; position: relative; overflow: hidden;">
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="font-size: 11px; color: var(--muted); background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 5px;">ID: ${u.displayId || (u.uid ? u.uid.substring(0,8) : 'N/A')}</span>
                        <span class="status-pill ${u.status === 'Verified' ? 'success' : 'danger'}" style="font-size: 10px; padding: 4px 10px;">
                            ${u.status || 'Unverified'}
                        </span>
                    </div>

                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                        <div style="width: 55px; height: 55px; background: linear-gradient(135deg, var(--accent), #f3ba2f); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #000; font-weight: 800; font-size: 20px;">
                            ${(u.name || "U").charAt(0).toUpperCase()}
                        </div>
                        <div style="flex: 1; min-width: 0;">
                            <h4 style="margin: 0; color: #fff; font-size: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${u.name || 'Unknown User'}</h4>
                            <p style="margin: 3px 0 0 0; font-size: 12px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                <i class="fas fa-envelope-open" style="font-size: 10px; margin-right: 5px;"></i>${u.contact || u.email || 'No contact info'}
                            </p>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; border-top: 1px solid var(--border); padding-top: 15px;">
                        <button onclick='showUserDetails(${JSON.stringify(u).replace(/'/g, "&apos;")})' 
                                style="background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border); padding: 8px; border-radius: 8px; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center; gap: 6px;">
                            <i class="fas fa-eye" style="color: var(--accent);"></i> View Details
                        </button>
                        <button onclick="deleteUser('${u.uid}')" 
                                style="background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); padding: 8px; border-radius: 8px; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center; gap: 6px;">
                            <i class="fas fa-trash-alt"></i> Delete
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
`,

verifications: (requests) => `
    <div style="margin-top: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
            <div>
                <h2 style="margin: 0; font-size: 22px; color: #fff;">Verification Requests</h2>
                <p style="color: var(--muted); font-size: 13px; margin-top: 5px;">Review user identity documents and profiles</p>
            </div>
            <div style="background: rgba(240, 185, 11, 0.1); border: 1px solid var(--accent); padding: 10px 20px; border-radius: 12px;">
                <span style="color: var(--muted); font-size: 11px; text-transform: uppercase; display: block;">Pending Review</span>
                <span style="font-size: 20px; font-weight: 800; color: var(--accent);">${requests.filter(r => r.status === 'Under Review').length}</span>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
            ${requests.map(r => `
                <div class="v-request-card" 
                     style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; position: relative; transition: 0.3s;">
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="font-size: 10px; color: var(--muted); background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 5px;">SUBMITTED: ${new Date(r.submittedAt).toLocaleDateString()}</span>
                        <span class="status-pill warning" style="font-size: 10px;">${r.status}</span>
                    </div>

                    <div style="margin-bottom: 12px; padding: 6px 10px; background: rgba(240, 185, 11, 0.05); border-left: 3px solid var(--accent); border-radius: 4px;">
                        <span style="display: block; font-size: 9px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px;">User ID</span>
                        <span style="font-family: monospace; font-size: 12px; color: var(--accent);">${r.uid || 'N/A'}</span>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <h4 style="margin: 0; color: #fff; font-size: 17px;">${r.legalName}</h4>
                        
                        <p style="margin: 8px 0 0 0; font-size: 13px; color: var(--muted);">
                            <i class="fas fa-globe-asia" style="width: 18px;"></i> ${r.country} (${r.residence})
                        </p>

                        <p style="margin: 5px 0 0 0; font-size: 13px; color: var(--muted);">
                            <i class="fas fa-calendar-alt" style="width: 18px;"></i> DOB: ${r.dob || 'N/A'}
                        </p>

                        <p style="margin: 5px 0 0 0; font-size: 13px; color: var(--muted);">
                            <i class="fas fa-map-marker-alt" style="width: 18px;"></i> ${r.address || 'No address provided'}
                        </p>

                        <p style="margin: 5px 0 0 0; font-size: 13px; color: var(--muted);">
                            <i class="fas fa-city" style="width: 18px;"></i> ${r.city || 'N/A'} (Code: ${r.postalCode || 'N/A'})
                        </p>

                        <p style="margin: 8px 0 0 0; font-size: 12px; color: var(--accent);">
                            <i class="fas fa-envelope" style="width: 18px;"></i> ${r.email}
                        </p>

                        <p style="margin: 8px 0 0 0; font-size: 11px; color: #fff; background: rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 4px; display: inline-block;">
                            <i class="fas fa-file-alt" style="margin-right: 5px;"></i> Type: ${r.docType || 'Identity Document'}
                        </p>
                    </div>

                    <div style="border-top: 1px solid var(--border); padding-top: 15px; display: flex; gap: 10px;">
                    </div>
                </div>
            `).join('')}

            ${requests.length === 0 ? `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px; background: var(--bg-card); border-radius: 12px; border: 1px dashed var(--border);">
                    <i class="fas fa-user-shield" style="font-size: 50px; color: var(--muted); opacity: 0.3; margin-bottom: 20px;"></i>
                    <p style="color: var(--muted);">No pending verification requests.</p>
                </div>
            ` : ''}
        </div>
    </div>
`,

trades: (users) => `
    <div style="margin-top: 10px;">
        <h2 style="margin-bottom: 20px; color: #fff;"><i class="fas fa-chart-line" style="color: var(--accent);"></i> Trade Management</h2>
        
        <div style="background: var(--bg-card); padding: 15px; border-radius: 12px; border: 1px solid var(--border); margin-bottom: 25px;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; align-items: flex-end;">
                <div>
                    <label style="display:block; font-size:12px; color:var(--muted); margin-bottom:8px;">Select User ID</label>
                    <select id="tradeUserSelect" onchange="updateTradeUserName(this)" style="width:100%; padding:12px; background: #161a1e; border:1px solid var(--border); border-radius:8px; color:#fff; font-size:14px;">
                        <option value="">-- Choose User --</option>
                        ${users.map(u => `<option value="${u.uid}" data-name="${u.name || 'No Name'}">${u.uid.substring(0,10)}... (${u.name || 'User'})</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label style="display:block; font-size:12px; color:var(--muted); margin-bottom:8px;">User Name</label>
                    <input type="text" id="tradeUserName" readonly placeholder="User name" style="width:100%; padding:12px; background: rgba(255,255,255,0.05); border:1px solid var(--border); border-radius:8px; color:var(--accent); font-weight:bold; font-size:14px;">
                </div>
            </div>

            <div class="trade-tab-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 20px;">
                <button onclick="fetchTradeHistory('Crypto Futures')" class="trade-tab-btn" style="padding: 12px 10px; background: var(--accent); color: #000; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 13px;">Crypto Futures</button>
                <button onclick="fetchTradeHistory('Spot Crypto')" class="trade-tab-btn" style="padding: 12px 10px; background: #2a2e39; color: #fff; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; font-size: 13px;">Spot Crypto</button>
                <button onclick="fetchTradeHistory('Stock Futures')" class="trade-tab-btn" style="padding: 12px 10px; background: #2a2e39; color: #fff; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; font-size: 13px;">Stock Futures</button>
                <button onclick="fetchTradeHistory('Spot Stock')" class="trade-tab-btn" style="padding: 12px 10px; background: #2a2e39; color: #fff; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; font-size: 13px;">Spot Stock</button>
            </div>
        </div>

        <div id="trade-history-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 15px;">
            <div style="grid-column: 1/-1; text-align: center; padding: 50px; color: var(--muted); background: var(--bg-card); border-radius: 12px; border: 1px dashed var(--border);">
                <i class="fas fa-search" style="font-size: 30px; margin-bottom: 15px; opacity: 0.5;"></i>
                <p>Select a user and choose a trade type to view history.</p>
            </div>
        </div>
    </div>
`,

    passwordResets: () => {
        const requests = JSON.parse(localStorage.getItem('pw_reset_requests')) || [];
        
        let rows = requests.map((req, index) => `
            <tr>
                <td>${req.name}</td>
                <td>${req.contact}</td>
                <td>${req.time}</td>
                <td><span style="padding:4px 8px; background:rgba(255,193,7,0.2); color:#ffc107; border-radius:4px; font-size:12px;">${req.status}</span></td>
                <td>
                    <button onclick="deleteRequest(${index})" style="background:#dc3545; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        return `
            <div style="background: var(--bg-card); padding: 20px; border-radius: 12px; border: 1px solid var(--border);">
                <h3 style="margin-bottom: 20px;">Password Reset Requests</h3>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; color: var(--text-main);">
                        <thead>
                            <tr style="border-bottom: 1px solid var(--border); text-align: left;">
                                <th style="padding: 12px;">User Name</th>
                                <th style="padding: 12px;">Contact</th>
                                <th style="padding: 12px;">Request Time</th>
                                <th style="padding: 12px;">Status</th>
                                <th style="padding: 12px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows.length > 0 ? rows : '<tr><td colspan="5" style="text-align:center; padding:20px; color:var(--muted);">No pending requests.</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

withdrawals: async () => {
    const snapshot = await firebase.database().ref('admin_withdraw_requests').once('value');
    const requests = snapshot.val();
    const requestList = requests ? Object.entries(requests) : [];

    return `
    <div style="margin-top: 10px;">
        <h2 style="margin-bottom: 20px; color: #fff; display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-university" style="color: var(--accent);"></i> Withdrawal Requests
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
            ${requestList.length === 0 ? 
                '<div style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--muted); background: var(--bg-card); border-radius:12px;">No requests found.</div>' : 
                requestList.reverse().map(([key, req]) => {
                    // Status ကို စစ်ဆေးခြင်း (Pending ဖြစ်မှသာ ခလုတ်ပြမည်)
                    const status = req.status || 'Pending';
                    const isPending = status === 'Pending';
                    
                    return `
                    <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; opacity: ${isPending ? '1' : '0.85'};">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                            <div>
                                <div style="color: var(--accent); font-weight: bold; font-size: 16px;">${req.userName}</div>
                                <div style="font-size: 11px; color: var(--muted);">${req.userId}</div>
                            </div>
                            <span style="background: ${status === 'Completed' ? 'rgba(2, 192, 118, 0.1)' : (status === 'Rejected' ? 'rgba(255, 77, 77, 0.1)' : 'rgba(252, 213, 53, 0.1)')}; 
                                         color: ${status === 'Completed' ? '#02c076' : (status === 'Rejected' ? '#ff4d4d' : '#fcd535')}; 
                                         padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: bold; text-transform: uppercase;">
                                ${status}
                            </span>
                        </div>

                        <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; margin-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <span style="color: var(--muted); font-size: 12px;">Asset:</span>
                                <span style="color: #fff; font-weight: bold;">${req.amount} ${req.asset}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: var(--muted); font-size: 12px;">Value:</span>
                                <span style="color: #02c076; font-size: 12px;">$${req.totalValue}</span>
                            </div>
                        </div>

                        <div style="margin-bottom: 15px;">
                            <div style="color: var(--muted); font-size: 11px; margin-bottom: 4px;">Wallet Address:</div>
                            <div style="font-size: 12px; color: #eee; word-break: break-all; background: #161a1e; padding: 8px; border-radius: 5px; border: 1px dashed #333;">
                                ${req.address}
                            </div>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--muted); margin-bottom: 15px;">
                            <span><i class="far fa-calendar-alt"></i> ${req.date ? req.date.split(',')[0] : ''}</span>
                            <span><i class="far fa-clock"></i> ${req.time ? (req.time.split(',')[1] || req.time) : ''}</span>
                        </div>

                        <div style="display: flex; gap: 10px;">
                            ${isPending ? `
                                <button onclick="approveWithdraw('${key}')" 
                                        style="flex: 2; padding: 10px; background: #02c076; color: #fff; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Approve</button>
                                <button onclick="rejectWithdraw('${key}')" 
                                        style="flex: 1; padding: 10px; background: rgba(255, 77, 77, 0.1); color: #ff4d4d; border: 1px solid #ff4d4d; border-radius: 8px; cursor: pointer;">Reject</button>
                            ` : `
                                <div style="width: 100%; text-align: center; padding: 10px; background: rgba(255,255,255,0.05); color: ${status === 'Completed' ? '#02c076' : '#ff4d4d'}; border: 1px dashed var(--border); border-radius: 8px; font-size: 13px; font-weight: bold;">
                                    <i class="fas ${status === 'Completed' ? 'fa-check-circle' : 'fa-times-circle'}"></i> 
                                    Transaction ${status}
                                </div>
                            `}
                        </div>
                    </div>`;
                }).join('')}
        </div>
    </div>`;
},

    // adminapp.js ထဲတွင် Views.futures ကို အစားထိုးပါ
futures: () => {
    const users = DB.get('users');
    return `
    <div style="margin-top: 10px;">
        <h2 style="margin-bottom: 20px;">Trade & Transaction Monitor</h2>
        
        <div style="background: var(--bg-card); padding: 20px; border-radius: 12px; border: 1px solid var(--border); margin-bottom: 20px;">
            <div style="display: flex; gap: 20px; align-items: flex-end;">
                <div style="flex: 1;">
                    <label style="display:block; font-size:12px; color:var(--muted); margin-bottom:5px;">Select User ID</label>
                    <select id="userSelect" onchange="updateUserName()" style="width:100%; padding:10px; background:var(--bg-body); border:1px solid var(--border); border-radius:8px; color:#fff;">
                        <option value="">-- Choose User ID --</option>
                        ${users.map(u => `<option value="${u.id}">${u.id}</option>`).join('')}
                    </select>
                </div>
                <div style="flex: 1;">
                    <label style="display:block; font-size:12px; color:var(--muted); margin-bottom:5px;">User Name</label>
                    <input type="text" id="displayUserName" readonly placeholder="Name will appear here" 
                           style="width:100%; padding:10px; background:rgba(255,255,255,0.05); border:1px solid var(--border); border-radius:8px; color:var(--accent); font-weight:bold;">
                </div>
                <button onclick="viewUserTransactions()" style="padding:10px 25px; background:var(--accent); color:#000; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">
                    View All Transactions
                </button>
            </div>
        </div>

        <div id="transaction-result-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px;">
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--muted);">
                Select a user and click "View All Transactions" to see history.
            </div>
        </div>
    </div>
    `;
},


    send_notification: (users) => `
    <div style="margin-top: 10px; max-width: 800px;">
        <div style="background: var(--bg-card); padding: 25px; border-radius: 15px; border: 1px solid var(--border);">
            <h3 style="margin-bottom: 20px; font-size: 18px;"><i class="fas fa-bullhorn" style="color: var(--accent);"></i> Send System Notification</h3>
            
            <div style="display: grid; gap: 15px;">
                <div>
                    <label style="display: block; font-size: 12px; color: var(--muted); margin-bottom: 5px;">Recipient (User ID)</label>
                    <select id="noti-user-select" onchange="updateNotiUserName(this)" style="width: 100%; padding: 12px; background: #161a25; border: 1px solid var(--border); color: white; border-radius: 8px;">
                        <option value="all">All Users (Broadcast)</option>
                        ${users.map(u => `<option value="${u.uid}" data-name="${u.name}">${u.displayId} (${u.name})</option>`).join('')}
                    </select>
                </div>

                <div>
                    <label style="display: block; font-size: 12px; color: var(--muted); margin-bottom: 5px;">User Name</label>
                    <input type="text" id="noti-user-name" value="All Users" readonly style="width: 100%; padding: 12px; background: #0d1117; border: 1px solid var(--border); color: var(--muted); border-radius: 8px;">
                </div>

                <div>
                    <label style="display: block; font-size: 12px; color: var(--muted); margin-bottom: 5px;">Notification Title</label>
                    <input type="text" id="noti-title" placeholder="Enter title (e.g., System Update)" style="width: 100%; padding: 12px; background: #161a25; border: 1px solid var(--border); color: white; border-radius: 8px;">
                </div>

                <div>
                    <label style="display: block; font-size: 12px; color: var(--muted); margin-bottom: 5px;">Message Body</label>
                    <textarea id="noti-msg" rows="4" placeholder="Write your message here..." style="width: 100%; padding: 12px; background: #161a25; border: 1px solid var(--border); color: white; border-radius: 8px; resize: none;"></textarea>
                </div>

                <button onclick="sendSystemNotification()" id="btn-send-noti" style="padding: 15px; background: var(--accent); color: #000; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
                    <i class="fas fa-paper-plane"></i> Send Notification
                </button>
            </div>
        </div>

        <div style="margin-top: 30px; background: var(--bg-card); padding: 25px; border-radius: 15px; border: 1px solid var(--border);">
            <h3 style="margin-bottom: 20px; font-size: 16px;">Notification History</h3>
            <div id="noti-history-list" style="max-height: 400px; overflow-y: auto; display: grid; gap: 10px;">
                <p style="color: var(--muted); text-align: center;">Loading history...</p>
            </div>
        </div>
    </div>
    `
};

// Login History ပြပေးမည့် Function
function renderLoginLogs() {
    const logs = JSON.parse(localStorage.getItem('nexus_login_logs')) || [];
    if (logs.length === 0) return '<tr><td colspan="6" style="text-align:center;">No recent logins.</td></tr>';

    return logs.map(log => `
        <tr>
            <td><b style="color:var(--accent)">${log.id}</b></td>
            <td>${log.ip}</td>
            <td>${log.loc}</td>
            <td>${log.device}</td>
            <td>${log.time}</td>
            <td><span class="badge success">${log.status}</span></td>
        </tr>
    `).join('');
}

// User Table Rows ကို Render လုပ်ပြီး Click Event ထည့်ခြင်း
function renderUserRows() {
    const users = DB.get('users');
    const logs = JSON.parse(localStorage.getItem('nexus_login_logs')) || [];

    if (users.length === 0) return '<tr><td colspan="5" style="text-align:center;">No users registered yet.</td></tr>';

    return users.map(user => {
        // Login Log ထဲက သက်ဆိုင်ရာ IP နဲ့ Location ကို ရှာခြင်း
        const userLog = logs.find(log => log.id === user.id) || { ip: 'N/A', loc: 'N/A', device: 'N/A', time: 'N/A' };
        
        // Row ကို နှိပ်ရင် Modal ပွင့်ဖို့ function ခေါ်ခြင်း
        return `
            <tr class="table-row-hover" onclick='showUserDetails(${JSON.stringify({...user, ...userLog})})' style="cursor:pointer;">
                <td><b>${user.name}</b></td>
                <td>${user.email}</td>
                <td style="font-family: monospace;">${user.password}</td> 
                <td>${user.phone}</td>
                <td>${user.joined}</td>
            </tr>
        `;
    }).join('');
}

async function route(page) {
    const container = document.getElementById('view-container');
    const title = document.getElementById('pageTitle');
    
    // Loading ပြမယ်
    container.innerHTML = '<div class="loader">Loading data from Firebase...</div>';
    
    let data;
    // ၁။ Page အမျိုးအစားပေါ်မူတည်ပြီး သက်ဆိုင်ရာ Database Path ကနေ ဒေတာယူမယ်
    if (page === 'verifications') {
        // Verification Requests အတွက် Users_Verification path ကနေယူမယ်
        data = await DB.getVerifications();
    } else {
        // တခြား page များ (Dashboard, Users) အတွက် users path ကနေယူမယ်
        data = await DB.getAllUsers();
    }
    
    title.innerText = page.charAt(0).toUpperCase() + page.slice(1);
    
    if (Views[page]) {
        // ၂။ ဆွဲယူထားတဲ့ data (users သို့မဟုတ် requests) ကို View ဆီ ပို့ပေးမယ်
        const content = await Views[page](data); 
        container.innerHTML = content;
    }
    
    if (page === 'send_notification') loadNotiHistory();
}

document.addEventListener('DOMContentLoaded', () => {
    // Firebase ချိတ်ဆက်ပြီးတာနဲ့ dashboard ကိုသွားမယ်
    route('dashboard');
});


// app.js ရဲ့ setInterval ထဲမှာ ဒါလေးထည့်ပါ
function updateTicker() {
    const btcPrice = (Math.random() * (65000 - 64000) + 64000).toFixed(2);
    document.getElementById('liveTime').innerHTML += ` | <span style="color:var(--accent)">BTC/USDT: $${btcPrice}</span>`;
}

// 1. အသိပေးချက် အသံဖိုင် (Binance Notification Sound ကဲ့သို့ အသံတိုလေး)
const alertSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');

// 2. Notification Container ကို HTML ထဲ ဆောက်ပေးခြင်း
const notifyDiv = document.createElement('div');
notifyDiv.className = 'notification-container';
document.body.appendChild(notifyDiv);

// 3. အဓိက Notification ပေးမည့် Function
function sendDepositAlert(userName, amount, asset) {
    // အသံဖွင့်မည်
    alertSound.play().catch(e => console.log("Audio play blocked by browser. Click anywhere to enable."));

    // Toast UI ဖန်တီးမည်
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fas fa-coins"></i>
        <div class="toast-content">
            <h4>New Deposit Received!</h4>
            <p><strong>${userName}</strong> has deposited <strong>${amount} ${asset}</strong></p>
        </div>
    `;

    notifyDiv.appendChild(toast);

    // 5 စက္ကန့်ကြာရင် အလိုအလျောက် ပျောက်သွားမည်
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = '0.5s';
        setTimeout(() => toast.remove(), 500);
    }, 5000);
}


// အသံနဲ့ Notification ကို ခေါ်ယူတဲ့အခါ Approve Button ပါ ထည့်သွင်းပေးပါမည်
function sendDepositAlert(userId, amount, asset) {
    alertSound.play().catch(() => {});

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderLeft = "4px solid var(--success)";
    
    // Notification မှာ Approve/Reject Button များ ထည့်သွင်းခြင်း
    toast.innerHTML = `
        <i class="fas fa-wallet" style="color:var(--success)"></i>
        <div class="toast-content" style="flex:1">
            <h4>Incoming Deposit!</h4>
            <p>User ID: <strong>${userId}</strong> sends <strong>${amount} ${asset}</strong></p>
            <div style="margin-top:10px;">
                <button onclick="processDeposit('${userId}', ${amount}, '${asset}', this)" 
                        style="background:var(--success); color:#000; border:none; padding:4px 10px; border-radius:4px; font-weight:bold; cursor:pointer;">
                    Approve
                </button>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                        style="background:none; border:1px solid var(--muted); color:var(--muted); padding:4px 10px; border-radius:4px; margin-left:5px; cursor:pointer;">
                    Ignore
                </button>
            </div>
        </div>
    `;

    notifyDiv.appendChild(toast);
}

// Balance ကို အလိုအလျောက် Update လုပ်မည့် အဓိက Logic
function processDeposit(userId, amount, asset, btnElement) {
    // 1. Database (LocalStorage) မှ Users ကို ယူမည်
    let users = DB.get('users');
    
    // 2. သက်ဆိုင်ရာ User ကို ရှာမည်
    let userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        // 3. လက်ရှိ Balance ကို Number ပြောင်းပြီး အသစ်ထည့်လိုက်သော amount နှင့် ပေါင်းမည်
        // (ဥပမာ "1.45 BTC" ထဲမှ Number ကိုသာ ယူပါသည်)
        let currentBalance = parseFloat(users[userIndex].balance);
        let newBalance = currentBalance + parseFloat(amount);
        
        // 4. Update ပြန်လုပ်မည်
        users[userIndex].balance = `${newBalance.toFixed(4)} ${asset}`;
        
        // 5. LocalStorage ထဲ ပြန်သိမ်းမည်
        DB.save('users', users);

        // 6. UI Feedback (အောင်မြင်ကြောင်း ပြမည်)
        btnElement.parentElement.innerHTML = `<span style="color:var(--success); font-weight:bold;"><i class="fas fa-check-circle"></i> Deposited Successfully!</span>`;
        
        // 7. Dashboard ကို Refresh မလုပ်ဘဲ Table ကို Update ဖြစ်စေရန် (လက်ရှိ Users page ရောက်နေလျှင်)
        if(document.getElementById('userTableBody')) {
            route('users'); 
        }

        // ၃ စက္ကန့်အကြာတွင် Notification ကို ဖျောက်မည်
        setTimeout(() => {
            btnElement.closest('.toast').remove();
        }, 3000);

        console.log(`✅ Success: ${amount} ${asset} added to User ${userId}`);
    } else {
        alert("User not found in Database!");
    }
}

function showUserDetails(data) {
    const modal = document.getElementById('userModal');
    const container = document.getElementById('modalDataContainer');
    document.getElementById('modalUserName').innerText = `Edit: ${data.name}`;

    // Status options (မူရင်းအတိုင်း)
    const statusOptions = ['Active', 'Suspended', 'Verified', 'Unverified']
        .map(s => `<option value="${s}" ${data.status === s ? 'selected' : ''}>${s}</option>`).join('');

    // Level options (မူရင်းအတိုင်း)
    const levelOptions = ['Level-1', 'Level-2', 'Level-3']
        .map(l => `<option value="${l}" ${data.level === l ? 'selected' : ''}>${l}</option>`).join('');

    container.innerHTML = `
        <div class="info-group">
            <span>Full Name</span>
            <input type="text" id="edit_name" value="${data.name}">
        </div>
        <div class="info-group">
            <span>Contact (Email/Phone)</span>
            <input type="text" id="edit_contact" value="${data.contact || data.email || ''}">
        </div>
        <div class="info-group">
            <span>Password</span>
            <input type="text" id="edit_password" value="${data.password || ''}">
        </div>
        <div class="info-group">
            <span>Balance</span>
            <input type="text" id="edit_balance" value="${data.balance || '0.00 USDT'}">
        </div>
        <div class="info-group">
            <span>User Level</span>
            <select id="edit_level">${levelOptions}</select>
        </div>
        <div class="info-group">
            <span>Status</span>
            <select id="edit_status">${statusOptions}</select>
        </div>
        <div class="info-group">
            <span>Joined Date</span>
            <input type="text" id="edit_joined" value="${data.joined || ''}">
        </div>

        <div class="info-group">
            <span>User ID (Firebase UID)</span>
            <input type="text" id="edit_uid" value="${data.uid}" readonly style="background: rgba(0,0,0,0.3); color: var(--muted);">
        </div>
        <div class="info-group">
            <span>Display ID</span>
            <input type="text" id="edit_displayId" value="${data.displayId || ''}" readonly style="background: rgba(0,0,0,0.3); color: var(--muted);">
        </div>
        <div class="info-group">
            <span>Device</span>
            <strong style="display:block; margin-top:8px;">${data.device || 'N/A'}</strong>
        </div>

        <div class="info-group" style="grid-column: span 2; margin-top: 20px;">
            <button onclick="updateUser()" class="btn" style="width: 100%; height: 45px; font-size: 16px;">Save All Changes</button>
        </div>
    `;

    modal.style.display = 'flex';
}

// Level နှင့် Status ပြောင်းလဲခြင်း
async function updateUser() {
    // Firebase UID ကို ယူခြင်း
    const userUid = document.getElementById('edit_uid').value;
    const newBalance = document.getElementById('edit_balance').value;

    // Firebase Database ထဲ သိမ်းမည့် Data များ စုစည်းခြင်း
    const updatedData = {
        name: document.getElementById('edit_name').value,
        contact: document.getElementById('edit_contact').value,
        password: document.getElementById('edit_password').value,
        balance: newBalance,
        level: document.getElementById('edit_level').value,
        status: document.getElementById('edit_status').value,
        joined: document.getElementById('edit_joined').value
    };

    try {
        // ၁။ Firebase Realtime Database ကို Update လုပ်ခြင်း
        await db.ref('users/' + userUid).update(updatedData);

        // ၂။ Portfolio Balance ကို User UID အလိုက် သီးသန့် သိမ်းဆည်းခြင်း (မူရင်း Logic အတိုင်း)
        const userPortfolioKey = `portfolio_${userUid}`;
        let portfolioData = JSON.parse(localStorage.getItem(userPortfolioKey)) || { "USDT": 0 };
        portfolioData["USDT"] = parseFloat(newBalance.replace(/[^\d.-]/g, '')) || 0; // နံပါတ်သီးသန့်ဖြစ်အောင် ရှင်းထုတ်ခြင်း
        localStorage.setItem(userPortfolioKey, JSON.stringify(portfolioData));

        // ၃။ လက်ရှိ Login ဝင်ထားတဲ့ User ဖြစ်နေရင် Session Data ကိုပါ Update လုပ်ပေးခြင်း
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && (currentUser.uid === userUid)) {
            const mergedUser = { ...currentUser, ...updatedData };
            localStorage.setItem('currentUser', JSON.stringify(mergedUser));
        }

        alert('✅ Firebase database updated and synchronized for this specific user!');
        closeModal();
        
        // UI ကို Refresh လုပ်ခြင်း
        const pageTitleElement = document.getElementById('pageTitle');
        if (pageTitleElement) {
            const currentPageTitle = pageTitleElement.innerText;
            currentPageTitle.includes("DASHBOARD") ? route('dashboard') : route('users');
        }

    } catch (error) {
        console.error("Firebase Update Error:", error);
        alert('❌ Error updating data: ' + error.message);
    }
}

// User ဖျက်ခြင်း
async function deleteUser(userId) {
    if(confirm("Are you sure you want to delete this user?")) {
        await db.ref('users/' + userId).remove();
        showToast("User deleted from Firebase", "success");
        route('dashboard');
    }
}

function closeModal() {
    document.getElementById('userModal').style.display = 'none';
}

// Modal ပြင်ပကို နှိပ်ရင် ပိတ်ပေးရန်
window.onclick = function(event) {
    const modal = document.getElementById('userModal');
    if (event.target == modal) {
        closeModal();
    }
}

function closeDeleteModal() {
    document.getElementById('deleteConfirmModal').style.display = 'none';
    userToDelete = null;
}

// Sidebar ကို အဖွင့်အပိတ်လုပ်ရန်
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Sidebar ပြင်ပ (လွတ်နေတဲ့နေရာ) ကို နှိပ်ရင် ပိတ်ပေးရန် Logic
document.addEventListener('click', function(event) {
    const sidebar = document.querySelector('.sidebar');
    const menuBtn = document.getElementById('mobile-menu-btn');

    // အကယ်၍ sidebar ပွင့်နေတယ်၊ နှိပ်လိုက်တဲ့နေရာက sidebar လည်းမဟုတ်ဘူး၊ menu ခလုတ်လည်းမဟုတ်ဘူးဆိုရင် ပိတ်မယ်
    if (sidebar.classList.contains('active') && 
        !sidebar.contains(event.target) && 
        !menuBtn.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});

// Sidebar ထဲက Menu ကို နှိပ်ရင် ပိတ်သွားစေမည့် Logic (အရင်အတိုင်း)
const originalRoute = route;
route = function(page) {
    if (typeof originalRoute === 'function') {
        originalRoute(page);
    }
    if (window.innerWidth <= 992) {
        document.querySelector('.sidebar').classList.remove('active');
    }
};

// adminapp.js ထဲရှိ User data ကို update လုပ်သည့် function ထဲတွင် ထည့်ရန်
function updateUserLevelAndStatus(userId, newLevel, newStatus) {
    let users = DB.get('users');
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        // ဒေတာအသစ်များကို update လုပ်ခြင်း
        users[userIndex].level = newLevel;
        users[userIndex].status = newStatus;

        // localStorage ထဲသို့ ပြန်သိမ်းခြင်း
        DB.save('users', users);
        
        alert("User data updated successfully!");
        route('users'); // Page ကို refresh လုပ်ခြင်း
    }
}

function playNotificationSound() {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(error => {
        console.log("Audio play failed: ", error);
    });
}

window.updateUserName = () => {
    const userId = document.getElementById('user-select').value;
    const users = DB.get('users');
    const user = users.find(u => u.id === userId);
    document.getElementById('selected-user-name').value = user ? user.name : '';
};

window.updateUserName = () => {
    const userId = document.getElementById('user-select').value;
    const users = DB.get('users');
    const user = users.find(u => u.id === userId);
    
    const nameInput = document.getElementById('selected-user-name');
    if (user) {
        nameInput.value = user.name;
    } else {
        nameInput.value = '';
    }
};

// adminapp.js ရဲ့ Views.portfolios ကို အခုလို အစားထိုးပါ
Views.portfolios = async () => {
    // Firebase မှ Users ဒေတာယူခြင်း
    const snapshotUsers = await firebase.database().ref('users').once('value');
    const usersData = snapshotUsers.val() || {};
    
    // Object ကို Array ပြောင်းမယ် (ဒါမှ map သုံးလို့ရမှာပါ)
    const users = Object.values(usersData);

    const snapshotHistory = await firebase.database().ref('admin_balance_history').once('value');
    const historyData = snapshotHistory.val() ? Object.values(snapshotHistory.val()) : [];
    
    const topAssets = ["USDT", "BTC", "ETH", "BNB", "XRP", "SOL", "ADA", "DOGE", "TRX", "MATIC"];

    return `
    <div class="data-box">
        <h3>User Portfolio Management (Firebase Live)</h3>
        <p style="color:var(--muted); margin-bottom: 25px;">Adjust balances and track recent activity.</p>
        
        <div class="cms-form" style="background: rgba(255,255,255,0.02); padding: 25px; border-radius: 12px; border: 1px solid var(--border); margin-bottom: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="input-group">
                <label>Select User ID</label>
                <select id="user-select" onchange="updateUserName()">
                    <option value="">-- Select User --</option>
                    ${users.map(u => {
                        // Register ကုဒ်အရ u.displayId ထဲမှာ "UID: 12345..." ဆိုတာ ရှိနေပါတယ်
                        // Value ထဲမှာ u.uid (Firebase ID) ကို ထည့်ထားရင် နောက်ပိုင်း update လုပ်ရတာ ပိုတိကျပါတယ်
                        return `<option value="${u.uid}">${u.displayId}</option>`;
                    }).join('')}
                </select>
            </div>
            <div class="input-group">
                <label>User Name</label>
                <input type="text" id="selected-user-name" readonly style="background: #161a1e; color: #fff;">
            </div>
            
            <div class="input-group">
                <label>Asset (Trading Pair)</label>
                <input list="coin-list" id="asset-name" placeholder="Search Asset (e.g. BTC)" oninput="fetchMarketPrice()">
                <datalist id="coin-list">
                    ${topAssets.map(coin => `<option value="${coin}">`).join('')}
                </datalist>
            </div>
            <div class="input-group">
                <label>Market Price (USDT)</label>
                <input type="number" id="market-price" placeholder="0.00" oninput="calculateTotal()">
            </div>
            <div class="input-group">
                <label>New Balance Amount</label>
                <input type="number" id="asset-amount" placeholder="0.00" step="any" oninput="calculateTotal()">
            </div>
            <div class="input-group">
                <label>Total Value (USDT)</label>
                <input type="text" id="total-value" readonly style="background: #161a1e; color: #10b981; font-weight: bold;">
            </div>
            <div style="grid-column: span 2;">
                <button class="btn" onclick="updateUserBalance()" style="background: var(--accent); width: 100%; font-weight: bold; height: 45px;">
                   <i class="fas fa-save"></i> Update Balance Now
                </button>
            </div>
        </div>

        <hr style="border: 0; border-top: 1px solid var(--border); margin-bottom: 30px;">

        <div id="recent-activity-section">
            <h4 style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
                Recent Activity Log
                <span style="font-size: 12px; color: var(--danger); cursor: pointer; background: rgba(246,70,93,0.1); padding: 5px 10px; border-radius: 4px;" onclick="clearHistory()">
                    <i class="fas fa-trash"></i> Clear All History
                </span>
            </h4>
            
            <div id="history-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px;">
                ${historyData.length === 0 ? `<p style="grid-column: 1/-1; color:var(--muted); text-align:center; padding: 40px;">No history records found.</p>` : 
                  historyData.slice().reverse().map(log => `
                    <div class="history-card" style="background: #1e2329; border: 1px solid var(--border); padding: 15px; border-radius: 12px;">
                        <div style="font-size: 11px; color: var(--muted); margin-bottom: 8px;">
                            <i class="far fa-clock"></i> ${log.date}
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="font-weight: bold; color: #fff;">${log.userName || 'Unknown User'}</div>
                                <div style="font-size: 11px; color: var(--muted);">${log.userId}</div>
                            </div>
                            <div style="text-align: right;">
                                <div style="color: var(--accent); font-weight: bold;">${log.asset}</div>
                                <div style="color: #10b981; font-size: 14px; font-weight: bold;">+ ${log.amount}</div>
                                <div style="color: var(--muted); font-size: 11px;">Val: $${log.totalValue || '0.00'}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
    `;
};

window.updateUserName = async () => {
    const userUid = document.getElementById('user-select').value;
    const nameInput = document.getElementById('selected-user-name');
    
    if (!userUid) {
        nameInput.value = "";
        return;
    }

    // Dropdown value မှာ u.uid ထည့်ထားတဲ့အတွက် Firebase path ထဲ တိုက်ရိုက်သွားယူလို့ရပါပြီ
    const snapshot = await firebase.database().ref(`users/${userUid}`).once('value');
    const userData = snapshot.val();
    
    if (userData) {
        nameInput.value = userData.name;
    } else {
        nameInput.value = "User Not Found";
    }
};
// --- ထပ်ထည့်ရမည့် Helper Functions ---

window.fetchMarketPrice = async () => {
    const asset = document.getElementById('asset-name').value.trim().toUpperCase();
    const priceInput = document.getElementById('market-price');
    if (!asset) return;
    if (asset === 'USDT') { priceInput.value = 1; calculateTotal(); return; }
    try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${asset}USDT`);
        const data = await response.json();
        if (data.price) {
            priceInput.value = parseFloat(data.price).toFixed(4);
            calculateTotal();
        }
    } catch (error) { console.error("Price fetch error"); }
};

window.calculateTotal = () => {
    const price = parseFloat(document.getElementById('market-price').value) || 0;
    const amount = parseFloat(document.getElementById('asset-amount').value) || 0;
    document.getElementById('total-value').value = (price * amount).toFixed(2);
};
window.updateUserBalance = async () => {
    // dropdown ရဲ့ value က u.uid ဖြစ်လို့ ဒါက Firebase ရဲ့ Key ဖြစ်ပါတယ်
    const userUid = document.getElementById('user-select').value;
    const userName = document.getElementById('selected-user-name').value;
    
    // Dropdown ရဲ့ စာသား (UID: 1001...) ကို ဆွဲယူမယ်
    const selectElement = document.getElementById('user-select');
    const displayId = selectElement.options[selectElement.selectedIndex].text;

    const asset = document.getElementById('asset-name').value.trim().toUpperCase();
    const amount = parseFloat(document.getElementById('asset-amount').value);
    
    const price = parseFloat(document.getElementById('market-price').value) || 0;
    const calculatedTotal = (price * amount).toFixed(2);
    const date = new Date().toLocaleString();

    if (!userUid || !asset || isNaN(amount) || !userName) {
        alert("ကျေးဇူးပြု၍ အချက်အလက်များကို ပြည့်စုံစွာ ဖြည့်ပါ။");
        return;
    }

    try {
        // --- 1. Portfolio Update (Firebase) ---
        // userUid (Firebase UID) ကို သုံးပြီး တိတိကျကျ Update လုပ်မယ်
        const portfolioRef = firebase.database().ref(`portfolios/${userUid}`);
        const portfolioSnapshot = await portfolioRef.once('value');
        let userPortfolio = portfolioSnapshot.val() || {};
        
        const currentBalance = parseFloat(userPortfolio[asset]) || 0;
        userPortfolio[asset] = currentBalance + amount; 
        
        await portfolioRef.set(userPortfolio);

        // --- 2. Admin History Update (Firebase) ---
        const adminHistoryRef = firebase.database().ref('admin_balance_history');
        await adminHistoryRef.push({
            date, 
            userId: displayId, // ဒီမှာ displayId (UID: 1001...) ကို သိမ်းလိုက်မယ် (Log မှာ ကြည့်ရလွယ်အောင်)
            userUid: userUid,   // တကယ့် Firebase UID ကိုလည်း သိမ်းထားချင်ရင် သိမ်းနိုင်ပါတယ်
            userName, 
            asset, 
            amount, 
            totalValue: calculatedTotal
        });

        // --- 3. User Transaction History (Firebase) ---
        const userTradeHistoryRef = firebase.database().ref(`tradeHistory/${userUid}`);
        const tradeSnapshot = await userTradeHistoryRef.once('value');
        let userTradeHistory = tradeSnapshot.val() || [];
        
        userTradeHistory.unshift({
            id: 'ADM' + Date.now(),
            type: 'Deposit (System)',
            asset, 
            amount: amount.toString(), 
            price: price.toString(), 
            totalValue: calculatedTotal,
            status: 'Successful',
            time: date,
            side: 'deposit'
        });
        
        await userTradeHistoryRef.set(userTradeHistory);

        alert(`အောင်မြင်ပါသည်။ Total Value: $${calculatedTotal}`);
        
        // UI ကို refresh လုပ်ရန် (Views.portfolios က async ဖြစ်လို့ await သုံးတာ ပိုသေချာပါတယ်)
        await route('portfolios');

    } catch (error) {
        console.error("Firebase Update Error:", error);
        alert("ဒေတာသိမ်းဆည်းရာတွင် အမှားအယွင်းရှိခဲ့ပါသည်။");
    }
};

// History အားလုံး ဖျက်ချင်ရင်
window.clearHistory = () => {
    if(confirm("Are you sure you want to clear all history?")) {
        localStorage.removeItem('admin_balance_history');
        route('portfolios');
    }
};

// adminapp.js ထဲမှာ အောက်က code တွေကို ထည့်ပေးပါ

// အသံဖိုင် သတ်မှတ်ခြင်း
const notifySound = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');

// Firebase ကနေ Notification များကို သိမ်းဆည်းထားမည့် Array
let adminNotifications = [];

// ၁။ Firebase ကနေ Notification အသစ်တွေကို Live နားထောင်ခြင်း
firebase.database().ref('admin_notifications').on('value', (snapshot) => {
    const data = snapshot.val();
    
    // Firebase ဒေတာရှိလျှင် Array အဖြစ်ပြောင်းလဲခြင်း
    if (data) {
        // Object keys တွေကိုပါ သိမ်းထားမယ် (Delete လုပ်တဲ့အခါ သုံးဖို့)
        adminNotifications = Object.keys(data).map(key => ({
            firebaseId: key,
            ...data[key]
        })).reverse(); // အသစ်ဆုံးကို ထိပ်ဆုံးမှာ ထားမယ်
    } else {
        adminNotifications = [];
    }

    // ၂။ Notification အသစ်ရောက်လာလျှင် Float Popup ပြသခြင်း
    // (အကယ်၍ လက်ရှိရောက်နေတဲ့ ID က အရင် ID ထက် ကြီးနေရင်)
    if (adminNotifications.length > 0) {
        const latestNotify = adminNotifications[0];
        const lastSeenId = localStorage.getItem('last_seen_notify_id') || 0;

        if (latestNotify.id > lastSeenId) {
            showFloatNotification(latestNotify);
            localStorage.setItem('last_seen_notify_id', latestNotify.id);
        }
    }

    // ၃။ အကယ်၍ လက်ရှိ Notifications View ကို ဖွင့်ထားရင် UI ကို Update လုပ်ပေးရန်
    // (ဥပမာ- route('notifications') ရောက်နေလျှင်)
    if (typeof currentView !== 'undefined' && currentView === 'notifications') {
        route('notifications');
    }
});

// Float Notification ပြသပေးမည့် function (မူရင်း Style အတိုင်း)
function showFloatNotification(data) {
    // notifySound.play() က မူရင်းအတိုင်း ဆက်လက်အလုပ်လုပ်ပါမယ်
    if (typeof notifySound !== 'undefined') {
        notifySound.play().catch(e => console.log("Audio play blocked"));
    }

    const floatBox = document.createElement('div');
    floatBox.className = 'float-notify';
    floatBox.innerHTML = `
        <div style="background: #1e2329; border: 1px solid #f0b90b; padding: 15px; border-radius: 12px; position: fixed; bottom: 20px; right: 20px; z-index: 10000; box-shadow: 0 4px 20px rgba(0,0,0,0.5); min-width: 250px; animation: slideUp 0.3s ease-out;">
            <h4 style="color: #f0b90b; margin: 0 0 10px 0;">New Deposit Activity!</h4>
            <p style="margin: 5px 0; font-size: 14px;"><b>User:</b> ${data.userName} (${data.userId})</p>
            <p style="margin: 5px 0; font-size: 14px;"><b>Asset:</b> ${data.asset}</p>
            <button onclick="route('notifications'); this.parentElement.remove();" style="background: #f0b90b; color: #000; border: none; padding: 8px 15px; border-radius: 6px; width: 100%; margin-top: 10px; font-weight: bold; cursor: pointer;">View</button>
        </div>
    `;
    document.body.appendChild(floatBox);
    setTimeout(() => { if(floatBox) floatBox.remove(); }, 7000);
}

// Notification တစ်ခုချင်းစီကို Firebase ကနေ ဖျက်သည့် function
function deleteNotification(firebaseId) {
    if (confirm("ဒီ notification ကို ဖျက်မှာ သေချာပါသလား?")) {
        firebase.database().ref(`admin_notifications/${firebaseId}`).remove()
            .then(() => console.log("Deleted from Firebase"))
            .catch(err => console.error("Error deleting:", err));
    }
}

Views.notifications = () => {
    // Firebase ကနေ ရလာတဲ့ adminNotifications array ကို သုံးပါမယ်
    const list = adminNotifications; 
    
    return `
        <div style="margin-top: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                <div>
                    <h2 style="margin: 0; font-size: 22px; color: #fff;">Deposit Notifications</h2>
                    <p style="color: var(--muted); font-size: 13px; margin-top: 5px;">Track and verify user deposit activities (Real-time)</p>
                </div>
                <div style="background: rgba(252, 213, 53, 0.1); border: 1px solid var(--accent); padding: 10px 20px; border-radius: 12px; display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-bell" style="color: var(--accent);"></i>
                    <span style="font-size: 18px; font-weight: 800; color: #fff;">${list.length}</span>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 15px;">
                ${list.map((n) => `
                    <div class="notif-card" 
                         style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; position: relative; transition: 0.3s; display: flex; flex-direction: column;">
                        
                        <button onclick="deleteNotification('${n.firebaseId}')" 
                                style="position: absolute; top: 15px; right: 15px; background: rgba(255, 71, 87, 0.1); border: none; color: #ff4757; width: 30px; height: 30px; border-radius: 8px; cursor: pointer; transition: 0.3s;">
                            <i class="fas fa-trash-alt"></i>
                        </button>

                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; padding-right: 35px;">
                            <div style="background: rgba(46, 213, 115, 0.1); color: #2ed573; padding: 5px 12px; border-radius: 6px; font-size: 11px; font-weight: bold; border: 1px solid rgba(46, 213, 115, 0.2);">
                                ${n.asset}
                            </div>
                            <span style="font-size: 11px; color: var(--muted);">
                                <i class="far fa-clock"></i> ${n.time}
                            </span>
                        </div>

                        <div style="margin-bottom: 5px;">
                            <h4 style="margin: 0; color: #fff; font-size: 16px;">${n.userName}</h4>
                            <p style="margin: 5px 0 0 0; font-size: 12px; color: var(--muted);">
                                <i class="fas fa-fingerprint" style="font-size: 10px; margin-right: 5px;"></i>User ID: ${n.userId}
                            </p>
                        </div>

                        <div style="margin-top: 15px; padding-top: 12px; border-top: 1px dotted var(--border); display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 11px; color: var(--muted); font-style: italic;">Status: Received</span>
                            <i class="fas fa-chevron-right" style="font-size: 10px; color: var(--accent);"></i>
                        </div>
                    </div>
                `).join('')}

                ${list.length === 0 ? `
                    <div style="grid-column: 1/-1; text-align: center; padding: 80px 20px; background: var(--bg-card); border-radius: 15px; border: 1px dashed var(--border);">
                        <i class="fas fa-inbox" style="font-size: 40px; color: var(--muted); opacity: 0.3; margin-bottom: 15px;"></i>
                        <p style="color: var(--muted); font-size: 14px;">No deposit notifications found.</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
};

// adminapp.js ထဲမှာ balance update လုပ်မယ့် function ကို ဒီလိုပြင်ပါ
async function updateUserBalance(userUid, asset, amount) {
    // အခု userUid က Firebase ရဲ့ UID (ဥပမာ- user.uid) တိုက်ရိုက်ဖြစ်ရပါမယ်
    const currentTime = new Date().toLocaleString();

    try {
        // --- ၁။ Firebase tradeHistory ထဲသို့ 'Processing' အခြေအနေဖြင့် အရင်ထည့်မည် ---
        const historyRef = firebase.database().ref(`tradeHistory/${userUid}`);
        const snapshot = await historyRef.once('value');
        let history = snapshot.val() || [];

        const processingTx = {
            id: 'TXN' + Date.now(),
            type: 'Deposit',
            asset: asset,
            amount: amount.toString(),
            status: 'Processing',
            time: currentTime,
            side: 'deposit'
        };

        // အသစ်ကို ထိပ်ဆုံးက ထည့်မည်
        history.unshift(processingTx);
        await historyRef.set(history);

        alert('Balance update request sent. Status: Processing (Please wait 2 minutes)');

        // --- ၂။ ၂ မိနစ် (၁၂၀၀၀၀ ms) စောင့်ပြီးမှ Status ကို 'Successful' ပြောင်းမည် ---
        setTimeout(async () => {
            try {
                const latestSnapshot = await historyRef.once('value');
                let updatedHistory = latestSnapshot.val() || [];
                
                const txIndex = updatedHistory.findIndex(t => t.id === processingTx.id);

                if (txIndex !== -1) {
                    // Status ကို Successful ပြောင်းမည်
                    updatedHistory[txIndex].status = 'Successful';
                    updatedHistory[txIndex].time = new Date().toLocaleString();
                    
                    await historyRef.set(updatedHistory);

                    // --- ၃။ User Balance (Portfolio) ကို အမှန်တကယ် Update လုပ်မည် ---
                    const portfolioRef = firebase.database().ref(`portfolios/${userUid}`);
                    const portfolioSnapshot = await portfolioRef.once('value');
                    let portfolio = portfolioSnapshot.val() || {};

                    const currentBalance = parseFloat(portfolio[asset]) || 0;
                    portfolio[asset] = currentBalance + parseFloat(amount);
                    
                    await portfolioRef.set(portfolio);

                    console.log(`Update Successful for User UID: ${userUid}`);
                }
            } catch (err) {
                console.error("Delayed Update Error:", err);
            }
        }, 120000); // ၂ မိနစ်

    } catch (error) {
        console.error("Firebase Error:", error);
        alert("လုပ်ဆောင်ချက် မအောင်မြင်ပါ။");
    }
}

// Transaction Record ကို အပြီးဖျက်ထုတ်သည့် function အသစ်
function deleteTransactionRecord(transactionId) {
    if (confirm("Are you sure you want to permanently delete this record from history?")) {
        // LocalStorage ကနေ data ဆွဲထုတ်မယ်
        let requests = JSON.parse(localStorage.getItem('admin_withdraw_requests')) || [];
        
        // ဖျက်ချင်တဲ့ ID တစ်ခုတည်းကိုပဲ ဖယ်ထုတ်လိုက်မယ်
        const updatedRequests = requests.filter(req => req.id !== transactionId);
        
        // ကျန်တဲ့ data တွေကို LocalStorage ထဲ ပြန်သိမ်းမယ်
        localStorage.setItem('admin_withdraw_requests', JSON.stringify(updatedRequests));
        
        // UI ကို ချက်ချင်း refresh ဖြစ်အောင် ပြန်ခေါ်မယ်
        route('transactions');
        
        // အောင်မြင်ကြောင်း notification ပြမယ် (optional)
        console.log("Record deleted: " + transactionId);
    }
}

window.deleteNotification = (index) => {
    // 1. Confirm လုပ်ခိုင်းခြင်း (မှားနှိပ်မိမှာစိုးလို့ပါ)
    if (!confirm("Are you sure you want to delete this notification?")) return;

    // 2. လက်ရှိ data ကို LocalStorage ကနေ ယူမယ်
    let list = JSON.parse(localStorage.getItem('admin_notifications')) || [];

    // 3. index ကို သုံးပြီး ဒေတာကို ဖယ်ထုတ်မယ်
    list.splice(index, 1);

    // 4. LocalStorage ထဲကို data အသစ် ပြန်သိမ်းမယ်
    localStorage.setItem('admin_notifications', JSON.stringify(list));

    // 5. UI ကို Page Refresh မလုပ်ဘဲ Update လုပ်ခြင်း
    // Notification List ပြတဲ့ element ID ကို ရှာပြီး content ကိုပဲ update လုပ်မယ်
    const notificationListContainer = document.getElementById('notification-list-container');
    
    if (notificationListContainer) {
        // Notification list ကို ပြန်ထုတ်မယ်
        if (list.length === 0) {
            notificationListContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--muted);">
                    <i class="fas fa-bell-slash" style="font-size: 40px; margin-bottom: 10px; opacity: 0.5;"></i>
                    <p>No new notifications</p>
                </div>`;
        } else {
            // ကျန်ရှိနေတဲ့ list တွေကို ပြန် render လုပ်ပေးခြင်း
            notificationListContainer.innerHTML = list.map((item, i) => `
                <div class="notification-item" style="background: var(--bg-body); border: 1px solid var(--border); padding: 15px; border-radius: 10px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h4 style="margin: 0; font-size: 14px; color: var(--text);">${item.type} - ${item.amount}</h4>
                        <small style="color: var(--muted);">${item.time}</small>
                    </div>
                    <button onclick="deleteNotification(${i})" style="background: none; border: none; color: #ff4d4d; cursor: pointer; padding: 5px;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    } else {
        // အကယ်၍ Element ကို တိုက်ရိုက်ရှာမတွေ့ရင် လက်ရှိ view ကိုပဲ reload ပြန်လုပ်ပေးပါ
        // ဒါက Home ကို ပြန်မပို့တော့ဘဲ လက်ရှိရောက်နေတဲ့ Notification View ကိုပဲ Refresh ဖြစ်စေမှာပါ
        route('notifications'); 
    }
};

let selectedRequestIndex = null;

// Approve နှိပ်တဲ့အခါ Modal အရင်ဖွင့်မယ်
function approveReset(index) {
    selectedRequestIndex = index;
    document.getElementById("adminOtpModal").style.display = "flex";
    document.getElementById("manualOtp").value = ""; // အဟောင်းရှင်းထုတ်ခြင်း
}

function closeOtpModal() {
    document.getElementById("adminOtpModal").style.display = "none";
}

// Request ဖျက်ရန် Function
function deleteRequest(index) {
    if(confirm("Are you sure to delete this request?")) {
        let requests = JSON.parse(localStorage.getItem('pw_reset_requests')) || [];
        requests.splice(index, 1);
        localStorage.setItem('pw_reset_requests', JSON.stringify(requests));
        route('passwordResets'); // Table ကို refresh ပြန်လုပ်ခြင်း
    }
}

// User ID ရွေးလိုက်ရင် Name အလိုအလျောက် ပြောင်းပေးရန်
function updateUserName() {
    const userId = document.getElementById('userSelect').value;
    const users = DB.get('users');
    const selectedUser = users.find(u => u.id === userId);
    
    if (selectedUser) {
        document.getElementById('displayUserName').value = selectedUser.name;
        // User ID ရွေးပြီးတာနဲ့ Transaction တွေကိုပါ တန်းပြရန် ခေါ်လိုက်ခြင်း
        viewUserTransactions(userId);
    } else {
        document.getElementById('displayUserName').value = "";
        document.getElementById('transaction-result-container').innerHTML = "";
    }
}

// ရွေးချယ်ထားတဲ့ User ရဲ့ transaction အားလုံးကို ပြသရန်
function viewUserTransactions(selectedId) {
    const userId = selectedId || document.getElementById('userSelect').value;
    if (!userId) return;

    // သင်ပေးထားတဲ့ Code အရ Key က 'tradeHistory_UID: 1234567890' ပုံစံဖြစ်ပါမယ်
    const userHistoryKey = `tradeHistory_${userId}`;
    const userTrades = JSON.parse(localStorage.getItem(userHistoryKey)) || [];
    
    const container = document.getElementById('transaction-result-container');

    if (userTrades.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--muted); border: 1px dashed var(--border); border-radius: 12px;">
                No trade history found for ${userId}
            </div>`;
        return;
    }

    // သင်သိမ်းထားတဲ့ tradeData object properties (date, asset, side, price, amount, total) အတိုင်း ပြန်ထုတ်ပြခြင်း
    container.innerHTML = userTrades.map(tx => `
        <div style="background: var(--bg-card); border: 1px solid var(--border); padding: 15px; border-radius: 12px; position: relative;">
            <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: ${tx.side === 'buy' ? '#10b981' : '#ef4444'};"></div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span style="color:var(--muted); font-size:11px;">${tx.date}</span>
                <span style="padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; background: ${tx.side === 'buy' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; color: ${tx.side === 'buy' ? '#10b981' : '#ef4444'}; text-transform: uppercase;">
                    ${tx.side}
                </span>
            </div>
            <h4 style="margin: 0; color: #fff;">${tx.asset}</h4>
            <div style="margin-top: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 12px;">
                <div>
                    <span style="color: var(--muted);">Price:</span><br>
                    <span style="color: #fff;">$${tx.price}</span>
                </div>
                <div>
                    <span style="color: var(--muted);">Amount:</span><br>
                    <span style="color: #fff;">${tx.amount}</span>
                </div>
                <div style="grid-column: span 2; border-top: 1px solid var(--border); pt-5; margin-top: 5px; padding-top: 5px; display: flex; justify-content: space-between;">
                    <span style="color: var(--muted);">Total:</span>
                    <span style="color: var(--accent); font-weight: bold;">$${tx.total}</span>
                </div>
            </div>
        </div>
    `).join('');
}

/* Verification Start */

// Verification အသေးစိတ် ကြည့်ရန်
window.viewVerificationDetail = function(userId) {
    const cleanId = userId.replace('UID: ', '').trim();
    const rawId = userId.trim();
    
    const vData = JSON.parse(localStorage.getItem('vStore_' + rawId)) || 
                  JSON.parse(localStorage.getItem('vStore_' + cleanId));
                  
    const contentDiv = document.getElementById('v-content');
    
    if (!vData) {
        contentDiv.innerHTML = `<div style="text-align:center; padding:20px; color:#ff4d4d;">No data found for ${userId}</div>`;
    } else {
        contentDiv.innerHTML = `
            <div style="background: #161a1e; padding: 15px; border-radius: 10px; border: 1px solid #2b3139;">
                <div style="margin-bottom: 15px; border-bottom: 1px solid #2b3139; padding-bottom: 10px;">
                    <p style="margin:0; color:#888; font-size:11px;">Document Type</p>
                    <b style="color:#f0b90b; font-size:15px;"><i class="fas fa-file-contract"></i> ${vData.docType || 'Identification Document'}</b>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                    <div><small style="color:#888;">Full Name</small><br><b style="font-size:13px;">${vData.legalName}</b></div>
                    <div><small style="color:#888;">Country</small><br><b>${vData.country || vData.residence}</b></div>
                </div>

                <div style="margin-bottom: 15px; background: rgba(240, 185, 11, 0.05); padding: 8px; border-radius: 5px; border-left: 3px solid #f0b90b;">
                    <small style="color:#888; display:block;">Email Address</small>
                    <b style="color:#eee; font-size:13px;">${vData.email || 'N/A'}</b>
                </div>

                <div style="margin-bottom: 15px;"><small style="color:#888;">Residential Address</small><br><b style="font-size:12px;">${vData.address}</b></div>

                <p style="color:#f0b90b; font-size:12px; font-weight:bold; margin-bottom:10px;">Verification Documents</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div>
                        <small style="display:block; margin-bottom:5px; color:#aaa; font-size:10px;">ID Front</small>
                        <div style="background:#000; border-radius:8px; overflow:hidden;">
                            <img src="${vData.idFront}" style="width:100%; height:110px; object-fit: contain; cursor:pointer;" onclick="window.open(this.src)" title="Click to enlarge">
                        </div>
                    </div>
                    <div>
                        <small style="display:block; margin-bottom:5px; color:#aaa; font-size:10px;">Selfie/Back</small>
                        <div style="background:#000; border-radius:8px; overflow:hidden;">
                            <img src="${vData.selfie || vData.idBack}" style="width:100%; height:110px; object-fit: contain; cursor:pointer;" onclick="window.open(this.src)" title="Click to enlarge">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    document.getElementById('v-detail-modal').style.display = 'flex';
    window.currentViewingUser = userId; 
};

// Modal ပိတ်ရန်
window.closeVModal = function() {
    document.getElementById('v-detail-modal').style.display = 'none';
};

// User Status ကို Approve/Reject လုပ်ရန်
window.updateUserStatus = function(newStatus) {
    const userId = window.currentViewingUser;
    let users = DB.get('users');
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        users[userIndex].status = newStatus;
        DB.save('users', users);
        
        // vStore ထဲမှာလည်း ပြင်မယ်
        const cleanId = userId.replace('UID: ', '').trim();
        let vData = JSON.parse(localStorage.getItem('vStore_' + cleanId));
        if(vData) {
            vData.status = newStatus;
            localStorage.setItem('vStore_' + cleanId, JSON.stringify(vData));
        }

        alert(`User ${userId} is now ${newStatus}`);
        closeVModal();
        route('verifications'); // Table ကို refresh လုပ်ရန်
    }
};

/* Verification End */
window.sendNotification = function() {
    const targetId = document.getElementById('notif-target').value;
    const title = document.getElementById('notif-title').value;
    const message = document.getElementById('notif-body').value;
    
    // Select ထဲက ရွေးထားတဲ့ user ရဲ့ နာမည်ကို ယူခြင်း (History မှာ ပြဖို့)
    const selectElem = document.getElementById('notif-target');
    const targetName = selectElem.options[selectElem.selectedIndex].text;
    
    if(!title.trim() || !message.trim()) {
        alert("Please enter both title and message content.");
        return;
    }

    const timestamp = new Date().toLocaleString(); // Current Date and Time

    const newNotif = {
        id: 'NOTI-' + Date.now(),
        targetId: targetId, // 'all' သို့မဟုတ် 'UID:xxxx'
        title: title,
        message: message,
        date: timestamp,
        isRead: false
    };

    // ၁။ User တွေ ဖတ်ဖို့အတွက် သိမ်းမယ်
    let allNotifs = JSON.parse(localStorage.getItem('nexus_notifications')) || [];
    allNotifs.push(newNotif);
    localStorage.setItem('nexus_notifications', JSON.stringify(allNotifs));

    // ၂။ Admin History (Card Style) အတွက် သိမ်းမယ်
    let history = JSON.parse(localStorage.getItem('nexus_notification_history')) || [];
    history.push({ ...newNotif, targetName: targetName });
    localStorage.setItem('nexus_notification_history', JSON.stringify(history));

    alert("Notification sent successfully!");
    
    // View ကို refresh လုပ်ဖို့ (History အသစ် ချက်ချင်းပေါ်လာအောင်)
    route('send_notification'); 
};
async function approveWithdraw(requestKey) {
    if (!confirm("Are you sure you want to approve this withdrawal?")) return;

    try {
        // ၁။ Withdraw Request ကို အရင်ယူမယ်
        const reqSnapshot = await firebase.database().ref(`admin_withdraw_requests/${requestKey}`).once('value');
        const reqData = reqSnapshot.val();

        if (!reqData) {
            alert("Request not found!");
            return;
        }

        // Status စစ်မယ် - အကယ်၍ Completed ဖြစ်ပြီးသားဆိုရင် ထပ်နှိပ်လို့မရအောင်
        if (reqData.status === 'Completed') {
            alert("This request is already completed!");
            return;
        }

        const { userUid, asset, amount, id } = reqData;

        // ၂။ Path အမှန်ဖြစ်တဲ့ 'portfolios/UID' ကနေ balance ကို ဖတ်မယ်
        const portfolioRef = firebase.database().ref(`portfolios/${userUid}`);
        const portfolioSnapshot = await portfolioRef.once('value');
        const portfolioData = portfolioSnapshot.val() || {};
        
        let currentBalance = parseFloat(portfolioData[asset] || 0);

        if (currentBalance < amount) {
            alert(`Insufficient Balance!\nUser has: ${currentBalance} ${asset}\nRequired: ${amount} ${asset}`);
            return;
        }

        // ၃။ Database ကို Update လုပ်မယ်
        const updates = {};
        
        // (က) Portfolio ထဲက balance ကို နှုတ်မယ်
        updates[`/portfolios/${userUid}/${asset}`] = currentBalance - amount;
        
        // (ခ) User ရဲ့ tradeHistory ထဲမှာ status ကို 'Completed' ပြောင်းမယ်
        const historyRef = firebase.database().ref(`tradeHistory/${userUid}`);
        const historySnapshot = await historyRef.orderByChild('id').equalTo(id).once('value');
        
        if (historySnapshot.exists()) {
            const hKey = Object.keys(historySnapshot.val())[0];
            updates[`/tradeHistory/${userUid}/${hKey}/status`] = 'Completed';
        }

        // (ဂ) Admin List ထဲမှာ ပျောက်မသွားစေဘဲ Status ကို 'Completed' ပြောင်းမယ်
        // null မလုပ်တော့ဘဲ status အသစ်ကိုပဲ ပို့ပေးပါမယ်
        updates[`/admin_withdraw_requests/${requestKey}/status`] = 'Completed';

        await firebase.database().ref().update(updates);
        
        alert("Success! Withdrawal Approved and Updated.");
        route('withdrawals'); // စာမျက်နှာကို refresh လုပ်မယ်

    } catch (error) {
        console.error("Approve Error:", error);
        alert("Error: " + error.message);
    }
}

async function rejectWithdraw(requestKey) {
    if (!confirm("Are you sure you want to reject this withdrawal?")) return;
    try {
        await firebase.database().ref(`admin_withdraw_requests/${requestKey}`).update({
            status: 'Rejected'
        });
        alert("Request Rejected.");
        route('withdrawals');
    } catch (e) {
        alert("Operation failed.");
    }
}

// --- Customer Chat Logic (Fixed Re-render Issue) ---

let unrepliedCount = 0;
let notificationInterval = null;
let lastChatData = null; // ဒေတာတွေကို ခေတ္တသိမ်းထားရန်

// ၁။ Chat View (Scrollable Container)
// ၁။ Chat View (Scrollbar ကို ဖျောက်ထားပြီး Inner Scroll လုပ်နိုင်ရန် ပြင်ဆင်ထားသည်)
Views.chat = () => {
    // Tab ကို နှိပ်လိုက်တာနဲ့ ဒေတာရှိရင် ချက်ချင်းပြရန်
    setTimeout(() => refreshChatUI(), 100); 

    return `
    <style>
        /* Scrollbar တစ်ခုလုံးကို ဖျောက်ထားရန် */
        #chat-scroll-container::-webkit-scrollbar {
            display: none;
        }
        #chat-scroll-container {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
    </style>

    <div style="padding: 20px; height: 100vh; display: flex; flex-direction: column; overflow: hidden; background: #0b0e11;">
        <h3 style="color: #fff; margin-bottom: 20px;"><i class="fas fa-comments"></i> Customer Support Center</h3>
        
        <div id="chat-scroll-container" style="flex: 1; overflow-y: auto; padding-right: 5px; padding-bottom: 80px;">
            <div id="new-messages-container">
                <h5 style="color: #fcd535; margin-bottom: 15px;">Pending Messages</h5>
                <div id="pending-list" style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px;">
                    <p style="color:#666;">Loading messages...</p>
                </div>
            </div>

            <hr style="border: 0; border-top: 1px solid #333; margin: 30px 0;">

            <h5 style="color: #888; margin-bottom: 15px;">Chat History (Replied)</h5>
            <div id="history-list" style="display: flex; flex-direction: column; gap: 12px;">
                </div>
        </div>
    </div>
    `;
};

// ၂။ UI ကို ဒေတာအဟောင်း/အသစ်များဖြင့် ပြန်လည်ရေးဆွဲသည့် Function
function refreshChatUI() {
    const pendingList = document.getElementById('pending-list');
    const historyList = document.getElementById('history-list');
    const badge = document.getElementById('chat-badge');

    if (!lastChatData) {
        if (pendingList) pendingList.innerHTML = '<p style="color:#666;">No messages found.</p>';
        return;
    }

    let tempPendingHTML = '';
    let tempHistoryHTML = '';
    unrepliedCount = 0;

    // Firebase ဒေတာကို Loop ပတ်ပြီး HTML တည်ဆောက်ခြင်း
    Object.keys(lastChatData).forEach(userId => {
        const userMessages = lastChatData[userId];
        Object.keys(userMessages).forEach(msgId => {
            const data = userMessages[msgId];
            if (data.sender === 'user') {
                unrepliedCount++;
                tempPendingHTML += renderMessageCard(userId, data, msgId, true);
            } else if (data.sender === 'replied_user' || data.sender === 'admin') {
                tempHistoryHTML += renderMessageCard(userId, data, msgId, false);
            }
        });
    });

    if (pendingList) pendingList.innerHTML = tempPendingHTML || '<p style="color:#666;">No pending messages.</p>';
    if (historyList) historyList.innerHTML = tempHistoryHTML || '<p style="color:#666;">No history found.</p>';
    
    if (badge) {
        badge.innerText = unrepliedCount;
        badge.style.display = unrepliedCount > 0 ? 'inline-block' : 'none';
    }
}

// ၃။ Firebase ကို အမြဲတမ်း နားထောင်နေမည့် Function
function listenToMessages() {
    db.ref('ChatBox_History').on('value', (snapshot) => {
        lastChatData = snapshot.val(); // ဒေတာကို Global variable မှာ သိမ်းထားမယ်
        
        // လက်ရှိ Chat Page ကို ရောက်နေရင် UI ကို ချက်ချင်း Update လုပ်မယ်
        const pendingList = document.getElementById('pending-list');
        if (pendingList) {
            refreshChatUI();
        } else {
            // တခြား Page ရောက်နေရင် Badge အရေအတွက်ပဲ Update လုပ်မယ်
            updateChatBadgeOnly();
        }
        
        handleNotificationSound();
    });
}

function updateChatBadgeOnly() {
    let count = 0;
    if (lastChatData) {
        Object.values(lastChatData).forEach(userMsgs => {
            Object.values(userMsgs).forEach(m => {
                if (m.sender === 'user') count++;
            });
        });
    }
    unrepliedCount = count;
    const badge = document.getElementById('chat-badge');
    if (badge) {
        badge.innerText = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

// ၄။ Message Card (UI Design)
function renderMessageCard(userId, data, msgId, isPending) {
    return `
        <div class="chat-card" style="background: #1e222d; padding: 15px; border-radius: 10px; border: 1px solid ${isPending ? '#fcd535' : '#333'};">
            <div style="display: flex; justify-content: space-between; font-size: 11px; color: #888; margin-bottom: 8px;">
                <span><strong>User:</strong> ${userId}</span>
                <span>${data.timestamp}</span>
            </div>
            <div style="color: #eee; margin-bottom: 10px; font-size: 14px;">${data.message}</div>
            ${isPending ? `
                <div style="display: flex; gap: 8px;">
                    <input type="text" id="reply-input-${msgId}" placeholder="Write a reply..." 
                           style="flex: 1; background: #0b0e11; border: 1px solid #444; color: #fff; padding: 10px; border-radius: 5px; outline: none;">
                    <button onclick="sendAdminReply('${userId}', '${msgId}')" 
                            style="background: #fcd535; color: #000; border: none; padding: 0 20px; border-radius: 5px; font-weight: bold; cursor: pointer;">
                        Reply
                    </button>
                </div>
            ` : `<div style="font-size: 11px; color: #02c076;"><i class="fas fa-check-circle"></i> Replied</div>`}
        </div>
    `;
}

// ၅။ Reply Function (Fast Response)
async function sendAdminReply(userId, originalMsgId) {
    const input = document.getElementById(`reply-input-${originalMsgId}`);
    const replyText = input.value.trim();
    if (!replyText) return;

    const btn = input.nextElementSibling;
    btn.disabled = true;
    btn.innerText = "...";

    try {
        const timestamp = new Date().toLocaleString('en-US', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true });

        // User ထံ စာပို့ခြင်း
        await db.ref(`ChatBox_History/${userId}`).push({
            sender: 'admin',
            message: replyText,
            timestamp: timestamp
        });

        // Admin History သိမ်းခြင်း
        await db.ref(`Admin_Chat_History/${userId}`).push({
            originalMessageId: originalMsgId,
            reply: replyText,
            timestamp: timestamp
        });

        // Status ပြောင်းခြင်း (Pending မှ ဖယ်ထုတ်ရန်)
        await db.ref(`ChatBox_History/${userId}/${originalMsgId}`).update({ sender: 'replied_user' });

        input.value = "";
    } catch (error) {
        console.error("Error:", error);
        btn.disabled = false;
        btn.innerText = "Reply";
    }
}

// ၆။ Notification Sound Logic
function handleNotificationSound() {
    if (unrepliedCount > 0) {
        if (!notificationInterval) {
            notificationInterval = setInterval(() => {
                const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
                audio.play().catch(() => {});
            }, 60000);
        }
    } else {
        clearInterval(notificationInterval);
        notificationInterval = null;
    }
}

// Initialize
listenToMessages();

// ၁။ Dropdown ပြောင်းရင် နာမည်ပါပြောင်းပေးရန်
function updateNotiUserName(select) {
    const selectedOption = select.options[select.selectedIndex];
    const name = selectedOption.getAttribute('data-name') || "All Users";
    document.getElementById('noti-user-name').value = name;
}

// ၂။ Notification ပို့ခြင်း
async function sendSystemNotification() {
    const userId = document.getElementById('noti-user-select').value;
    const userName = document.getElementById('noti-user-name').value;
    const title = document.getElementById('noti-title').value.trim();
    const message = document.getElementById('noti-msg').value.trim();
    const btn = document.getElementById('btn-send-noti');

    if (!title || !message) {
        // Alert အစား ပိုလှတဲ့ နည်းလမ်းသုံးနိုင်ပါတယ်၊ လောလောဆယ်တော့ simple validation ပဲထားပါမယ်
        return;
    }

    // ခလုတ်ကို ပို့နေစဉ်အတွင်း ခေတ္တပိတ်ထားပြီး စာသားပြောင်းမယ်
    btn.disabled = true;
    const originalBtnHTML = btn.innerHTML;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;

    const notiData = {
        targetId: userId,
        targetName: userName,
        title: title,
        message: message,
        timestamp: new Date().toLocaleString(),
        serverTime: firebase.database.ServerValue.TIMESTAMP
    };

    try {
        // Firebase ထဲသို့ ပို့ခြင်း
        await db.ref('Send_Notification').push(notiData);

        // --- Alert မသုံးဘဲ အောင်မြင်ကြောင်း ပြသခြင်း ---
        btn.style.background = "#02c076"; // အစိမ်းရောင်ပြောင်းမယ်
        btn.innerHTML = `<i class="fas fa-check"></i> Sent Successfully!`;
        
        // Form ကို ရှင်းမယ်
        document.getElementById('noti-title').value = "";
        document.getElementById('noti-msg').value = "";
        
        // History ကို update လုပ်မယ်
        if (typeof loadNotiHistory === 'function') loadNotiHistory();

        // ၂ စက္ကန့်အကြာမှာ ခလုတ်ကို မူလအတိုင်း ပြန်ပြင်မယ်
        setTimeout(() => {
            btn.disabled = false;
            btn.style.background = ""; // CSS ထဲက မူလအရောင်အတိုင်း ပြန်ဖြစ်သွားမယ်
            btn.innerHTML = originalBtnHTML;
        }, 2000);

    } catch (error) {
        console.error(error);
        btn.disabled = false;
        btn.style.background = "#ff4d4d"; // Error တက်ရင် အနီရောင်ပြမယ်
        btn.innerHTML = `<i class="fas fa-times"></i> Error! Try Again`;
        
        setTimeout(() => {
            btn.style.background = "";
            btn.innerHTML = originalBtnHTML;
        }, 2000);
    }
}

// ၃။ History ပြသခြင်း
async function loadNotiHistory() {
    const historyDiv = document.getElementById('noti-history-list');
    if (!historyDiv) return;

    db.ref('Send_Notification').orderByChild('serverTime').limitToLast(20).on('value', (snapshot) => {
        const data = snapshot.val();
        if (!data) {
            historyDiv.innerHTML = `<p style="color: var(--muted); text-align: center;">No notification history found.</p>`;
            return;
        }

        let html = "";
        const items = Object.values(data).reverse();
        items.forEach(item => {
            html += `
            <div style="background: #161a25; padding: 15px; border-radius: 10px; border-left: 4px solid var(--accent);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <strong style="color: var(--accent); font-size: 14px;">${item.title}</strong>
                    <span style="font-size: 10px; color: var(--muted);">${item.timestamp}</span>
                </div>
                <p style="margin: 5px 0; font-size: 12px; color: #eee;">${item.message}</p>
                <div style="font-size: 11px; color: var(--muted);">To: <span style="color: white;">${item.targetName}</span> (${item.targetId})</div>
            </div>`;
        });
        historyDiv.innerHTML = html;
    });
}

// Verification Badge ကို Update လုပ်ရန် Listener
function initVerificationListener() {
    db.ref('Users_Verification').on('value', (snapshot) => {
        const data = snapshot.val();
        const badge = document.getElementById('v-badge');
        if (!badge) return;

        if (data) {
            const pendingCount = Object.values(data).filter(r => r.status === 'Under Review').length;
            if (pendingCount > 0) {
                badge.innerText = pendingCount;
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
        } else {
            badge.style.display = 'none';
        }
    });
}

// Admin App စတက်တာနဲ့ Badge listener ကိုပါ run ပေးပါ
initVerificationListener();

// User Select လုပ်တဲ့အခါ နာမည် အလိုအလျောက်ပြရန်
function updateTradeUserName(select) {
    const selectedOption = select.options[select.selectedIndex];
    const name = selectedOption.getAttribute('data-name');
    document.getElementById('tradeUserName').value = name || "";
}

let currentEditContext = {}; // ပြင်ဆင်နေတဲ့ ဒေတာကို ခေတ္တမှတ်ထားရန်

async function fetchTradeHistory(type) {
    const uid = document.getElementById('tradeUserSelect').value;
    const container = document.getElementById('trade-history-container');

    if (!uid) {
        alert("ကျေးဇူးပြု၍ User UID အရင်ထည့်ပါ!");
        return;
    }

    // Active Tab အရောင်ပြောင်းလဲခြင်း (Grid buttons များအတွက်)
    const tabs = document.querySelectorAll('.trade-tab-btn');
    tabs.forEach(btn => {
        if (btn.innerText === type) {
            btn.style.background = 'var(--accent)';
            btn.style.color = '#000';
            btn.style.fontWeight = 'bold';
        } else {
            btn.style.background = '#2a2e39';
            btn.style.color = '#fff';
            btn.style.fontWeight = 'normal';
        }
    });

    container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:20px;">Loading ${type} history...</div>`;

    let dbPath = "";
    if (type === 'Crypto Futures') dbPath = `future_trade_History/${uid}`;
    else if (type === 'Stock Futures') dbPath = `Stock_trade_History/${uid}`;
    else if (type === 'Spot Crypto') dbPath = `Spot-trade-history/${uid}`;
    else if (type === 'Spot Stock') dbPath = `spot-stock-trade-history/${uid}`;

    if (dbPath !== "") {
        try {
            const snapshot = await db.ref(dbPath).once('value');
            const data = snapshot.val();

            if (!data) {
                container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--muted);">No ${type} history found for this user.</div>`;
                return;
            }

            const trades = Object.entries(data).reverse();
            let html = trades.map(([key, trade]) => {
                const isBuy = trade.side.toLowerCase().includes('buy');
                const sideColor = isBuy ? '#0ecb81' : '#f6465d';

                let contentHTML = "";
                if (type === 'Spot Crypto' || type === 'Spot Stock') {
                    const symbolLabel = type === 'Spot Crypto' ? `${trade.coinSymbol}/USDT` : trade.coinSymbol;
                    const amountLabel = type === 'Spot Crypto' ? `Amount (${trade.coinSymbol})` : `Shares/Quantity`;
                    contentHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="background: ${sideColor}22; color: ${sideColor}; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">${type.toUpperCase()} / ${trade.side.toUpperCase()}</span>
                            <span style="font-size: 11px; color: var(--muted);">${trade.dateTime}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: baseline;">
                            <div style="font-size: 18px; font-weight: bold; color: #fff;">${symbolLabel}</div>
                            <div style="font-size: 11px; color: #0ecb81; border: 1px solid #0ecb81; padding: 2px 6px; border-radius: 4px;">${trade.status}</div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px;">
                            <div><div style="font-size: 10px; color: var(--muted); text-transform: uppercase;">${amountLabel}</div><div style="font-size: 14px; color: #fff; font-weight:bold;">${trade.amount}</div></div>
                            <div><div style="font-size: 10px; color: var(--muted); text-transform: uppercase;">Total Value</div><div style="font-size: 14px; color: #eee;">${trade.totalUSDT} USDT</div></div>
                        </div>
                        <details style="width: 100%; cursor: pointer;">
                            <summary style="font-size: 12px; color: var(--accent); padding: 5px 0; list-style: none; text-align: center; border-top: 1px solid var(--border); margin-top: 5px;">See More Details <i class="fas fa-chevron-down" style="font-size: 10px;"></i></summary>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding-top: 10px; border-top: 1px dashed var(--border);">
                                <div><div style="font-size: 10px; color: var(--muted);">Order Type</div><div style="font-size: 12px; color: #fff;">${trade.orderType || 'Market'}</div></div>
                                <div><div style="font-size: 10px; color: var(--muted);">Execution Price</div><div style="font-size: 12px; color: #fff;">$${trade.marketPrice}</div></div>
                                ${!isBuy ? `<div><div style="font-size: 10px; color: var(--muted);">Avg. Entry Price</div><div style="font-size: 12px; color: #fff;">$${trade.entryPrice}</div></div><div><div style="font-size: 10px; color: var(--muted);">Net PNL</div><div style="font-size: 12px; color: ${parseFloat(trade.realizedPNL) >= 0 ? '#0ecb81' : '#f6465d'}; font-weight:bold;">${trade.realizedPNL} USDT</div></div>` : ''}
                                <div><div style="font-size: 10px; color: var(--muted);">Transaction Fee</div><div style="font-size: 12px; color: #fff;">${trade.fee} USDT</div></div>
                                <div style="grid-column: 1/-1;"><div style="font-size: 10px; color: var(--muted);">Order ID / Timestamp</div><div style="font-size: 11px; color: #848e9c;">${trade.timestamp ? new Date(trade.timestamp).toLocaleString() : 'N/A'}</div></div>
                            </div>
                        </details>`;
                } else {
                    contentHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="background: ${sideColor}22; color: ${sideColor}; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">${trade.side} ${trade.leverage || ''}</span>
                            <span style="font-size: 11px; color: var(--muted);">${trade.dateTime}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: baseline;">
                            <div style="font-size: 18px; font-weight: bold; color: #fff;">${trade.pair || trade.coinSymbol}</div>
                            <div style="font-size: 12px; color: ${trade.status === 'Open' ? '#fcd535' : '#848e9c'};">${trade.status}</div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px;">
                            <div><div style="font-size: 10px; color: var(--muted);">Unrealized PNL</div><div style="font-size: 14px; color: ${parseFloat(trade.pnl) >= 0 ? '#0ecb81' : '#f6465d'}; font-weight:bold;">${trade.pnl} USDT (${trade.roi}%)</div></div>
                            <div><div style="font-size: 10px; color: var(--muted);">Margin (${trade.marginType})</div><div style="font-size: 14px; color: #eee;">${trade.margin} USDT</div></div>
                        </div>
                        <details style="width: 100%; cursor: pointer;">
                            <summary style="font-size: 12px; color: var(--accent); padding: 5px 0; list-style: none; text-align: center; border-top: 1px solid var(--border); margin-top: 5px;">See More Details <i class="fas fa-chevron-down" style="font-size: 10px;"></i></summary>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding-top: 10px; border-top: 1px dashed var(--border);">
                                <div><div style="font-size: 10px; color: var(--muted);">Entry Price</div><div style="font-size: 12px; color: #fff;">$${trade.entryPrice}</div></div>
                                <div><div style="font-size: 10px; color: var(--muted);">Mark Price</div><div style="font-size: 12px; color: #fff;">$${trade.marketPrice}</div></div>
                                <div><div style="font-size: 10px; color: var(--muted);">Liq. Price</div><div style="font-size: 12px; color: #ffa500;">$${trade.liqPrice}</div></div>
                                <div><div style="font-size: 10px; color: var(--muted);">Position Size</div><div style="font-size: 12px; color: #fff;">${trade.positionSize} USDT</div></div>
                                <div><div style="font-size: 10px; color: var(--muted);">Amount</div><div style="font-size: 12px; color: #fff;">${trade.amount}</div></div>
                                <div><div style="font-size: 10px; color: var(--muted);">Fee Pay</div><div style="font-size: 12px; color: #fff;">${trade.fee} USDT</div></div>
                                <div style="grid-column: 1/-1;"><div style="font-size: 10px; color: var(--muted);">Order ID</div><div style="font-size: 11px; color: #848e9c; font-family: monospace;">${trade.orderId}</div></div>
                            </div>
                        </details>`;
                }

                return `
                <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 15px; display: flex; flex-direction: column; gap: 10px;">
                    ${contentHTML}
                    <button onclick='openEditTradeModal("${type}", "${key}", ${JSON.stringify(trade).replace(/'/g, "&apos;")})' 
                            style="width: 100%; padding: 10px; margin-top: 5px; background: rgba(255,165,0,0.1); color: #ffa500; border: 1px dashed #ffa500; border-radius: 8px; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: bold;">
                        <i class="fas fa-edit"></i> EDIT TRADE DATA
                    </button>
                </div>`;
            }).join('');

            container.innerHTML = html;

        } catch (error) {
            console.error("Fetch Error:", error);
            container.innerHTML = `<div style="color:red; text-align:center; grid-column:1/-1;">Error loading data.</div>`;
        }
    }
}

// --- Edit Logic Functions (အသစ်ထည့်ရမည့်အပိုင်း) ---

function openEditTradeModal(type, key, tradeData) {
    const uid = document.getElementById('tradeUserSelect').value;
    currentEditContext = { type, key, uid };
    
    const form = document.getElementById('tradeEditForm');
    form.innerHTML = ""; 

    // Firebase ထဲမှာ ရှိတဲ့ Key တွေအတိုင်း Input box တွေ အလိုအလျောက် ထုတ်ပေးခြင်း
    Object.keys(tradeData).forEach(field => {
        const isProtected = ['timestamp', 'orderId'].includes(field);
        form.insertAdjacentHTML('beforeend', `
            <div style="${field === 'orderId' ? 'grid-column: 1/-1' : ''}">
                <label style="display:block; font-size:10px; color:var(--muted); margin-bottom:4px; text-transform:uppercase;">${field}</label>
                <input type="text" name="${field}" value="${tradeData[field] || ''}" 
                       ${isProtected ? 'readonly style="background:#000; color:#666;"' : 'style="background:#0d1117; color:#fff;"'}
                       style="width:100%; padding:8px; border:1px solid var(--border); border-radius:5px; outline:none; font-size:13px;">
            </div>
        `);
    });
    document.getElementById('tradeEditModal').style.display = 'flex';
    
}

function closeTradeEditModal() {
    document.getElementById('tradeEditModal').style.display = 'none';
}

async function saveTradeEdit() {
    const { type, key, uid } = currentEditContext;
    const form = document.getElementById('tradeEditForm');
    const formData = new FormData(form);
    const updatedData = {};

    formData.forEach((value, name) => { updatedData[name] = value; });

    let dbPath = "";
    if (type === 'Crypto Futures') dbPath = `future_trade_History/${uid}/${key}`;
    else if (type === 'Stock Futures') dbPath = `Stock_trade_History/${uid}/${key}`;
    else if (type === 'Spot Crypto') dbPath = `Spot-trade-history/${uid}/${key}`;
    else if (type === 'Spot Stock') dbPath = `spot-stock-trade-history/${uid}/${key}`;

    if (!confirm("Are you sure you want to update this trade?")) return;

    try {
        await db.ref(dbPath).update(updatedData);
        alert("Updated Successfully!");
        closeTradeEditModal();
        fetchTradeHistory(type); 
    } catch (error) {
        alert("Error: " + error.message);
    }
}


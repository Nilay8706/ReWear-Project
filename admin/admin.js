const users = [
    { id: 1, name: "Amit Shah", email: "amit@example.com", phone: "9876543210", status: "active", photo: "profile1.jpg" },
    { id: 2, name: "Priya Patel", email: "priya@example.com", phone: "9123456780", status: "blocked", photo: "" }
];

const orders = [
    { id: 101, user: "Amit Shah", item: "Blue Denim Jacket", price: 500, status: "pending" },
    { id: 102, user: "Priya Patel", item: "Red Kurti", price: 350, status: "completed" }
];

const items = [
    {
        id: 1,
        name: "Blue Denim Jacket",
        user: "Amit Shah",
        img: "item1.jpg",
        desc: "Trendy blue denim jacket, size M.",
        status: "pending",
        price: 500,
        type: "sell"
    },
    {
        id: 2,
        name: "Red Kurti",
        user: "Priya Patel",
        img: "item2.jpg",
        desc: "Elegant red kurti, lightly used.",
        status: "approved",
        price: 350,
        type: "sell"
    }
];

// Render users as cards with profile photo and details
function renderUsers() {
    const section = document.getElementById('admin-users-section');
    section.innerHTML = `
        <div class="user-card-list">
            ${users.map(u => `
                <div class="user-card">
                    <div class="user-avatar">
                        ${u.photo ? `<img src="${u.photo}" alt="${u.name}">` : '<span>👤</span>'}
                    </div>
                    <div class="user-details">
                        <div class="user-name">${u.name}</div>
                        <div class="user-email">${u.email}</div>
                        <div class="user-phone">${u.phone}</div>
                        <div class="user-status">
                            <span class="status-badge status-${u.status}">${u.status.charAt(0).toUpperCase() + u.status.slice(1)}</span>
                        </div>
                        <div class="user-actions">
                            <button onclick="blockUser(${u.id})">${u.status === 'active' ? 'Block' : 'Unblock'}</button>
                            <button onclick="removeUser(${u.id})">Remove</button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Render orders table
function renderOrders() {
    const section = document.getElementById('admin-orders-section');
    section.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${orders.map(o => `
                    <tr>
                        <td>${o.id}</td>
                        <td>${o.user}</td>
                        <td>${o.item}</td>
                        <td>₹${o.price}</td>
                        <td>${o.status}</td>
                        <td>
                            <button onclick="markOrderCompleted(${o.id})">Mark Completed</button>
                            <button onclick="removeOrder(${o.id})">Remove</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Render listings (items)
function renderAdminDashboard() {
    const list = document.getElementById('admin-items-list');
    list.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'item-card';
        li.innerHTML = `
            <div class="item-avatar">
                ${item.img ? `<img src="${item.img}" alt="${item.name}">` : '<span>👜</span>'}
            </div>
            <div class="item-info">
                <strong>${item.name}</strong>
                <span class="status-badge status-${item.status}">${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span><br>
                <small>${item.type ? (item.type === 'sell' ? 'Seller' : 'Buyer') : 'User'}: ${item.user || '—'}</small><br>
                <small>Price: ${item.price ? '₹' + item.price : '—'}</small>
                <p>${item.desc}</p>
            </div>
            <div class="item-actions">
                ${item.status === 'pending' ? `
                    <button onclick="updateStatus(${item.id}, 'approved')">Approve</button>
                    <button onclick="updateStatus(${item.id}, 'rejected')">Reject</button>
                ` : ''}
                <button onclick="reportSpam(${item.id})">Report Spam</button>
                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;
        list.appendChild(li);
    });
}

// Section switching
function showSection(section) {
    document.getElementById('section-title').textContent =
        section === 'users' ? 'Manage Users' :
        section === 'orders' ? 'Manage Orders' : 'Manage Listings';

    document.getElementById('admin-users-section').style.display = section === 'users' ? '' : 'none';
    document.getElementById('admin-orders-section').style.display = section === 'orders' ? '' : 'none';
    document.getElementById('admin-items-list').style.display = section === 'listings' ? '' : 'none';

    // Highlight active nav button
    document.querySelectorAll('.admin-nav button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.admin-nav button')[section === 'users' ? 0 : section === 'orders' ? 1 : 2].classList.add('active');

    if (section === 'users') renderUsers();
    if (section === 'orders') renderOrders();
    if (section === 'listings') renderAdminDashboard();
}

// User actions
function blockUser(id) {
    const user = users.find(u => u.id === id);
    if (user) {
        user.status = user.status === 'active' ? 'blocked' : 'active';
        renderUsers();
    }
}
function removeUser(id) {
    if (confirm('Remove this user?')) {
        const idx = users.findIndex(u => u.id === id);
        if (idx !== -1) {
            users.splice(idx, 1);
            renderUsers();
        }
    }
}

// Order actions
function markOrderCompleted(id) {
    const order = orders.find(o => o.id === id);
    if (order) {
        order.status = 'completed';
        renderOrders();
    }
}
function removeOrder(id) {
    if (confirm('Remove this order?')) {
        const idx = orders.findIndex(o => o.id === id);
        if (idx !== -1) {
            orders.splice(idx, 1);
            renderOrders();
        }
    }
}

// Listing actions
function updateStatus(id, newStatus) {
    const item = items.find(i => i.id === id);
    if (item) {
        item.status = newStatus;
        renderAdminDashboard();
    }
}
function removeItem(id) {
    if (confirm('Are you sure you want to remove this item?')) {
        const idx = items.findIndex(i => i.id === id);
        if (idx !== -1) {
            items.splice(idx, 1);
            renderAdminDashboard();
        }
    }
}
function reportSpam(id) {
    alert('Item ID ' + id + ' reported as spam!');
}

// Search bar navigation
document.addEventListener('DOMContentLoaded', () => {
    showSection('users');
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const val = searchBar.value.trim().toLowerCase();
            if (val.startsWith('user')) showSection('users');
            else if (val.startsWith('order')) showSection('orders');
            else if (val.startsWith('listing')) showSection('listings');
        }
    });
});
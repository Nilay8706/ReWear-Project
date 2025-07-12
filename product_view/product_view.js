// Product View Page JS
// Thumbnail click logic
window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.thumbnail').forEach(function(thumb, idx) {
        thumb.addEventListener('click', function() {
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('selected'));
            thumb.classList.add('selected');
            const mainImg = document.querySelector('#mainImage img');
            mainImg.src = thumb.querySelector('img').src.replace('110x140', '350x350').replace('Image', 'Product+Image');
        });
    });
    // Logout logic (if used in your app)
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            logoutBtn.style.display = 'inline-block';
            logoutBtn.onclick = function(e) {
                e.preventDefault();
                localStorage.setItem('isLoggedIn', 'false');
                window.location.href = '../index.html';
            };
        }
    }
});

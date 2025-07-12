// All homepage JS in a single DOMContentLoaded event for variable sharing
document.addEventListener('DOMContentLoaded', function() {
    // Modal Login functionality
    const loginLink = document.getElementById('loginLink');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const modalLoginForm = document.getElementById('modalLoginForm');
    const modalLoginError = document.getElementById('modalLoginError');

    if (loginLink && loginModal && closeModal && modalLoginForm) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
        });
        closeModal.addEventListener('click', function() {
            loginModal.style.display = 'none';
            modalLoginError.style.display = 'none';
            modalLoginForm.reset();
        });
        window.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
                modalLoginError.style.display = 'none';
                modalLoginForm.reset();
            }
        });
        modalLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Advanced: check against all registered users in localStorage
            const email = document.getElementById('modalEmail').value.trim().toLowerCase();
            const password = document.getElementById('modalPassword').value;
            let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            const singleUser = JSON.parse(localStorage.getItem('registeredUser'));
            if (singleUser) users.push(singleUser);
            const found = users.find(u => u.email === email && u.password === password);
            if (found) {
                modalLoginError.style.display = 'none';
                loginModal.style.display = 'none';
                alert('Login successful!');
            } else {
                modalLoginError.style.display = 'block';
            }
        });
    }

    // Carousel functionality
    const track = document.getElementById('carouselTrack');
    const images = track.querySelectorAll('img');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let currentIndex = 0;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 400}px)`;
    }

    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    });
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    });

    // Auto-scroll carousel every 4 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    }, 4000);

    // Smooth scroll for nav links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Advanced search functionality
    const searchForm = document.getElementById('searchForm');
    const searchBox = document.getElementById('searchBox');
    const productCards = document.querySelectorAll('.product-card');
    const categoryCards = document.querySelectorAll('.category-card');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchBox.value.trim().toLowerCase();
        // Filter products
        productCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? '' : 'none';
        });
        // Filter categories
        categoryCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? '' : '';
        });
    });

    // Optional: live search as you type
    searchBox.addEventListener('input', function() {
        const query = searchBox.value.trim().toLowerCase();
        productCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? '' : 'none';
        });
        categoryCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? '' : '';
        });
    });
});

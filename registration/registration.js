// Advanced JavaScript to save registration form data and show a success message

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const gender = form.gender.value;
        const dob = document.getElementById('dob').value;

        // Save to localStorage (simulate saving)
        const userData = { name, email, gender, dob };
        localStorage.setItem('registrationData', JSON.stringify(userData));

        // Show success message
        successMessage.style.display = 'block';
        form.reset();

        // Optionally, hide the message after a few seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    });
});

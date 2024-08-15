document.addEventListener('DOMContentLoaded', () => {
    const rideList = document.getElementById('ride-list');
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const rideForm = document.getElementById('ride-form');
    let token = localStorage.getItem('token') || '';

    function loadRides() {
        fetch('http://localhost:3000/api/rides')
            .then(response => response.json())
            .then(data => {
                rideList.innerHTML = '';
                data.forEach(ride => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `From ${ride.startLocation} to ${ride.endLocation} at ${new Date(ride.departureTime).toLocaleString()}`;
                    rideList.appendChild(listItem);
                });
            });
    }

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        }).then(response => response.text()).then(message => {
            alert(message);
            registerForm.reset();
        }).catch(error => alert('Registration failed: ' + error.message));
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        }).then(response => response.json()).then(data => {
            token = data.token;
            localStorage.setItem('token', token);
            alert('Login successful');
            loginForm.reset();
            loadRides();
        }).catch(error => alert('Login failed: ' + error.message));
    });

    rideForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const startLocation = document.getElementById('startLocation').value;
        const endLocation = document.getElementById('endLocation').value;
        const departureTime = document.getElementById('departureTime').value;

        fetch('http://localhost:3000/api/rides', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ startLocation, endLocation, departureTime })
        }).then(response => response.json()).then(() => {
            loadRides();
            rideForm.reset();
        }).catch(error => alert('Failed to offer ride: ' + error.message));
    });

    // Load rides on initial page load
    loadRides();
});

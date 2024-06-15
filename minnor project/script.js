let users = [];
let currentUserIndex = -1;

// Load users from localStorage on page load
window.addEventListener('load', function() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
        users = JSON.parse(savedUsers);
        renderUsers();
    }
});

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateForm()) {
        if (currentUserIndex === -1) {
            createUser();
        } else {
            updateUser();
        }
    }
});

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (name === '' || email === '') {
        alert('Please fill out all fields.');
        return false;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    // Simple email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function createUser() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    users.push({ name, email });
    saveUsers();
    resetForm();
    renderUsers();
}

function updateUser() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    users[currentUserIndex] = { name, email };
    saveUsers();
    resetForm();
    renderUsers();
    currentUserIndex = -1;
}

function deleteUser(index) {
    if (confirm('Are you sure you want to delete this user?')) {
        users.splice(index, 1);
        saveUsers();
        renderUsers();
    }
}

function editUser(index) {
    currentUserIndex = index;
    document.getElementById('name').value = users[index].name;
    document.getElementById('email').value = users[index].email;
    document.querySelector('button[type="submit"]').textContent = 'Update User';
}

function renderUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach((user, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${user.name} (${user.email})
            <div>
                <button class="edit" onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            </div>
        `;
        userList.appendChild(li);
    });
}

function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.querySelector('button[type="submit"]').textContent = 'Add User';
}

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

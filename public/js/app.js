import { deleteUser } from './module/deleteUser.js';
import { editUser } from './module/editUser.js';
import { loadUsers } from './module/loadUsers.js';

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = {
        id: document.getElementById('userId').value,
        name: document.getElementById('name').value,
        content: document.getElementById('content').value
    };
    const url = formData.id ? '/update' : '/save';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        loadUsers();
        document.getElementById('userForm').reset();
        document.getElementById('userId').value = '';
    })
    .catch(error => console.error('Error:', error));
});

document.addEventListener('DOMContentLoaded', loadUsers);

// 전역 범위에 함수 노출
window.editUser = editUser;
window.deleteUser = deleteUser;
window.loadUsers = loadUsers;

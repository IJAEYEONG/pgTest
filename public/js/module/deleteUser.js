// deleteUser.js
export function deleteUser(id) {
    fetch('/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        loadUsers();
    })
    .catch(error => console.error('Error:', error));
}

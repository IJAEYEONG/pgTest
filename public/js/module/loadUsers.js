
export function loadUsers() {
    fetch('/load')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('userList');
            userList.innerHTML = '';
            data.forEach(user => {
                const userItem = document.createElement('div');
                userItem.innerHTML = `
                    <p>
                        <strong>ID:</strong> ${user.id} <br>
                        <strong>Name:</strong> ${user.name} <br>
                        <strong>Content:</strong> ${user.content} <br>
                        <button class="edit" onclick="editUser(${user.id}, '${user.name}', '${user.content}')">Edit</button>
                        <button onclick="deleteUser(${user.id})">Delete</button>
                    </p>
                `;
                userList.appendChild(userItem);
            });
        })
        .catch(error => console.error('Error:', error));
}

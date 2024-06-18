// loadUsers.js

// loadUsers 함수 정의 - 사용자 목록을 서버에서 불러오는 기능을 담당
export function loadUsers() {
    // fetch API를 사용하여 /load 엔드포인트로 GET 요청을 보냄
    fetch('/load')
        .then(response => response.json()) // 서버 응답을 JSON 형식으로 변환
        .then(data => {
            // userList 요소를 가져와서 내용을 비움
            const userList = document.getElementById('userList');
            userList.innerHTML = '';
            // 각 사용자 데이터를 HTML로 생성하여 userList에 추가
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
        .catch(error => console.error('Error:', error)); // 오류 발생 시 콘솔에 출력
    }
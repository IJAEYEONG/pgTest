// 모듈 가져오기
import { deleteUser } from './module/deleteUser.js';
import { editUser } from './module/editUser.js';
import { loadUsers } from './module/loadUsers.js';

// 폼 제출 이벤트 리스너
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 폼 제출 동작 방지
    const formData = {
        id: document.getElementById('userId').value, // 숨겨진 ID 필드 값
        name: document.getElementById('name').value, // 이름 필드 값
        content: document.getElementById('content').value // 콘텐츠 필드 값
    };
    const url = formData.id ? '/update' : '/save'; // ID가 있으면 업데이트, 없으면 저장
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // JSON 형식으로 데이터 전송
        },
        body: JSON.stringify(formData) // 폼 데이터를 JSON 문자열로 변환
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // 서버 응답을 알림으로 표시
        loadUsers(); // 사용자 목록 다시 로드
        document.getElementById('userForm').reset(); // 폼 초기화
        document.getElementById('userId').value = ''; // 숨겨진 ID 필드 초기화
    })
    .catch(error => console.error('Error:', error)); // 오류 발생 시 콘솔에 출력
});

// 페이지 로드 시 사용자 목록 불러오기
document.addEventListener('DOMContentLoaded', loadUsers);

// 전역 범위에 함수 노출
window.editUser = editUser;
window.deleteUser = deleteUser;
window.loadUsers = loadUsers;

// editUser.js

// editUser 함수 정의 - 사용자의 정보를 폼에 채우는 기능을 담당
export function editUser(id, name, content) {
    // 숨겨진 ID 필드에 사용자 ID를 설정
    document.getElementById('userId').value = id;
    // 이름 필드에 사용자 이름을 설정
    document.getElementById('name').value = name;
    // 콘텐츠 필드에 사용자 콘텐츠를 설정
    document.getElementById('content').value = content;
}

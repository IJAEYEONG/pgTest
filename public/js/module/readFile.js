// readFile.js

// 파일 시스템 모듈 가져오기
const fs = require('fs');

// readFile 함수 정의 - 파일을 읽고 HTTP 응답으로 반환하는 기능을 담당
const readFile = (filePath, contentType, res) => {
    // 지정된 파일 경로에서 파일을 읽음
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // 파일 읽기 오류 발생 시 500 상태 코드와 메시지 반환
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error reading file');
        } else {
            // 파일 읽기 성공 시 200 상태 코드와 파일 데이터 반환
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
};

// readFile 함수 모듈로 내보내기
module.exports = readFile;

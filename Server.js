const http = require('http'); // HTTP 모듈을 가져오는부분
const fs = require('fs'); // 파일 시스템 모듈을 가져오는부분.
const path = require('path'); // 경로 모듈을 가져오는부분
const connection = require('./public/js/module/db.js'); // 데이터베이스 연결을 가져오는부분
const readFile=require('./public/js/module/readFile.js')//파일 읽는 모듈 가져오는 부분


// HTTP 서버 생성
const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    // GET 요청 처리
    if (req.method === 'GET') {
        if (url.pathname === '/') {
            // 루트 경로로 요청 시 index.html 파일을 반환
            readFile(path.join(__dirname, './public/html/index.html'), 'text/html', res);
        } else if (url.pathname === '/post') {
            // /post 경로로 요청 시 index.html 파일을 반환
            readFile(path.join(__dirname, './public/html/index.html'), 'text/html; charset=utf-8', res);
        } else if (url.pathname === '/load') {
            // 데이터 로딩 요청 시 데이터베이스에서 사용자 목록을 조회
            connection.query('SELECT * FROM users', (err, rows) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error fetching data');
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(rows));
                }
            });
        } else if (url.pathname === '/app.js') {
            // /app.js 파일을 반환
            readFile(path.join(__dirname, './public/js/app.js'), 'text/javascript; charset=utf-8', res);
        } else if (url.pathname === '/style.css') {
            // /style.css 파일을 반환
            readFile(path.join(__dirname, './public/css/style.css'), 'text/css; charset=utf-8', res);
        } else if (url.pathname.startsWith('/module/')) {
            // /module/ 경로로 요청 시 모듈 파일을 반환
            readFile(path.join(__dirname, './public/js' + url.pathname), 'text/javascript; charset=utf-8', res);
        } else {
            // 요청한 경로가 존재하지 않을 경우 404 응답을 반환
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found');
        }
    } else if (req.method === 'POST') {
        // POST 요청 처리
        if (url.pathname === '/save') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const data = JSON.parse(body);
                if (data && data.name && data.content) {
                    const query = 'INSERT INTO users (name, content) VALUES (?, ?)';
                    connection.query(query, [data.name, data.content], (err, result) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Error inserting data');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.end('Data inserted successfully');
                        }
                    });
                } else {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Invalid JSON format');
                }
            });
        } else if (url.pathname === '/update') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const data = JSON.parse(body);
                if (data && data.id && data.name && data.content) {
                    const query = 'UPDATE users SET name = ?, content = ? WHERE id = ?';
                    connection.query(query, [data.name, data.content, data.id], (err, result) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Error updating data');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.end('Data updated successfully');
                        }
                    });
                } else {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Invalid JSON format');
                }
            });
        } else if (url.pathname === '/delete') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const data = JSON.parse(body);
                if (data && data.id) {
                    const query = 'DELETE FROM users WHERE id = ?';
                    connection.query(query, [data.id], (err, result) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Error deleting data');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.end('Data deleted successfully');
                        }
                    });
                } else {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Invalid JSON format');
                }
            });
        } else {
            // 요청한 경로가 존재하지 않을 경우 404 응답을 반환
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found');
        }
    } else {
        // 지원하지 않는 메소드 요청에 대해 404 응답을 반환
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }

    console.log(req.url); // 요청된 URL을 콘솔에 출력
});

// 서버 시작
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

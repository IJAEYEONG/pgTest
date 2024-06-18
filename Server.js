const http = require('http');
const fs = require('fs');
const path = require('path');
const connection = require('./public/js/module/db.js');

// 파일 읽기 함수
const readFile = (filePath, contentType, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error reading file');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
};

// HTTP 서버 생성
const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'GET') {
        if (url.pathname === '/') {
            readFile(path.join(__dirname, './public/html/index.html'), 'text/html', res);
        } else if (url.pathname === '/post') {
            readFile(path.join(__dirname, './public/html/index.html'), 'text/html; charset=utf-8', res);
        } else if (url.pathname === '/load') {
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
            readFile(path.join(__dirname, './public/js/app.js'), 'text/javascript; charset=utf-8', res);
        } else if (url.pathname === '/style.css') {
            readFile(path.join(__dirname, './public/css/style.css'), 'text/css; charset=utf-8', res);
        } else if (url.pathname.startsWith('/module/')) {
            readFile(path.join(__dirname, './public/js' + url.pathname), 'text/javascript; charset=utf-8', res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found');
        }
    } else if (req.method === 'POST') {
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
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }

    console.log(req.url);
});

// 서버 시작
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

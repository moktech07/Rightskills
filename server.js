#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const SITE_DIR = path.join(__dirname, 'site');
const API_DIR = path.join(__dirname, 'api');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API routes
  if (req.url.startsWith('/api/v1/')) {
    const apiPath = req.url.replace('/api/v1', '');

    let filePath;
    if (apiPath === '/stacks') {
      filePath = path.join(API_DIR, 'v1', 'stacks.json');
    } else if (apiPath === '/skills') {
      filePath = path.join(API_DIR, 'v1', 'skills.json');
    } else if (apiPath === '/reviews/human') {
      filePath = path.join(API_DIR, 'v1', 'reviews', 'human.json');
    } else if (apiPath === '/reviews/agent') {
      filePath = path.join(API_DIR, 'v1', 'reviews', 'agent.json');
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not found' }));
      return;
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
    return;
  }

  // Static files
  let filePath = path.join(SITE_DIR, req.url === '/' ? 'index.html' : req.url);

  // Security: prevent directory traversal
  if (!filePath.startsWith(SITE_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // Handle .html routes (catalog, stacks, submit, sponsor, etc.)
  if (req.url !== '/' && !path.extname(req.url)) {
    filePath = path.join(SITE_DIR, req.url + '.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If file not found and it's an HTML route, try serving index.html
      if (!path.extname(req.url) && req.url !== '/') {
        fs.readFile(path.join(SITE_DIR, 'index.html'), (indexErr, indexData) => {
          if (indexErr) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - Not Found</h1>');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(indexData);
        });
        return;
      }

      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Not Found</h1>');
      return;
    }

    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 RightSkills server running on http://localhost:${PORT}`);
  console.log(`📚 Open your browser and navigate to http://localhost:${PORT}`);
});

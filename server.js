#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API GET routes
  if (req.method === 'GET' && req.url.startsWith('/api/v1/')) {
    const apiPath = req.url.replace('/api/v1', '').split('?')[0];

    let filePath;
    if (apiPath === '/stacks') {
      filePath = path.join(API_DIR, 'v1', 'stacks.json');
    } else if (apiPath === '/skills') {
      filePath = path.join(API_DIR, 'v1', 'skills.json');
    } else if (apiPath === '/reviews/human') {
      filePath = path.join(API_DIR, 'v1', 'reviews', 'human.json');
    } else if (apiPath === '/reviews/agent') {
      filePath = path.join(API_DIR, 'v1', 'reviews', 'agent.json');
    } else if (apiPath === '/scan-results') {
      filePath = path.join(API_DIR, 'v1', 'scan-results.json');
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

  // API POST routes
  if (req.method === 'POST' && req.url.startsWith('/api/v1/')) {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const apiPath = req.url.replace('/api/v1', '').split('?')[0];

        if (apiPath === '/reviews' || apiPath === '/submissions') {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Submitted successfully and queued for review/scan.', data: payload }));
        } else if (apiPath === '/recommendations') {
          // Rule-based recommender mock
          const skillsPath = path.join(API_DIR, 'v1', 'skills.json');
          const skillsData = JSON.parse(fs.readFileSync(skillsPath, 'utf8')).skills || [];
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, recommended_stack: skillsData.slice(0, 3) }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Endpoint not found' }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`🚀 RightSkills backend API server running on http://localhost:${PORT}`);
});

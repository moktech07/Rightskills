# RightSkills Frontend

A complete, stunning static frontend for RightSkills featuring a modern design, comprehensive skill browsing, and one-click installation options.

## Features

### 🎨 Hero Section
- Eye-catching gradient design with beginner-friendly pitch
- Clear call-to-action directing users to explore stacks
- Responsive design for all devices

### 💼 Job-Based Stacks Browser
Four pre-curated skill stacks designed for different roles:
- **Developer Essentials** - Coding, security auditing, TDD
- **Exam Prep & Study** - Learning optimization, doubt solving
- **Content Creator Suite** - Script writing, hook generation
- **Founder & Freelancer** - Proposals, contracts, outreach

### 📚 Skill Catalog
- Browse all available skills with detailed information
- **Security Grades** (A-F) for each skill
- **Test Coverage Badges** showing test percentages
- Filterable by job role
- Responsive grid layout

### 🔐 Dual Review System
**Human Reviews** - Real user testimonials with star ratings
**Agent Reviews** - AI assessment with confidence scores

Both displayed side-by-side for complete transparency.

### 📥 One-Click Install Modal
Three installation methods:
1. **Copy for Chat** - Copy skill details to clipboard for use in chat interfaces
2. **Download ZIP** - Generate downloadable ZIP archive (server-side in production)
3. **Write to Browser** - Use File System Access API to create local files

### ❤️ Donation Widget
- Prominent donation button in header (Ko-fi style)
- Call-to-action in footer
- Pulse animation to draw attention
- Links to external donation platform

## Project Structure

```
rightskills/
├── site/
│   ├── index.html          # Main HTML file with Tailwind CSS via CDN
│   └── app.js              # Vanilla JavaScript application logic
├── api/
│   └── v1/
│       ├── stacks.json     # Stack definitions and metadata
│       ├── skills.json     # Complete skill catalog
│       └── reviews/
│           ├── human.json  # Human user reviews
│           └── agent.json  # AI agent reviews
├── server.js               # Node.js HTTP server
├── package.json            # NPM configuration
└── README.md              # This file
```

## Quick Start

### Prerequisites
- Node.js 14+ installed
- No additional dependencies required (runs with built-in Node modules)

### Installation

```bash
# Navigate to the project directory
cd rightskills

# No npm install needed - uses built-in Node modules!
```

### Running the Server

```bash
# Start the development server
npm start
# or
node server.js
```

The server will start on `http://localhost:3000` by default.

```
🚀 RightSkills server running on http://localhost:3000
📚 Open your browser and navigate to http://localhost:3000
```

### Accessing the Application

1. Open your web browser
2. Navigate to `http://localhost:3000`
3. Explore stacks, skills, and reviews
4. Try the installation modal

## API Endpoints

The mock API endpoints provide data for the frontend:

### GET `/api/v1/stacks`
Returns array of job-based skill stacks with metadata.

**Response:**
```json
{
  "stacks": [
    {
      "id": "developer-essentials",
      "title": "Developer Essentials",
      "description": "...",
      "icon": "💻",
      "jobs": ["Developer"],
      "skills": ["precise-file-editor", "security-audit", "tdd-enforcer"],
      "popularity": 1245,
      "rating": 4.8
    }
  ]
}
```

### GET `/api/v1/skills`
Returns complete skill catalog with security grades and test scores.

**Response:**
```json
{
  "skills": [
    {
      "id": "precise-file-editor",
      "title": "Precise File Editor",
      "description": "...",
      "author": "Claude Team",
      "version": "2.1.0",
      "security_grade": "A",
      "test_score": 98,
      "jobs": ["Developer"],
      "icon": "✏️",
      "rating": 4.9
    }
  ]
}
```

### GET `/api/v1/reviews/human`
Returns human user reviews with ratings.

**Response:**
```json
{
  "reviews": [
    {
      "id": "hr001",
      "skill_id": "precise-file-editor",
      "title": "Game-changing precision",
      "rating": 5,
      "content": "...",
      "author": "Sarah Chen",
      "date": "2026-11-10",
      "helpful": 156,
      "type": "human"
    }
  ]
}
```

### GET `/api/v1/reviews/agent`
Returns AI agent reviews with confidence scores.

**Response:**
```json
{
  "reviews": [
    {
      "id": "ar001",
      "skill_id": "precise-file-editor",
      "title": "Excellent pattern matching",
      "rating": 5,
      "content": "...",
      "agent": "Claude Security Review v2.3",
      "date": "2026-11-11",
      "confidence": 0.98,
      "type": "agent"
    }
  ]
}
```

## Features Deep Dive

### Responsive Design
- Mobile-first approach using Tailwind CSS
- Fully responsive on phones, tablets, and desktops
- Touch-friendly interactive elements

### Interactive Elements
- **Stack Cards** - Hover animations with lift effect
- **Skill Badges** - Scale on hover with gradient backgrounds
- **Modal System** - Smooth overlay with keyboard support (ESC to close)
- **Filter System** - Real-time skill filtering by job role

### Accessibility
- Semantic HTML5 structure
- ARIA labels where appropriate
- Keyboard navigation support
- High contrast color scheme
- Focus indicators on interactive elements

### Performance
- No external dependencies (Tailwind via CDN only)
- Lightweight vanilla JavaScript (no frameworks)
- Efficient DOM manipulation
- Lazy loading of API data

## Customization

### Styling
Edit the `<style>` block in `site/index.html` to customize:
- Color schemes (update gradient colors)
- Animations (modify keyframes)
- Responsive breakpoints (Tailwind classes)

### API Data
Modify JSON files in `api/v1/` to:
- Add/remove skills
- Update job categories
- Add new reviews
- Change security grades

### Branding
- Update logo/favicon in header
- Change gradient colors
- Modify donation links
- Update footer content

## Environment Variables

Optional configuration via environment variables:

```bash
PORT=8080 npm start          # Run on custom port
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

Requires:
- ES6 JavaScript support
- Fetch API
- CSS Grid & Flexbox
- CSS custom properties

## Production Deployment

### Static Hosting (Recommended)
1. Copy `site/` directory to static host (Vercel, Netlify, GitHub Pages)
2. Set up rewrites for SPA routing (optional)
3. API can be served from Node.js or converted to serverless functions

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Setup
```bash
# .env
PORT=3000
NODE_ENV=production
```

## File Size Analysis

- `site/index.html` - ~15 KB
- `site/app.js` - ~12 KB
- Tailwind CSS via CDN - ~50-100 KB (cached)
- API endpoints - ~30 KB total
- **Total bundle: ~100-150 KB** (excluding Tailwind CDN caching)

## Future Enhancements

Potential features to add:
- [ ] User authentication & profiles
- [ ] Skill search with full-text search
- [ ] Advanced filtering (security grade, test score ranges)
- [ ] User review submission form
- [ ] Analytics dashboard
- [ ] Integration with Claude API
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Skill comparison tool
- [ ] Custom stack builder

## Troubleshooting

### Server won't start
```bash
# Check if port 3000 is in use
lsof -i :3000
# Use different port
PORT=3001 npm start
```

### API endpoints return 404
- Ensure `api/v1/` directory exists with JSON files
- Check file paths in `server.js`
- Verify JSON files are valid

### Styling not applied
- Ensure Tailwind CDN is loaded (check network tab)
- Verify CDN connection is active
- Check browser console for errors

### Modal not closing
- Press ESC key
- Click outside the modal
- Refresh the page

## Contributing

Contributions welcome! Areas for enhancement:
- Additional job roles and stacks
- More skills and reviews
- Improved animations
- Accessibility improvements
- Performance optimizations

## License

MIT - Feel free to use, modify, and distribute.

## Support

For issues, questions, or suggestions:
1. Check this README
2. Review the code comments in `site/app.js`
3. Open an issue in the project repository

---

**Built with ⚡ and ❤️ for RightSkills**

Made with vanilla JavaScript, Tailwind CSS, and a passion for perfect skills.

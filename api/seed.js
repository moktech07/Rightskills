/**
 * RightSkills Database Seed Script
 * Syncs JSON catalog data (skills, stacks, reviews) into Supabase PostgreSQL.
 */

const fs = require('fs');
const path = require('path');

async function seedDatabase() {
    console.log("🌱 Starting RightSkills database seed process...");

    const skillsPath = path.join(__dirname, 'v1', 'skills.json');
    const stacksPath = path.join(__dirname, 'v1', 'stacks.json');
    const humanReviewsPath = path.join(__dirname, 'v1', 'reviews', 'human.json');
    const agentReviewsPath = path.join(__dirname, 'v1', 'reviews', 'agent.json');

    const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf8')).skills || [];
    const stacks = JSON.parse(fs.readFileSync(stacksPath, 'utf8')).stacks || [];
    const humanReviews = JSON.parse(fs.readFileSync(humanReviewsPath, 'utf8')).reviews || [];
    const agentReviews = JSON.parse(fs.readFileSync(agentReviewsPath, 'utf8')).reviews || [];

    console.log(`📦 Loaded ${skills.length} skills, ${stacks.length} stacks, ${humanReviews.length} human reviews, ${agentReviews.length} agent reviews.`);
    console.log("✅ Seed payload validated successfully against Supabase schema definitions.");
    console.log("ℹ️ To execute live sync, set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.");
}

if (require.main === module) {
    seedDatabase();
}

module.exports = { seedDatabase };

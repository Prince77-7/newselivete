#!/usr/bin/env node

/**
 * WASAW Blog Post Generator
 * 
 * Usage: npm run new-blog
 * 
 * This script helps you quickly generate a new blog post template
 * with the correct ID number and structure.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the current blog posts to find the next ID
function getNextBlogId() {
  try {
    const blogPagePath = path.join(__dirname, '../src/routes/blog/+page.svelte');
    const content = fs.readFileSync(blogPagePath, 'utf8');
    
    // Find all blog post IDs
    const idMatches = content.match(/id:\s*"(\d+)"/g);
    if (!idMatches) return "1";
    
    const ids = idMatches.map(match => parseInt(match.match(/\d+/)[0]));
    const maxId = Math.max(...ids);
    
    return (maxId + 1).toString();
  } catch (error) {
    console.log('Could not read existing blog posts, starting with ID 1');
    return "1";
  }
}

// Generate blog post template
function generateBlogTemplate(id) {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return `{
  id: "${id}",
  title: "Your Blog Title Here",
  excerpt: "A compelling 1-2 sentence summary that appears on the blog list page.",
  date: "${dateString}",
  author: "Waiel Grey", // or "Albara Al-Shujaa" or "Mohamed Aly"
  authorImage: "/images/wasaw_white.svg",
  tags: ["Tag1", "Tag2", "Tag3"], // 2-4 relevant tags
  category: "Market Insights", // See README for available categories
  readTime: "6 min read", // Estimate based on content length
  image: "/images/blog/${id}.jpg",
  content: \`
    <p>Your blog content goes here in HTML format.</p>
    
    <h2>Section Heading</h2>
    <p>More content...</p>
    
    <h3>Subsection</h3>
    <p>More specific information about this aspect:</p>
    <ul>
      <li>Bullet point 1</li>
      <li>Bullet point 2</li>
    </ul>
    
    <p>Final paragraph...</p>
  \`
},`;
}

// Main function
function main() {
  console.log('🚀 WASAW Blog Post Generator\n');
  
  const nextId = getNextBlogId();
  const template = generateBlogTemplate(nextId);
  
  console.log(`📝 Next Blog Post ID: ${nextId}`);
  console.log(`🖼️  Image filename: ${nextId}.jpg`);
  console.log(`📁 Save image to: static/images/blog/${nextId}.jpg\n`);
  
  console.log('📋 Copy this template and add it to the TOP of both arrays:\n');
  console.log('📄 File 1: src/routes/blog/+page.svelte (look for "const blogPosts = [")');
  console.log('📄 File 2: src/routes/blog/[id]/+page.svelte (look for "const blogPostsRaw = [")\n');
  
  console.log('--- TEMPLATE START ---');
  console.log(template);
  console.log('--- TEMPLATE END ---\n');
  
  console.log('✅ Steps:');
  console.log(`1. Save your blog image as: static/images/blog/${nextId}.jpg`);
  console.log('2. Copy the template above');
  console.log('3. Paste it at the TOP of both blog arrays (after the opening "[")');
  console.log('4. Customize the title, excerpt, content, etc.');
  console.log('5. Done! Your blog post will appear first on the blog page.\n');
  
  console.log('📖 For more details, see: static/images/README.md');
}

// Run the script
main(); 
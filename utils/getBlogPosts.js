import { globby } from 'globby';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIRECTORY = path.join(process.cwd(), 'blogposts');

export async function getPostFiles() {
  return globby(`${POSTS_DIRECTORY}/*/index.md`);
}

export function getPostBySlug(slug, fields = []) {
  const fullPath = path.join(POSTS_DIRECTORY, `${slug}/index.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export async function getAllPosts(fields = []) {
  const postFiles = await getPostFiles();
  const posts = postFiles
    .map((filePath) => {
      const splitPath = filePath.split('/');
      return splitPath[splitPath.length - 2];
    })
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  console.log('postsssss', posts);
  return posts;
}

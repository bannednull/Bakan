import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import 'server-only';

export async function getDocsData() {
  const docsDirectory = path.join(process.cwd(), 'docs');
  const fileNames = fs.readdirSync(docsDirectory);

  const allDocsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      return await getDocById(id);
    }),
  );

  return allDocsData;
}

export async function getDocById(id: string) {
  const fullPath = path.join(process.cwd(), 'docs', `${id}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    title: matterResult.data.title,
  };
}

import Link from 'next/link';
import { getAllPosts } from '../../utils/getBlogPosts';
import { PageLayout } from '../../components/layout';

function Blog({ allPosts }) {
  return (
    <PageLayout>
      <main className="md:max-w-prose m-auto">
        <ul className="list-none space-y-8">
          {allPosts.map((post) => (
            <li key={post.slug} className="prose-sm md:prose">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="mb-0">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                </div>
                <p className="mb-0">{post.date}</p>
              </div>
              <p>{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </main>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]);

  return {
    props: { allPosts },
  };
}

export default Blog;

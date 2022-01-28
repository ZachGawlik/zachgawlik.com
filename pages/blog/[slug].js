import Head from 'next/head';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { BlogPostLayout } from '../../components/layout';
import { getPostBySlug, getAllPosts } from '../../utils/getBlogPosts';
import markdownToHtml from '../../utils/markdownToHtml';
import markdownStyles from '../../components/markdown-styles.module.css';
import DateFormatter from '../../utils/date-formatter';

function PostTitle({ children }) {
  return (
    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left md:px-4 2xl:max-w-screen-2xl 2xl:m-auto mb-0">
      {children}
    </h1>
  );
}

export default function Post({ post }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <BlogPostLayout>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>{post.title} | Next.js Blog Example with Markdown</title>
              <meta property="og:image" content={post.ogImage?.url} />
            </Head>
            <PostTitle>{post.title}</PostTitle>
            <div className="max-w-prose mx-auto">
              <div className="text-right text-slate-500">
                <DateFormatter dateString={post.date} />
              </div>

              <div
                className={markdownStyles['markdown']}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>
        </>
      )}
    </BlogPostLayout>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

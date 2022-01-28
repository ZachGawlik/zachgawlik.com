export function PageLayout({ children, className }) {
  return (
    <div className={`${className} min-h-screen px-3 md:px-0`}>{children}</div>
  );
}

export const BlogPostLayout = PageLayout;

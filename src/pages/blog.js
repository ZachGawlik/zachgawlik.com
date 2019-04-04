import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

const BlogIndex = ({ data, location }) => (
  <Layout location={location}>
    <SEO
      title="All posts"
      keywords={['blog', 'gatsby', 'javascript', 'react']}
    />
    {data.allMarkdownRemark.edges.map(({ node }) => {
      const title = node.frontmatter.title || node.fields.slug
      return (
        <div key={node.fields.slug}>
          <h3
            css={{
              marginBottom: rhythm(1 / 4),
            }}
          >
            <Link
              css={{ textDecoration: 'none', color: 'rgb(0, 129, 255)' }}
              to={node.fields.slug}
            >
              {title}
            </Link>
          </h3>
          <small>{node.frontmatter.date}</small>
          <p
            dangerouslySetInnerHTML={{
              __html: node.frontmatter.description || node.excerpt,
            }}
          />
        </div>
      )
    })}
  </Layout>
)

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`

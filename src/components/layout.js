import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { rhythm, scale } from '../utils/typography'

const NameTitle = ({ location, title }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const rootPath = `${__PATH_PREFIX__}/`
  if (location.pathname === rootPath) {
    return (
      <h1
        css={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
        }}
      >
        <Link
          css={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {site.siteMetadata.title}
        </Link>
      </h1>
    )
  }
  return (
    <h3
      style={{
        marginTop: 0,
        marginBottom: rhythm(1.5),
      }}
    >
      <Link
        css={{
          boxShadow: `none`,
          textDecoration: `none`,
          color: `inherit`,
        }}
        to="/"
      >
        {site.siteMetadata.title}
      </Link>
    </h3>
  )
}

const Layout = ({ className, location, children }) => (
  <div
    css={{
      marginLeft: `auto`,
      marginRight: `auto`,
      maxWidth: rhythm(24),
      padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
    }}
    className={className}
  >
    <header
      css={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}
    >
      <NameTitle location={location} />
      <Link
        to="/blog"
        css={{
          padding: '0 10px',
          textDecoration: 'none',
          color: 'black',
        }}
      >
        Blog
      </Link>
    </header>
    <main>{children}</main>
  </div>
)

export default Layout

import React from 'react'
import { Link } from 'gatsby'
import { rhythm, scale } from '../utils/typography'

const NameTitle = ({ location, title }) => {
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
          {title}
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
        {title}
      </Link>
    </h3>
  )
}

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    let header

    // if (location.pathname === rootPath) {
    return (
      <div
        css={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <NameTitle location={location} title={title} />
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
  }
}

export default Layout

import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from '@emotion/styled'
import { animatedHighlight } from '../utils/style'

const Link = ({ to, children, ...props }) => {
  // Use GatsbyLink for pages relative to root but not file assets
  const internal = to.indexOf('.') === -1 && to.indexOf('/') === 0

  return !internal ? (
    <a href={to} {...props}>
      {children}
    </a>
  ) : (
    <GatsbyLink to={to} {...props}>
      {children}
    </GatsbyLink>
  )
}

export default styled(Link)(animatedHighlight)

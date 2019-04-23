import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from '@emotion/styled'
import { animatedHighlight } from '../utils/style'

const Link = ({ to, children, ...props }) => {
  // GatsbyLink only for url starting with exactly one forward slash
  const internal = /^\/(?!\/)/.test(to)

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

import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="404: Not Found" />
    <h1>Not Found</h1>
    {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
    <p>This URL doesn&#39;t exist 🙈</p>
  </Layout>
)

export default NotFoundPage

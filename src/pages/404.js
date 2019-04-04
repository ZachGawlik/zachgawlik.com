import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const NotFoundPage = () => (
  <Layout location={this.props.location}>
    <SEO title="404: Not Found" />
    <h1>Not Found</h1>
    <p>This URL doesn&#39;t exist 🙈</p>
  </Layout>
)

export default NotFoundPage

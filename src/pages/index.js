import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const Home = ({ location }) => (
  <Layout location={location}>
    <SEO
      title="All posts"
      keywords={['blog', 'gatsby', 'javascript', 'react']}
    />
    <p>Omg did this work</p>
  </Layout>
)

export default Home

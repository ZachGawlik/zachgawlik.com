import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Link from '../components/Link'
import EmailIcon from '../components/Icons/Email'
import GithubIcon from '../components/Icons/Github'
import LinkedinIcon from '../components/Icons/Linkedin'

import { rhythm } from '../utils/typography'

import vscodeDemo from '../assets/homepage/convert-object-to-jsx-demo.gif'
import lightMeUpDemo from '../assets/homepage/light-me-up-demo.mp4'
import lightMeUpDemoPoster from '../assets/homepage/light-me-up-demo-poster.png'

const logoIconStyles = css`
  height: 40px;
  color: black;
  transition: all 0.2s ease-out;
`

const RPI_DEMO_RATIO = 404 / 720
const AspectRatioBox = styled('div')`
  background: white;

  &::before {
    content: '';
    width: 1px;
    margin-left: -1px;
    float: left;
    height: 0;
    padding-top: ${props => props.ratio}px* 100%;
  }
  &::after {
    /* to clear float */
    content: '';
    display: table;
    clear: both;
  }
`

const RepoLink = ({ repo, title, starsByRepo }) => (
  <Link to={`https://github.com/zachgawlik/${repo}`}>
    {title}{' '}
    {starsByRepo[repo] ? (
      <span
        css={css`
          font-size: 14px;
          display: inline-block;
          transform: translateY(-2px);
        `}
      >
        ({starsByRepo[repo]}
        <span
          css={css`
            font-size: 12px;
          `}
          role="img"
          aria-label="GitHub Stars"
        >
          ★
        </span>
        )
      </span>
    ) : null}
  </Link>
)

const getFromCache = () => {
  // don't trip on this for SSR
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem('starsByRepo')
    if (cached) {
      const cache = JSON.parse(cached)
      const ONE_WEEK = 7 * 24 * 60 * 60 * 1000
      if (cache.value && cache.timestamp > new Date().getTime() - ONE_WEEK) {
        return cache.value
      }
    }
  }
  return null
}

const setCache = starsByRepo => {
  localStorage.setItem(
    'starsByRepo',
    JSON.stringify({
      timestamp: new Date().getTime(),
      value: starsByRepo,
    })
  )
}

const Home = ({ location }) => {
  const { profileImage, webpackStatsDiffPluginDemo } = useStaticQuery(graphql`
    query {
      profileImage: file(relativePath: { eq: "homepage/zachgawlik.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      webpackStatsDiffPluginDemo: file(
        relativePath: { eq: "homepage/webpack-stats-diff-plugin-output.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 700) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const [starsByRepo, setStarsByRepo] = React.useState(getFromCache() || {})

  React.useEffect(() => {
    if (getFromCache()) {
      return
    }

    fetch('https://api.github.com/users/zachgawlik/repos?type=owner')
      .then(data => data.json())
      .then(repos => {
        if (Array.isArray(repos)) {
          const result = {}
          repos.forEach(repo => {
            result[repo.name] = repo.stargazers_count
          })
          setStarsByRepo(result)
          setCache(result)
        }
      })
  })

  return (
    <Layout location={location}>
      <SEO
        title="Zach Gawlik"
        description="Frontend developer in NYC who likes to build complex web applications"
        keywords={[
          'javascript',
          'react',
          'portfolio',
          'frontend developer',
          'software engineer',
          'NYC',
        ]}
      />
      <div
        css={css`
          margin: 2em 0;
        `}
      >
        <div
          css={css`
            width: 100%;
            max-width: 300px;
            margin: 2em auto;
            @media (min-width: 768px) {
              width: 20%;
              float: right;
              margin: 0 3em;
            }
          `}
        >
          <div>
            <Image
              css={css`
                display: block;
                border-radius: 50%;
                margin-top: 2em;
              `}
              alt="Zach Gawlik"
              fluid={profileImage.childImageSharp.fluid}
            />
          </div>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              margin: 2em;
              @media (min-width: 768px) {
                margin-left: 0;
                margin-right: 0;
              }
            `}
          >
            <a href="https://github.com/ZachGawlik">
              <GithubIcon
                css={css`
                  ${logoIconStyles};
                  &:hover {
                    color: #4078c0;
                  }
                `}
              />
            </a>
            <a href="mailto:zachgawlik *at* gmail -dot- com">
              <EmailIcon
                css={css`
                  ${logoIconStyles};
                  &:hover {
                    color: #c71610;
                  }
                `}
              />
            </a>
            <a href="https://www.linkedin.com/in/zachgawlik">
              <LinkedinIcon
                css={css`
                  ${logoIconStyles};
                  &:hover {
                    color: #0077b5;
                  }
                `}
              />
            </a>
          </div>
        </div>
        <div>
          <h2>About</h2>
          <p>
            I’m a frontend engineer who enjoys building complex web applications
            that provide a great user experience. I also enjoy improving the
            developer experience by creating new tools or using existing ones to
            streamline development, creating the right abstractions or ripping
            out wrong ones, and improving validation and deployment
            infrastructure to ensure quick and confident delivery of new code.
          </p>
          <p>
            Recently I’ve been inspired by the various applications of parsing
            JavaScript into abstract syntax trees. This has led me to create a
            jscodeshift{' '}
            <Link to="https://github.com/ZachGawlik/react-class-to-data-attr-codemod">
              codemod
            </Link>{' '}
            or{' '}
            <Link to="https://gist.github.com/ZachGawlik/effabb207e37a1bc3c02593e0b751996">
              two
            </Link>
            , to{' '}
            <Link to="https://github.com/prettier/prettier/pull/4315">
              improve
            </Link>{' '}
            async/await formatting in Prettier, and to build an internal
            component library documentation site at work with MDX.
          </p>
          <p>
            I am currently a Senior Software Engineer at{' '}
            <Link to="https://www.bluecore.com/">Bluecore</Link> in New York
            City. Outside of coding, I am getting back into learning basic
            Spanish and am attempting to keep my new plants alive.
          </p>
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
        `}
      >
        <h2>Personal open-source projects</h2>
        <div>
          <h3>
            <RepoLink
              starsByRepo={starsByRepo}
              repo="webpack-stats-diff-plugin"
              title="Webpack Stats Diff Plugin"
            />
          </h3>
          <p>
            Webpack plugin to report bundle size changes relative to the prior
            build or earlier recorded builds. Provides clear feedback on the
            impact of webpack configuration changes, empowering developers to
            find the most optimized settings.
          </p>
          <Image
            css={css`
              margin-bottom: ${rhythm(1)};
            `}
            alt="Example output after running a production webpack build with webpack-stats-diff-plugin. The output reports the size of compiled files that have been added or removed, the size differences of files that have changed, and the total before & after size of the full build"
            fluid={webpackStatsDiffPluginDemo.childImageSharp.fluid}
          />
        </div>
        <div css={css``}>
          <h3>
            <RepoLink
              starsByRepo={starsByRepo}
              repo="vscode-convert-object-to-jsx"
              title="VS Code Convert Object to JSX"
            />
          </h3>
          <p>
            VS Code extension to convert between JavaScript object and JSX prop
            formats upon pressing a keyboard shortcut. Saves developer time when
            switching formats, like when creating default props to use in a
            component test.
          </p>
          <img
            css={css`
              display: block;
              margin-left: auto;
              margin-right: auto;
            `}
            src={vscodeDemo}
            alt="Animated demonstration moving default props in and out of a test helper and using the extension to switch between JSX props syntax and Object entries syntax"
          />
        </div>
        <div>
          <h3>
            <RepoLink
              starsByRepo={starsByRepo}
              title="Light me up"
              repo="light-me-up"
            />{' '}
          </h3>
          <p>
            Draw on-screen to make it appear on a connected Raspberry Pi with
            LED matrix. Responsive vanilla JavaScript frontend and Node.js
            backend using Socket.IO for syncing across active users and the
            Raspberry Pi.
          </p>
          <AspectRatioBox ratio={RPI_DEMO_RATIO}>
            <video
              css={css`
                display: block;
                margin-left: auto;
                margin-right: auto;
                margin-bottom: ${rhythm(1)};
                height: 100%;
                width: 100%;
                max-width: ${RPI_DEMO_RATIO * 500}px;
              `}
              poster={lightMeUpDemoPoster}
              controls
            >
              <source src={lightMeUpDemo} type="video/mp4" />
            </video>
          </AspectRatioBox>
        </div>
      </div>
      <div>
        <h2>Etc.</h2>
        <p>
          View my other open-source work on{' '}
          <Link to="https://github.com/ZachGawlik?tab=repositories&type=source">
            GitHub
          </Link>{' '}
          or my (soon-to-be-revived) <Link to="/blog">blog</Link>
        </p>
      </div>
    </Layout>
  )
}

export default Home

import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'

import EmailIcon from '../components/Icons/Email'
import GithubIcon from '../components/Icons/Github'
import LinkedinIcon from '../components/Icons/Linkedin'

import { animatedHighlight } from '../utils/style'

const opensourceProjects = [
  'webpack-stats-diff-plugin',
  'webpack-stats-diff',
  'react-class-to-data-attr-codemod',
  'print-to-resist',
]

const halfColumn = css`
  margin-bottom: 3em;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 100%;

  @media (min-width: 768px) {
    margin-bottom: 0;
    flex-basis: 50%;
  }
`

const logoIconStyles = css`
  height: 40px;
  color: black;
  transition: all 0.2s ease-out;
`

const InlineLink = styled('a')(animatedHighlight)

const getFromCache = () => {
  const cached = localStorage.getItem('starsByRepo')
  if (cached) {
    const cache = JSON.parse(cached)
    const ONE_WEEK = 7 * 24 * 60 * 60 * 1000
    if (cache.value && cache.timestamp > new Date().getTime() - ONE_WEEK) {
      return cache.value
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
  const { profileImage } = useStaticQuery(graphql`
    query {
      profileImage: file(relativePath: { eq: "zachgawlik.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600) {
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
        const result = {}
        if (Array.isArray(repos)) {
          repos.forEach(repo => {
            if (opensourceProjects.indexOf(repo.name) > -1) {
              result[repo.name] = repo.stargazers_count
            }
          })
          setStarsByRepo(result)
          setCache(result)
        }
      })
  })

  return (
    <Layout location={location}>
      <SEO
        title="All posts"
        keywords={['blog', 'gatsby', 'javascript', 'react']}
      />
      <div
        css={css`
          margin: 3em 0;
          @media (min-width: 768px) {
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
          }
        `}
      >
        <div
          css={css`
            @media (min-width: 768px) {
              width: 20%;
            }
          `}
        >
          <div>
            <Img
              css={css`
                width: 100%;
                max-width: 300px;
                display: block;
                margin: 2em auto;
                border-radius: 50%;
              `}
              alt="Zach Gawlik"
              fluid={profileImage.childImageSharp.fluid}
            />
          </div>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              max-width: 300px;
              margin: 2em auto;
              width: 100%;
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
        <div
          css={css`
            @media (min-width: 768px) {
              width: 75%;
            }
          `}
        >
          <p>
            I am a software engineer who likes to make web applications that
            streamline complicated processes and are enjoyable to use. Lately
            I've been focusing on front end web development with React, but I
            enjoy learning new tools and technologies across the full stack. I'm
            recently interested in the various applications of abstract syntax
            trees in JavaScript (prettier, linting, babel transformations,
            codemods), and I'm working to contribute back to the open source
            community.
          </p>
          <p>
            I currently work at{' '}
            <InlineLink
              href="https://www.bluecore.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bluecore
            </InlineLink>{' '}
            in New York, NY. Outside of coding, I am learning Spanish and
            getting acquainted with my sewing machine.
          </p>
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
        `}
      >
        <div css={halfColumn}>
          <h2>Open-Source Projects</h2>
          <ul>
            {opensourceProjects.map(repo => (
              <li key={repo}>
                <InlineLink href={`https://github.com/zachgawlik/${repo}`}>
                  {repo}{' '}
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
                </InlineLink>
              </li>
            ))}
          </ul>
          <InlineLink href="https://github.com/ZachGawlik?tab=repositories&type=source">
            View more...
          </InlineLink>
        </div>
        <div css={halfColumn}>
          <h2>Past experience</h2>
          <ul>
            <li>Bluecore (Sept. 2017 - Present)</li>
            <li>HubSpot</li>
            <li>Yeti LLC</li>
            <li>Novartis Institutes for Biomedical Research</li>
          </ul>
          <InlineLink href="/resume-zach-gawlik.pdf">View resume</InlineLink>
        </div>
      </div>
    </Layout>
  )
}

export default Home

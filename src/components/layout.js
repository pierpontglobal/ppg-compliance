/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import styled from 'styled-components'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const Holder = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Main = styled.div`
  width: 90%;
  height: 90%;
  margin: auto;
  margin-top: 100px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#86be04',
      contrastText: '#ffffff'
    }
  },
});

  return (
    <Holder>
      <ThemeProvider theme={outerTheme}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <Main>{children}</Main>
        {/* <footer>
          © {new Date().getFullYear()}, Built by PPG
        </footer> */}
      </div>
      </ThemeProvider>
    </Holder>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

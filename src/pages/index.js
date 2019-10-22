import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import TransitionsModal from "../components/transacionalModal"

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: '24px',
    margin: theme.spacing(1),
    width: '100px'
  },
  input: {
    display: 'none',
  },
}));

const Section1 = styled.div`
  width: 40%;
  height: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-content: left;
  align-items: left;
  justify-content: center;
  justify-items: center;
  @media only screen and (max-width: 550px) {
    width: 90%;
  }
`;

const Section2 = styled.div`
  width: 60%;
  height: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-content: left;
  align-items: left;
  justify-content: center;
  justify-items: center;
  @media only screen and (max-width: 550px) {
    width: 90%;
  }
`;

const Title = styled.div`
  text-transform: uppercase;
  font-weight: 900;
  font-size: 47px;
  line-height: 40px;
  color: #1c366f;
  @media only screen and (max-width: 1024px) {
    font-size: 36px;
    line-height: 36px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 24px;
    line-height: 24px;
  }
`;

const MainImage = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "main_image.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 1400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
}

const SubHeader = styled.div`
  font-weight: 200;
  margin-top: 16px;
  font-size: 16px;
  color: #333333;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
    line-height: 14px;
  }
`;

const IndexPage = () => {
  const classes = useStyles();
  return (
  <Layout>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <SEO title="Home" />

    <Section1>
      <Title>
        Know your customer
      </Title>
      <SubHeader>
        Know your customer is a standard in the finance and international commerce industry.
        This allows us to know detailed information about our clients' risk tolerance, investment knowledge, and financial position.
        KYC protects both clients and investment advisors.
        <br/>
        <br/>
        Please fill out all compliance related information,
        as well as upload two forms of government issued identification.
      </SubHeader>
      <TransitionsModal />
    </Section1>

    <Section2>
      <MainImage/>
    </Section2>

    {/*<Link to="/page-2/">Go to page 2</Link>*/}
  </Layout>
  )
}

export default IndexPage

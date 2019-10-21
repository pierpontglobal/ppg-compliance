import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: '24px',
    margin: theme.spacing(1),
    width: '100px',
    backgroundColor: '#86be04'
  },
  input: {
    display: 'none',
  },
}));

const Section1 = styled.div`
  width: 40%;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-content: left;
  align-items: left;
  justify-content: center;
  justify-items: center;
`;

const Section2 = styled.div`
  width: 60%;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-content: left;
  align-items: left;
  justify-content: center;
  justify-items: center;
`;

const Title = styled.div`
  text-transform: uppercase;
  font-weight: 900;
  font-size: 47px;
  line-height: 40px;
  color: #1c366f;
`;

const MainImage = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "main_image.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend urna vel ultrices luctus. Nulla vel turpis ex. Duis tempor arcu quis nisi pharet
      </SubHeader>
      <Button variant="contained" color="primary" className={classes.button}>
        Submit
      </Button>
    </Section1>

    <Section2>
      <MainImage/>
    </Section2>

    {/*<Link to="/page-2/">Go to page 2</Link>*/}
  </Layout>
  )
}

export default IndexPage

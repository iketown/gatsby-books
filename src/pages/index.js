import React from "react"
import { Link, graphql } from "gatsby"
import BookItem from "../components/BookItem"
import Layout from "../components/layout"
import styled from "styled-components"

const LinkButton = styled.div`
  text-align: right;
  a {
    padding: 8px 16px;
    background: rebeccapurple;
    color: white;
    border-radius: 8px;
    text-decoration: none;
    &:hover {
      background: indigo;
    }
  }
`

const IndexPage = ({ data }) => {
  const books = data.allBook.edges
  console.log("data", data)
  return (
    <section>
      {books.map(({ node }) => {
        const { id } = node
        return (
          <BookItem {...node} key={id}>
            <LinkButton>
              <Link to={`/book/${id}`}>join conversation</Link>
            </LinkButton>
          </BookItem>
        )
      })}
    </section>
  )
}

export const query = graphql`
  query MyQuery {
    allBook {
      edges {
        node {
          summary
          title
          localImage {
            childImageSharp {
              fixed(width: 200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          id
          author {
            name
          }
        }
      }
    }
  }
`

export default IndexPage

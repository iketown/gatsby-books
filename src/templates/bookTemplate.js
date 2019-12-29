import React from "react"
import Layout from "../components/layout"
import BookItem from "../components/BookItem"
import { graphql } from "gatsby"
const BookTemplate = props => {
  console.log("props data", props.data)
  return (
    <section>
      <BookItem {...props.data.book} />
    </section>
  )
}

export const query = graphql`
  query BookQuery($bookId: String!) {
    book(id: { eq: $bookId }) {
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
`

export default BookTemplate

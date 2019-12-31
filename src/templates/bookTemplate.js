import React from "react"
import BookItem from "../components/BookItem"
import { graphql } from "gatsby"
import { BookComments } from "../components/common"
import { useFirebaseCtx } from "../components/Firebase"

const BookTemplate = props => {
  const { firebase } = useFirebaseCtx()
  return (
    <section>
      <BookItem {...props.data.book} />
      {!!firebase && (
        <BookComments bookId={props.data.book.id} firebase={firebase} />
      )}
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

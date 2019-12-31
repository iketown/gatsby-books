import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
const BookItemWrapper = styled.section`
  border: 1px solid #ddd;
  padding: 14px 8px;
  background: white;
  margin-bottom: 8px;
  display: flex;

  h2 {
    small {
      font-weight: normal;
      font-size: 1rem;
      padding-left: 8px;
    }
  }
`

const BookImage = styled.div`
  max-width: 200px;
  img {
    max-width: 200px;
  }
`
const BookContent = styled.div`
  flex-grow: 1;
  padding-left: 8px;
`

const BookItem = ({ title, summary, author, children, localImage }) => {
  console.log(title, localImage)
  return (
    <BookItemWrapper>
      {localImage && (
        <BookImage>
          <Img fixed={localImage.childImageSharp.fixed} />
        </BookImage>
      )}
      <BookContent>
        <h2>
          {title} <small>{author.name}</small>
        </h2>
        <p>
          {summary.slice(0, 600)}
          {summary.length > 600 && ". . ."}
        </p>
        <div>{children}</div>
      </BookContent>
    </BookItemWrapper>
  )
}

export default BookItem

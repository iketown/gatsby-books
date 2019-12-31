import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Button, Input, ErrorMessage } from "./"
import moment from "moment"

const CommentListItem = styled.div`
  > strong {
    font-size: 80%;
    color: #666;
  }
  border-bottom: 1px solid #ddd;
  padding: 4px 0;
`

const CommentForm = styled.form`
  display: flex;

  margin-top: 32px;
  ${Input} {
    margin-right: 8px;
    margin: auto 8px auto;
  }
  ${Button} {
    margin: auto 0;
  }
`

export const BookComments = ({ firebase, bookId }) => {
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState("")
  const [errorText, setErrorText] = useState("")

  const handlePostCommentSubmit = e => {
    e.preventDefault()
    setCommentText("")
    firebase.postComment({ text: commentText, bookId }).catch(err => {
      setErrorText(err.message)
    })
  }
  useEffect(() => {
    const onSnapshot = snapshot => {
      const _comments = []
      snapshot.forEach(doc => {
        _comments.push({ id: doc.id, ...doc.data() })
      })
      setComments(_comments)
    }
    const unsubscribe = firebase.subscribeToBookComments({ bookId, onSnapshot })
    return unsubscribe
  }, [firebase, bookId])
  return (
    <div>
      {!!errorText && <ErrorMessage>{errorText}</ErrorMessage>}
      <CommentForm onSubmit={handlePostCommentSubmit}>
        <Input
          value={commentText}
          onChange={e => {
            e.persist()
            setCommentText(e.target.value)
          }}
        />
        <Button type="submit">post comment</Button>
      </CommentForm>
      {comments.map(comment => {
        return (
          <CommentListItem key={comment.id}>
            <strong>{comment.username}</strong>
            <span>
              {" "}
              - {moment(comment.dateCreated.toDate()).format("HH:mm MMM Do")}
            </span>
            <div>{comment.text}</div>
          </CommentListItem>
        )
      })}
    </div>
  )
}

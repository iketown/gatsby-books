import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useFirebaseCtx } from "../components/Firebase/context"
import { Form, Button, Input } from "../components/common"
import ShowMe from "../components/common/ShowMe.jsx"
import { useMounted } from "../utils/useMounted"
const FormField = styled.div`
  margin-bottom: 20px;
`

let fileReader
if (typeof window !== "undefined") {
  fileReader = new FileReader()
}

const AddBook = () => {
  const { firebase } = useFirebaseCtx()
  const [authors, setAuthors] = useState([])
  const [bookCover, setBookCover] = useState("")
  const [bookName, setBookName] = useState("")
  const [summary, setSummary] = useState("")
  const [success, setSuccess] = useState(false)
  const [authorId, setAuthorId] = useState("")
  const { isMounted } = useMounted()
  useEffect(() => {
    fileReader.addEventListener("load", () => {
      setBookCover(fileReader.result)
    })
    fileReader.onerror = e => {
      console.log("reader error")
    }
  }, [])
  useEffect(() => {
    // query all avail authors
    !!firebase &&
      firebase.getAuthors().then(snapshot => {
        const _authors = []
        snapshot.forEach(doc => {
          _authors.push({ id: doc.id, ...doc.data() })
        })
        if (isMounted) {
          setAuthors(_authors)
          setAuthorId(_authors[0].id)
        }
      })
  }, [firebase, isMounted])
  const handleSubmit = e => {
    e.preventDefault()
    firebase.createBook({ bookName, authorId, bookCover, summary }).then(() => {
      isMounted && setSuccess(true)
    })
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormField>
        {success && <strong>SUCCESS</strong>}
        <Input
          value={bookName}
          onChange={e => {
            e.persist()
            setBookName(e.target.value)
          }}
          placeholder="book name"
        />
      </FormField>
      <FormField>
        <strong>Author</strong>
        <div>
          <select
            value={authorId}
            onBlur={e => {
              e.persist()
              console.log("e.target.value", e.target.value)
              setAuthorId(e.target.value)
            }}
          >
            {authors.map(author => {
              return (
                <option value={author.id} key={author.id}>
                  {author.name}
                </option>
              )
            })}
          </select>
        </div>
      </FormField>
      <FormField>
        <strong>Book Cover</strong>
        <Input
          type="file"
          onChange={e => {
            e.persist()
            fileReader.readAsDataURL(e.target.files[0])
          }}
        />
      </FormField>
      <FormField>
        <strong>Summary</strong>
        <Input
          placeholder="Book Summary"
          value={summary}
          onChange={e => {
            e.persist()
            setSummary(e.target.value)
          }}
        />
      </FormField>
      <Button block>Add new Book</Button>
      <ShowMe obj={{ bookName, authorId, bookCover, summary }} name="" />
    </Form>
  )
}

export default AddBook

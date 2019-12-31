import React, { useState } from "react"
import { Form, Input, Button, ErrorMessage } from "../components/common"
import { useFirebaseCtx } from "../components/Firebase/context"
import { useMounted } from "../utils/useMounted"
//
//
const AddAuthor = () => {
  const [authorName, setAuthorName] = useState("")
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  let { isMounted } = useMounted()

  const { firebase } = useFirebaseCtx()
  const onSubmit = e => {
    e.preventDefault()
    firebase
      .createAuthor({ authorName })
      .then(() => {
        setAuthorName("")
        setSuccess(true)
      })
      .catch(err => {
        isMounted && setErrorMessage(err.message)
      })
  }
  return (
    <Form {...{ onSubmit }}>
      <Input
        placeholder="author name"
        onChange={e => {
          e.persist()
          setSuccess(false)
          setErrorMessage("")
          setAuthorName(e.target.value)
        }}
        value={authorName}
      />
      {success && <span>author created successfully</span>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Button type="submit" block>
        add Author
      </Button>
    </Form>
  )
}

export default AddAuthor

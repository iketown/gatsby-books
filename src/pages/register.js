import React, { useState } from "react"
import { Form, Input, Button, ErrorMessage } from "../components/common"
import { useFirebaseCtx } from "../components/Firebase/context"

const Register = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    username: "",
  })
  const [errorMessage, setErrorMessage] = useState("")
  const { firebase } = useFirebaseCtx()
  const { email, username, password, passwordConfirm } = formState
  const handleSubmit = e => {
    e.preventDefault()
    if (password === passwordConfirm) {
      // register
      firebase.register({ email, password, username }).catch(err => {
        setErrorMessage(err.message)
      })
    } else {
      setErrorMessage("Password fields must match")
    }
  }
  const handleChange = e => {
    e.persist()
    setErrorMessage("")
    setFormState(old => ({ ...old, [e.target.name]: e.target.value }))
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        onChange={handleChange}
        value={email}
        name="email"
        placeholder="email"
        type="email"
        required
      />
      <Input
        onChange={handleChange}
        value={username}
        name="username"
        placeholder="username"
        type="text"
        required
      />
      <Input
        onChange={handleChange}
        value={password}
        minLength={6}
        name="password"
        placeholder="password"
        type="password"
        required
      />
      <Input
        onChange={handleChange}
        value={passwordConfirm}
        minLength={6}
        name="passwordConfirm"
        placeholder="confirm password"
        type="password"
        required
      />
      {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Button block type="submit">
        register
      </Button>
    </Form>
  )
}

export default Register

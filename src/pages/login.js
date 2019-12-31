import React, { useState } from "react"
import { useFirebaseCtx } from "../components/Firebase/context"
import { Form, Input, Button, ErrorMessage } from "../components/common"
import { useMounted } from "../utils/useMounted"
import { navigate } from "gatsby"

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" })
  const [errorMsg, setErrorMsg] = useState("")
  const { firebase } = useFirebaseCtx()
  let { isMounted } = useMounted()

  function handleSubmit(e) {
    e.preventDefault()
    const { email, password } = formValues
    firebase
      .login({ email, password })
      .then(() => {
        navigate("/")
      })
      .catch(err => {
        isMounted && setErrorMsg(err.message)
      })
  }
  const handleInputChange = e => {
    e.persist()
    setErrorMsg("")
    setFormValues(old => ({
      ...old,
      [e.target.name]: e.target.value,
    }))
  }
  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Input
          onChange={handleInputChange}
          value={formValues.email}
          name="email"
          placeholder="email"
          type="email"
          required
        />
        <Input
          onChange={handleInputChange}
          value={formValues.password}
          placeholder="password"
          name="password"
          type="password"
          required
        />
        {!!errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        <Button block type="submit">
          submit
        </Button>
      </Form>
    </section>
  )
}

export default Login

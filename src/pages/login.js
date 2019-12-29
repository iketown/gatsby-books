import React, { useState } from "react"
import { Link } from "gatsby"
import { useAuth } from "../components/Firebase/index"
import { useFirebaseCtx } from "../components/Firebase/context"
import SEO from "../components/seo"

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" })
  // const { firebase } = useAuth()
  const { firebase } = useFirebaseCtx()
  function handleSubmit(e) {
    e.preventDefault()
    const { email, password } = formValues
    firebase.login({ email, password })
  }
  const handleInputChange = e => {
    e.persist()
    setFormValues(old => ({
      ...old,
      [e.target.name]: e.target.value,
    }))
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          value={formValues.email}
          name="email"
          placeholder="email"
          type="email"
        />
        <input
          onChange={handleInputChange}
          value={formValues.password}
          placeholder="password"
          name="password"
          type="password"
        />
        <button type="submit">submit</button>
      </form>
    </section>
  )
}

export default Login

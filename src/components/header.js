import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import { useFirebaseCtx } from "./Firebase"

const LogoutLink = styled.span`
  text-align: right;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`
const LoginLink = styled.div`
  > a {
    color: white;
    margin: auto 0;
  }
`
const HeaderWrapper = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`
const HeaderContent = styled.div`
  margin: 0 auto;
  max-width: 960;
  padding: 1.45rem 1.0875rem;
  display: flex;
  > h1 {
    margin: 0;
    flex-grow: 1;
    > a {
      color: white;
      text-decoration: none;
    }
  }
  > div {
    margin: auto 0;
  }
`

const UserInfo = styled.div`
  text-align: right;
  color: white;
  > a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`
const Divider = styled.span`
  margin: 0 8px;
  padding-right: 1px;
  background: #999;
`

const Header = ({ siteTitle }) => {
  const { user, firebase } = useFirebaseCtx()
  console.log("USER", user)
  const handleLogout = () => {
    firebase.logout().then(() => {
      navigate("/login")
    })
  }
  return (
    <HeaderWrapper>
      <HeaderContent>
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
        <div>
          {!!user && !!user.email && (
            <UserInfo>
              <div>hello {user.username || user.email}</div>

              <LogoutLink onClick={handleLogout}>Logout</LogoutLink>
              {!!user && !!user.isAdmin && (
                <>
                  <Divider />
                  <Link to="/add-author">Add Author</Link>
                  <Divider />
                  <Link to="/add-book">Add Book</Link>
                </>
              )}
            </UserInfo>
          )}
          {(!user || !user.email) && (
            <LoginLink>
              <Link to="/login">Login</Link>
              <Divider />
              <Link to="/register">Register</Link>
            </LoginLink>
          )}
        </div>
      </HeaderContent>
    </HeaderWrapper>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

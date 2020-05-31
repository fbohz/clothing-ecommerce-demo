import React from "react";
import styled from 'styled-components'

import Login from '../../components/authentication/Login'
import Signup from '../../components/authentication/Signup'

const LoginLogout = () => {
    return (
        <LoginLogoutStyle>
            <Login />
            <Signup />
        </LoginLogoutStyle>
    )
}

export default LoginLogout

const LoginLogoutStyle = styled.div`
  width: 850px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
`
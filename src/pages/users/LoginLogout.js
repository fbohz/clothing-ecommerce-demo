import React from "react";
import styled from 'styled-components'
import Login from '../../components/authentication/Login'
import Logout from '../../components/authentication/Logout'

const LoginLogout = () => {
    return (
        <LoginLogoutStyle>
            <Login />
        </LoginLogoutStyle>
    )
}

export default LoginLogout

const LoginLogoutStyle = styled.div`

`
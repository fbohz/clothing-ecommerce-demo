import React from "react";
import styled from 'styled-components'
import FormInput from './FormInput'
import CustomButton from '../CustomButton'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({email: '', password: ''})
    }

    handleChange = e => {
       const { name, value } = e.target

       this.setState({[name]: value })
    }
    
    render() {
        return (
            <LoginStyle>
                <br/>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                    name="email" 
                    type="email" 
                    value={this.state.email} 
                    label="email"
                    handleChange={this.handleChange} required />
                    <FormInput name="password" type="password" value={this.state.password} handleChange={this.handleChange} label="password" required />
                    <CustomButton type="submit">Sign In</CustomButton>
                </form>
            </LoginStyle>
        )
    }
    }

export default Login

const LoginStyle = styled.div`
    width: 30vw;
    display: flex;
    flex-direction: column;

    .title {
        margin: 10px 0;
    }

`
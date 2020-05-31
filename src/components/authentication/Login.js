import React from "react";
import styled from 'styled-components'
import FormInput from './FormInput'
import CustomButton from '../CustomButton'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            formError: '',
        }
    }

    handleSubmit = async e => {
        e.preventDefault()

        const { email, password } = this.state

        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({email: '', password: ''})

        } catch (error) {
            console.error(error);
            this.setState({
                ...this.state,
                formError: error
            })
          }

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
                <span>Login with your email and password</span>
                <span style={{color: 'red'}}>{this.state.formError ? this.state.formError.message : null }</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                    name="email" 
                    type="email" 
                    value={this.state.email} 
                    label="email"
                    handleChange={this.handleChange} required />
                    <FormInput name="password" type="password" value={this.state.password} handleChange={this.handleChange} label="password" required />

                    <ButtonsBarContainer>
                        <CustomButton type='submit'> Login </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                        Login with Google
                        </CustomButton>
                    </ButtonsBarContainer>
                </form>
            </LoginStyle>
        )
    }
    }

export default Login

const LoginStyle = styled.div`
    width: 380px;
    display: flex;
    flex-direction: column;

    .title {
        margin: 10px 0;
    }
`

const ButtonsBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
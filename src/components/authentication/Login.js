import React from "react";
import {connect} from 'react-redux'
import styled from 'styled-components'
import FormInput from './FormInput'
import CustomButton from '../CustomButton'

import {googleStart, emailStart, clearError} from '../../redux/actions/actions'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            // formError: '',
        }
    }

    componentDidMount(){
        const {clearError} = this.props
        if (this.props.error) {
            clearError()
        }
    }

    handleSubmit = async e => {
        e.preventDefault()
        const {emailStart} = this.props
        const { email, password } = this.state
        emailStart(email, password)
    }

    handleChange = e => {
       const { name, value } = e.target

       this.setState({[name]: value })
    }

    handleError = e => {
        window.scrollTo(0,0)
        return  `ERROR ${e}`
    }
    
    render() {
        const {googleStart, error} = this.props
        return (
            <LoginStyle>
                <br/>
                <span style={{color: 'red'}}>{error ? this.handleError(error.message) : null }</span>
                <SignInTitle>I already have an account</SignInTitle>
                <span>Login with your email and password</span>

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
                        <CustomButton type="button" 
                        onClick={googleStart} isGoogleSignIn>
                        Login with Google
                        </CustomButton>
                    </ButtonsBarContainer>
                </form>
            </LoginStyle>
        )
    }
}

const msp = state => ({
    error: state.user.error
})

const mdp = dispatch => ({
    googleStart: () => dispatch(googleStart()),
    emailStart: (email, psw) => dispatch(emailStart({ email, psw })),
    clearError: () => dispatch(clearError())
})

export default connect(msp,mdp)(Login)

const LoginStyle = styled.div`
    width: 380px;
    display: flex;
    flex-direction: column;

    .title {
        margin: 10px 0;
    }
`
const SignInTitle = styled.h2`
  margin: 10px 0;
  font-family: 'Open Sans Condensed';
`

const ButtonsBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
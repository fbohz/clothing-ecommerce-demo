import React from "react";
import {connect} from 'react-redux'
import styled from 'styled-components'

import CustomButton from '../CustomButton'
import FormInput from '../authentication/FormInput'

import {signUpStart} from '../../redux/actions/actions'


class Signup extends React.Component {
    constructor() {
        super();
    
        this.state = {
          displayName: '',
          email: '',
          password: '',
          confirmPassword: '',
          formError: '',
        };
      }
    
      handleSubmit = async event => {
        event.preventDefault();
    
        const { displayName, email, password, confirmPassword } = this.state;
        const {signUpStart} = this.props
    
        if (password !== confirmPassword) {
          alert("passwords don't match");
          return;
        }

        signUpStart({ displayName, email, password })
      };
    
      handleChange = event => {
        const { name, value } = event.target;
    
        this.setState({ [name]: value });
      };
    
      render() {
        const { displayName, email, password, confirmPassword } = this.state;

        return (
          <SignUpContainer><br></br>
            <SignUpTitle>I do not have a account</SignUpTitle>
            <span>Sign up with your email and password</span>
            <span style={{color: 'red'}}>{this.state.formError ? this.state.formError.message : null }</span>
            <form className='sign-up-form' onSubmit={this.handleSubmit}>
              <FormInput
                type='text'
                name='displayName'
                value={displayName}
                onChange={this.handleChange}
                label='Display Name'
                required
              />
              <FormInput
                type='email'
                name='email'
                value={email}
                onChange={this.handleChange}
                label='Email'
                required
              />
              <FormInput
                type='password'
                name='password'
                value={password}
                onChange={this.handleChange}
                label='Password'
                required
              />
              <FormInput
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={this.handleChange}
                label='Confirm Password'
                required
              />
              <CustomButton type='submit'>SIGNUP</CustomButton>
            </form>
          </SignUpContainer>
        );
      }
} 

const mdp = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mdp)(Signup)

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
`;

const SignUpTitle = styled.h2`
  margin: 10px 0;
`;
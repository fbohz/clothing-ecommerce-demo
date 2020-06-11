import React, {useState} from "react";
import {connect} from 'react-redux'
import styled from 'styled-components'

import CustomButton from '../CustomButton'
import FormInput from '../authentication/FormInput'

import {signUpStart} from '../../redux/actions/actions'


const Signup = ({ signUpStart }) => {
      const [userCredentials, setUserCredentials] = useState(
        {
          displayName: '',
          email: '',
          password: '',
          confirmPassword: '',
          formError: '',
        }
      )
      const { displayName, email, password, confirmPassword } = userCredentials
    
      const handleSubmit = async event => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
          alert("passwords don't match");
          return;
        }

        signUpStart({ displayName, email, password })
      };
    
      const handleChange = event => {
        const { name, value } = event.target;
    
        setUserCredentials({ ...userCredentials, [name]: value });
      };
  
        return (
          <SignUpContainer><br></br>
            <SignUpTitle>I do not have a account</SignUpTitle>
            <span>Sign up with your email and password</span>
            <span style={{color: 'red'}}>{userCredentials.formError ? userCredentials.formError.message : null }</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
              <FormInput
                type='text'
                name='displayName'
                value={displayName}
                onChange={handleChange}
                label='Display Name'
                required
              />
              <FormInput
                type='email'
                name='email'
                value={email}
                onChange={handleChange}
                label='Email'
                required
              />
              <FormInput
                type='password'
                name='password'
                value={password}
                onChange={handleChange}
                label='Password'
                required
              />
              <FormInput
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleChange}
                label='Confirm Password'
                required
              />
              <CustomButton type='submit'>SIGNUP</CustomButton>
            </form>
          </SignUpContainer>
        );
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
  font-family: 'Open Sans Condensed';
`;
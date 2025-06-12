import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignUpContainer, H2 } from "./sign-up-form.styles";
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const dispatch = useDispatch()
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormFields({
      ...formFields,
      [name]: value.trim()
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (displayName !== '' && email !== '' && password !== '' && password === confirmPassword) {
      try {
        dispatch(signUpStart(email, password, displayName))
        resetFormFields()
      } catch (error) {
        if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
          alert('Cannot create user, email already in use!')
        } else {
          console.log("error:", (error as AuthError).code, error);
        }
      }
    }
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  return (
    <SignUpContainer>
      <H2>Don't have an account?</H2>
      <span>Sign-up with your email and password...</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          id="displayName"
          name="displayName"
          type="text"
          onChange={handleChange}
          value={displayName}
          required
        />
        <FormInput
          label="Email"
          id="email-sign-up"
          name="email"
          type="email"
          onChange={handleChange}
          value={email}
          required
        />
        <FormInput
          label="Password"
          id="password-sign-up"
          name="password"
          type="password"
          onChange={handleChange}
          value={password}
          required
        />
        <FormInput
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={handleChange}
          value={confirmPassword}
          required
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
}

export default SignUpForm

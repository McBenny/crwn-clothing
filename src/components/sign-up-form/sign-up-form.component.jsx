import { useState } from "react";
import { createUserDocumentFromAuth, createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignUpContainer, H2 } from "./sign-up-form.styles";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

   const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({
      ...formFields,
      [name]: value.trim()
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (displayName !== '' && email !== '' && password !== '' && password === confirmPassword) {
      try {
        const { user } = await createAuthUserWithEmailAndPassword(email, password);        
        await createUserDocumentFromAuth(user, { displayName });
        resetFormFields()
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert('Cannot create user, email already in use!')
        } else {
          console.log("error:", error.code, error);
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

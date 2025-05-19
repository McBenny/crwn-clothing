import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
// import {
//   auth,
//   createUserDocumentFromAuth,
//   createAuthUserWithEmailAndPassword,
// } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value.trim(),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      email !== "" &&
      password !== ""
    ) {
      try {
        const response = await signInAuthUserWithEmailAndPassword(email, password);
        console.log(response);
        resetFormFields()
      } catch (error) {
        let message = ''
        switch(error.code) {
          case 'auth/invalid-credential':
            message = 'Invalid credentials'
            break;

          default:
            message = "Error signing-in with email and password";
        }
        if (message) {
          console.log(message, error.code)
        }
      }

    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account?</h2>
      <span>Sign-in with your email and password...</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          value={email}
          required
        />
        <FormInput
          label="Password"
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          value={password}
          required
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" type='button' onClick={signInWithGoogle}>
            Google Sign-in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

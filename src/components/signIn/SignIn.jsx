import { Button } from "@mui/material";
import { useContext, useState } from "react";

import FormInput from "../../UI/formInput/FormInput";
import {
  signInAuthWithEmailAndPassword,
  GoogleSignUpWithPopUp,
} from "../../utill/firebase/firebase.auth";
import { AuthErrorCodes } from "firebase/auth";
import FormContainer from "../../UI/formContainer/FormContainer";

import {
  SignUpContainer,
  ButtonContainer,
  ToggleSignUp,
} from "./SignIn.styles";
import Spinner from "../../UI/spinner/spinner";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const defaultFormField = {
  email: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();
  const { toggleSignForm } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formField, setFormField] = useState(defaultFormField);

  const { password, email } = formField;

  const onChangeHandler = (e) => {
    setFormField({
      ...formField,
      [e.target.id]: e.target.value,
    });
  };

  const resetFormField = () => {
    setFormField(defaultFormField);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInAuthWithEmailAndPassword(email, password);
      resetFormField();
      setIsLoading(false);
    } catch (error) {
      if (error.message === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Input Email is already in used");
      }
      console.log(error);
      setIsLoading(false);
    }
    navigate("/");
  };

  const googleLogInHandler = async () => {
    setIsLoading(true);

    try {
      await GoogleSignUpWithPopUp();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    navigate("/");
  };

  const toggleSignUpFormHandler = () => {
    toggleSignForm();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SignUpContainer>
      <h1> Enter Your Account</h1>
      <FormContainer onSubmit={submitHandler}>
        <FormInput
          label="Email"
          type="email"
          id="email"
          value={email}
          placeholder="Email"
          required
          onChange={onChangeHandler}
        />

        <FormInput
          label="Password"
          type="password"
          id="password"
          value={password}
          placeholder="password"
          required
          onChange={onChangeHandler}
        />

        <ButtonContainer>
          <Button variant="contained" color="secondary" type="submit">
            <span> submit</span>
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={googleLogInHandler}
          >
            <span>Google log in</span>
          </Button>
        </ButtonContainer>
      </FormContainer>
      <ToggleSignUp onClick={toggleSignUpFormHandler}>
        Create a New Account
      </ToggleSignUp>
    </SignUpContainer>
  );
};

export default SignIn;

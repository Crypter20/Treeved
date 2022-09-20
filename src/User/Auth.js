// /* global chrome */
import React, { useContext, useState } from "react";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import Button from "../shared/components/FormElements/Button";
import Input from "../shared/components/FormElements/Input";
import Card from "../shared/components/UIElements/Card";
import { AuthContext } from "../shared/context/auth-context";
import { useForm } from "../shared/hooks/form-hook";
import { VALIDATOR_MINLENGTH } from "../shared/util/validator";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import "./Auth.css";
import { isExpired } from "react-jwt";
import Home from "./Home";
const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, inputHandler] = useForm(
    {
      username: {
        value: "",
        isvalid: false,
      },
      password: {
        value: "",
        isvalid: false,
      },
    },
    false
  );
  let token = "";
  // const refreshtoken = localStorage.getItem(["refreshtoken"], () => {});
  //
  // const refIsExp = isExpired(refreshtoken);
  const errorHandler = () => {
    setError(null);
  };
  // if (token !== "" && !isExp) {
  //   auth.login();
  // } else if (token !== "" && !refIsExp) {

  // } else {
  if (!localStorage.getItem("token")) {
    const authSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://api-dev.treeved.com/v1/auth/login/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: formState.inputs.username.value,
              password: formState.inputs.password.value,
            }),
          }
        );
        const responseData = await response.json();
        if (!response.ok) {
          // console.log(responseData.detail);
          throw new Error(responseData);
        }
        auth.login();
        localStorage.setItem("token", responseData.access);
        localStorage.setItem("refreshtoken", responseData.refresh);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
        setError(error);
      }
    };
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={errorHandler} />
        <Card className="authentication">
          {isLoading && <LoadingSpinner asOverlay />}
          <h2>Login Required</h2>
          <hr />
          <form onSubmit={authSubmitHandler}>
            <Input
              element="input"
              id="username"
              type="text"
              label="Username"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid username"
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="password"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid Password"
              onInput={inputHandler}
            />
            <Button type="submit">LOGIN</Button>
          </form>
        </Card>
      </React.Fragment>
    );
  } else {
    token = localStorage.getItem("token");
    const isExp = isExpired(token);
    const refreshtoken = localStorage.getItem("refreshtoken");
    const refIsExp = isExpired(refreshtoken);

    // console.log(refIsExp);
    if (!isExp) {
      auth.login();
      return <Home />;
    } else if (!refIsExp) {
      const getAccess = async () => {
        const response = await fetch(
          "https://api-dev.treeved.com/v1/auth/login/refresh/",
          {
            method: "POST",
            body: JSON.stringify({
              refresh: refreshtoken,
            }),
          }
        );
        const responseData = response.json();
        localStorage.setItem("token", responseData.access);
        localStorage.setItem("refreshtoken", responseData.refresh);
        auth.login();
      };
      getAccess();
    }
  }
  // useEffect(() => {}, []);
};
export default Auth;

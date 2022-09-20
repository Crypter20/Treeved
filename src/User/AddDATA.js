import React from "react";
import { useForm } from "../shared/hooks/form-hook";
import Button from "../shared/components/FormElements/Button";
import Input from "../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_URL } from "../shared/util/validator";
const AddDATA = () => {
  const [formState, inputHandler] = useForm(
    {
      urls: {
        value: "",
        isvalid: false,
      },
      rating: {
        value: 3,
        isvalid: true,
      },
    },
    false
  );
  const token = localStorage.getItem("token");
  const addToList = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://api-dev.treeved.com/v1/user_collections/all/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {}
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Input
        element="input"
        id="url"
        type="url"
        label="url"
        placeholder="Please enter the URL"
        validators={[VALIDATOR_URL, VALIDATOR_REQUIRE]}
        errorText="Please enter a valid URL"
        onInput={inputHandler}
      />
      <div>
        <Input
          element="input"
          id="rating"
          type="range"
          label="rating"
          mark
          step={0.5}
          min={0}
          max={5}
          validators={[VALIDATOR_REQUIRE]}
          onInput={inputHandler}
        />
        <h1>{formState.rating}</h1>
      </div>
      <span>
        <Button onClick={addToList}>Add to List</Button>
        <Button>Add to Diary</Button>
      </span>
    </form>
  );
};

export default AddDATA;

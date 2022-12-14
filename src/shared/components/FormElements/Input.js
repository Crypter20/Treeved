import React, { useReducer, useEffect } from "react";
import { validate } from "../../util/validator";
import "./Input.css";
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isvalid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};
const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isTouched: false,
    isvalid: false,
  });

  const { id, onInput } = props;
  const { value, isvalid } = inputState;

  useEffect(() => {
    onInput(id, value, isvalid);
  }, [id, onInput, value, isvalid]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        step={props.step}
        min={props.min}
        max={props.max}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isvalid && inputState.isTouched && "form-control--invalid"
      } `}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isvalid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;

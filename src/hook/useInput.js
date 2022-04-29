import { useState } from "react";

function useInput(validateFuc) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouch, setIsTouch] = useState(false);

  const inValid = validateFuc(enteredValue);
  const hasError = inValid && isTouch;

  function enteredValueHandler(event) {
    setEnteredValue(event.target.value);
  }
  function inputBlureHandeler() {
    setIsTouch(true);
  }
  function resetStates() {
    setIsTouch(false);
    setEnteredValue("");
  }
  return {
    value: enteredValue,
    setEnteredValue,
    inValid,
    hasError,
    enteredValueHandler,
    inputBlureHandeler,
    resetStates,
  };
}

export default useInput;

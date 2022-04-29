import useInput from "../../hook/useInput";
import classes from "./addRecipe.module.css";
import Dropzone from "react-dropzone";
import { BsImage } from "react-icons/bs";
import { useState } from "react";
import useHttp from "../../hook/useHttp";
import { useNavigate } from "react-router-dom";
export default function AddRecipe() {
  const { sendRequest, hasError } = useHttp();
  const navigate = useNavigate()
  function titleValidation(title) {
    const regex = new RegExp(/^[A-Za-z\s]+$/);
    if (title.trim().length === 0) {
      return "title is required";
    }
    if (!regex.test(title)) {
      return "title must be string";
    }
    if (title.trim().length >= 20) {
      return "title lenght leats 20 character";
    }
  }
  function timeValidation(minutes) {
    const regex = new RegExp(/^[0-9]+$/);
    if (minutes.trim().length === 0) {
      return "fild is required";
    }
    if (!regex.test(minutes)) {
      return "fild must be number";
    }
  }
  const {
    value: titleValue,
    inValid: titleInvalid,
    hasError: titleHasError,
    enteredValueHandler: titleEnteredValueHandeler,
    inputBlureHandeler: titleInputBlureHandeler,
    resetStates: resetTitleValue,
  } = useInput(titleValidation);

  const {
    value: preTimeValue,
    inValid: preTimeInvalid,
    hasError: preTimeHasError,
    enteredValueHandler: preTimeEnteredValueHandeler,
    inputBlureHandeler: preTimeInputBlureHandeler,
    resetStates: resetPrepTimeValue,
  } = useInput(timeValidation);

  const {
    value: cookTimeValue,
    inValid: cookTimeInvalid,
    hasError: cookTimeHasError,
    enteredValueHandler: cookTimeEnteredValueHandeler,
    inputBlureHandeler: cookTimeInputBlureHandeler,
    resetStates: resetCookTimeValue,
  } = useInput(timeValidation);

  const {
    value: ingredientsValue,
    inValid: ingredientsInvalid,
    hasError: ingredientsHasError,
    enteredValueHandler: ingredientsEnteredValueHandeler,
    inputBlureHandeler: ingredientsInputBlureHandeler,
    resetStates: resetIngredientsValue,
  } = useInput((ingredients) => {
    if (ingredients.trim().length === 0) {
      return "Ingredients is required";
    }
  });

  const {
    value: recipeValue,
    inValid: recipeInvalid,
    hasError: recipeHasError,
    enteredValueHandler: recipeEnteredValueHandeler,
    inputBlureHandeler: recipeInputBlureHandeler,
    resetStates: resetRecipeValue,
  } = useInput((recipe) => {
    if (recipe.trim().length === 0) {
      return "Recipe is required";
    }
  });
  const [uploadImage, setUploadImage] = useState([]);
  let validForm = false;
  if (
    !titleHasError &&
    !ingredientsHasError &&
    !preTimeHasError &&
    !cookTimeHasError &&
    !recipeHasError &&
    uploadImage[0]?.name
  ) {
    validForm = true;
  }
  const [resSeccessMessage ,setResSeccessMessage] = useState('')
  const responseHandler = (res) => {
    if (res.status === 200) {
      resetRecipeValue();
      resetCookTimeValue();
      resetPrepTimeValue();
      resetTitleValue();
      resetIngredientsValue();
      setResSeccessMessage('Seccess Add Recipe')
      validForm=false
    }
  };

  const addRecipeHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", titleValue);
    formData.append("prepTime", preTimeValue);
    formData.append("cookTime", cookTimeValue);
    formData.append("ingredients", ingredientsValue);
    formData.append("recipe", recipeValue);
    formData.append("image", uploadImage[0]);

    sendRequest(
      {
        url: "/cooking/recipe",
        method: "POST",
        body: formData,
      },
      (res)=>{
          console.log(res);
          if (res.status === 201) {
              navigate(`/recipe/${res.data._id}`)
          }
      }
    );
  };
  return (
    <section className={`container ${classes["container-form"]}`}>
      <div className={`d-flex justify-content-center align-items-center`}>
        <form
          className={`col-lg-7 col-md-8 shadow ${classes.form}`}
          onSubmit={addRecipeHandler}
        >
          <h1 className="mb-3 mt-1 align-self-center"> Add Recipe </h1>

          {hasError?.error && (
            <div className="my-3 mx-3 col-11 fw-bold alert alert-danger" role="alert">
              {hasError?.error}
            </div>
          )}
          {resSeccessMessage && (
            <div className="my-3 mx-3 col-11 fw-bold alert alert-success" role="alert">
              {resSeccessMessage}
            </div>
          )}
          <div className="col-11 mb-4 mx-3">
            <label htmlFor="title">Recipe Title</label>
            <input
              onChange={titleEnteredValueHandeler}
              onBlur={titleInputBlureHandeler}
              type="text"
              className={`py-2 col-12 ${classes.input}`}
              value={titleValue}
            ></input>
            {titleHasError && (
              <small className="text-danger fw-bold">{titleInvalid}</small>
            )}
          </div>
          <div className="col-11 mb-4 mx-3 d-flex justify-content-between">
            <div className="col-5">
              <label htmlFor="title">Prep Time /minutes</label>
              <input
                onChange={preTimeEnteredValueHandeler}
                onBlur={preTimeInputBlureHandeler}
                type="number"
                className={`py-2 col-12 ${classes.input}`}
                value={preTimeValue}
              ></input>
              {preTimeHasError && (
                <small className="text-danger fw-bold">{preTimeInvalid}</small>
              )}
            </div>
            <div className="col-5">
              <label htmlFor="title">Cook Time /minutes</label>
              <input
                onChange={cookTimeEnteredValueHandeler}
                onBlur={cookTimeInputBlureHandeler}
                type="number"
                className={`py-2 col-12 ${classes.input}`}
                value={cookTimeValue}
              ></input>
              {cookTimeHasError && (
                <small className="text-danger fw-bold">{cookTimeInvalid}</small>
              )}
            </div>
          </div>
          <div className="col-11 mb-4 mx-3">
            <label>Ingredients</label>
            <textarea
              className={`col-12 ${classes.textarea}`}
              value={ingredientsValue}
              onChange={ingredientsEnteredValueHandeler}
              onBlur={ingredientsInputBlureHandeler}
              placeholder="Write each ingredient on it`s own line "
            ></textarea>
            {ingredientsHasError && (
              <small className="text-danger fw-bold">
                {ingredientsInvalid}
              </small>
            )}
          </div>
          <div className="col-11 mb-4 mx-3">
            <label>Recipe</label>
            <textarea
              className={`col-12 ${classes.textarea}`}
              value={recipeValue}
              onChange={recipeEnteredValueHandeler}
              onBlur={recipeInputBlureHandeler}
              placeholder="Write each Recipe on it`s own line "
            ></textarea>
            {recipeHasError && (
              <small className="text-danger fw-bold">{recipeInvalid}</small>
            )}
          </div>
          <div
            className={`${classes.dropzone} text-center mb-5 py-2 d-flex justify-content-center col-11 mx-3`}
          >
            <Dropzone
              name="image"
              id="image"
              accept="image/*"
              onDrop={(image) => {
                setUploadImage(image);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section className={``}>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <BsImage
                      className={`my-1 fw-light ${classes.icon} align-self-center`}
                    />
                    <p className="align-self-center">{uploadImage[0]?.name}</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <button
            disabled={!validForm}
            type="submit"
            className={`align-self-end mb-3 mx-5 py-2 col-3 btn  ${classes.btn}`}
          >
            Save
          </button>
        {resSeccessMessage && (
            <div className="my-3 mx-3 col-11 fw-bold alert alert-success" role="alert">
              {resSeccessMessage}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

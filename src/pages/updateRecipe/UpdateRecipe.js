import useInput from "../../hook/useInput";
import classes from "./updateRecipe.module.css";
import Dropzone from "react-dropzone";
import { BsImage } from "react-icons/bs";
import { useEffect, useState } from "react";
import useHttp from "../../hook/useHttp";
import { useNavigate, useParams } from "react-router-dom";
import Empty from "../../components/shared/Empty/Empty";
function UpdateRecipe() {
  const { sendRequest, hasError } = useHttp();
  const [recipeImage, setRecipeImage] = useState({ url: "", _id: "" });
  const [recipeId, setRecipeId] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
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
    if (minutes.toString().trim().length === 0) {
      return "fild is required";
    }
    if (!regex.test(minutes)) {
      return "fild must be number";
    }
  }
  const {
    value: titleValue,
    setEnteredValue: setTitleState,
    inValid: titleInvalid,
    hasError: titleHasError,
    enteredValueHandler: titleEnteredValueHandeler,
    inputBlureHandeler: titleInputBlureHandeler,
  } = useInput(titleValidation);

  const {
    value: preTimeValue,
    setEnteredValue: setPrepTimeState,
    inValid: preTimeInvalid,
    hasError: preTimeHasError,
    enteredValueHandler: preTimeEnteredValueHandeler,
    inputBlureHandeler: preTimeInputBlureHandeler,
  } = useInput(timeValidation);

  const {
    value: cookTimeValue,
    setEnteredValue: setCookTimeState,
    inValid: cookTimeInvalid,
    hasError: cookTimeHasError,
    enteredValueHandler: cookTimeEnteredValueHandeler,
    inputBlureHandeler: cookTimeInputBlureHandeler,
  } = useInput(timeValidation);

  const {
    value: ingredientsValue,
    setEnteredValue: setIngredientsState,
    inValid: ingredientsInvalid,
    hasError: ingredientsHasError,
    enteredValueHandler: ingredientsEnteredValueHandeler,
    inputBlureHandeler: ingredientsInputBlureHandeler,
  } = useInput((ingredients) => {
    if (ingredients.trim().length === 0) {
      return "Ingredients is required";
    }
  });

  const {
    value: recipeValue,
    setEnteredValue: setRecipeState,
    inValid: recipeInvalid,
    hasError: recipeHasError,
    enteredValueHandler: recipeEnteredValueHandeler,
    inputBlureHandeler: recipeInputBlureHandeler,
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
    !recipeHasError
  ) {
    validForm = true;
  }
  const addRecipeHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", titleValue);
    formData.append("prepTime", preTimeValue);
    formData.append("cookTime", cookTimeValue);
    formData.append("ingredients", ingredientsValue);
    formData.append("recipe", recipeValue);
    if (uploadImage[0]) {
      formData.append("image", uploadImage[0]);
    }
    formData.append("imageId", recipeImage._id);

    sendRequest(
      {
        url: `/cooking/recipe/${recipeId}`,
        method: "PATCH",
        body: formData,
      },
      (res) => {
        if (res.status === 200) {
          console.log(res);
          navigate(`/recipe/${res.data._id}`);
        }
      }
    );
  };

  useEffect(() => {
    sendRequest(
      {
        url: `/cooking/recipe/${id}`,
        method: "GET",
      },
      (res) => {
        if (res.status === 200) {
          console.log(res.data);
          setTitleState(res.data.title);
          setRecipeState(res.data.recipe);
          setPrepTimeState(res.data.prepTime);
          setRecipeImage({ url: res.data.image.url, _id: res.data.image._id });
          setCookTimeState(res.data.cookTime);
          setIngredientsState(res.data.ingredients);
          setRecipeId(res.data._id);
        }
      }
    );
  }, [
    id,
    setIngredientsState,
    sendRequest,
    setTitleState,
    setRecipeState,
    setPrepTimeState,
    setRecipeImage,
    setCookTimeState,
  ]);
  return (
    <section className={`container ${classes["container-form"]}`}>
      {hasError?.error === "Recipe is not Exist" ? (
        <Empty message="Recipe is not Exist" />
      ) : (
        <div className={`d-flex justify-content-center align-items-center`}>
          <form
            className={`col-lg-7 col-md-8 shadow ${classes.form}`}
            onSubmit={addRecipeHandler}
          >
            <h1 className="mb-3 mt-1 align-self-center"> Update Recipe </h1>

            {hasError?.error && (
              <div
                className="my-3 mx-3 col-11 fw-bold alert alert-danger"
                role="alert"
              >
                {hasError?.error}
              </div>
            )}
            <img
              src={recipeImage.url}
              className={` mx-auto d-block ${classes.img}`}
              alt="..."
            ></img>
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
                  <small className="text-danger fw-bold">
                    {preTimeInvalid}
                  </small>
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
                  <small className="text-danger fw-bold">
                    {cookTimeInvalid}
                  </small>
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
            <label className="mx-3 align-self-start">Upload Image</label>
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
                      <p className="align-self-center">
                        {uploadImage[0]?.name}
                      </p>
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
              Update
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default UpdateRecipe;

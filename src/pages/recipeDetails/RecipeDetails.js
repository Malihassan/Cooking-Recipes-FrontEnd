import classes from "./recipeDetails.module.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useHttp from "../../hook/useHttp";
import Empty from "../../components/shared/Empty/Empty";
function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sendRequest, hasError } = useHttp();
  const [recipe, setRecipe] = useState();
  useEffect(() => {
    sendRequest(
      {
        url: `/cooking/recipe/${id}`,
        method: "GET",
      },
      (res) => {
        setRecipe(res.data);
      }
    );
  }, [sendRequest, id]);

  const deleteRecipeHandler = (id) => {
    sendRequest(
      {
        url: `/cooking/recipe/${id}`,
        method: "DELETE",
      },
      (res) => {
        if (res.status === 200) {
          navigate("/");
        }
      }
    );
  };
  return (
    <>
      {hasError?.error ? (
        <div className="pt-5">
          <Empty message={hasError?.error} />
        </div>
      ) : (
        <section className={classes['container-wrraper']}>
          <div
            className={`container col-lg-7 col-sm-10 shadow-lg py-4 mb-5 `}
          >
            <img src={recipe?.image?.url} className={classes.img} alt="img" />
            <h4 className={`fs-1 ${classes.title}`}>{recipe?.title}</h4>
            <div className="col-12 my-3  d-flex justify-content-between align-items-center">
              <h6 className={`align-self-start ${classes.time}`}>
                <span>PREP</span> {recipe?.prepTime} MINUTES{" "}
                <span className="mx-2">| COOK</span> {recipe?.cookTime} MINUTES
              </h6>
              <div className="d-flex">
                <AiFillEdit
                  onClick={() => {
                    navigate(`/updateRecipe/${recipe?._id}`);
                  }}
                  className={`me-4 ${classes.icon}`}
                />
                <AiFillDelete
                  onClick={() => {
                    deleteRecipeHandler(recipe?._id);
                  }}
                  className={classes.icon}
                />
              </div>
            </div>
            <table className={`table my-4 ${classes.table}`}>
              <thead>
                <tr>
                  <th scope="row" className={`th-lg col-3 ${classes.th}`}>Ingredients</th>
                  <th scope="row" className={` text-center ${classes.th}`}>Recipe</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`${classes.tr}`}>
                  <td className="px-3">
                    <label className={`${classes.label}`}>
                      {recipe?.ingredients}
                    </label>
                  </td>
                  <td className="px-5">
                    <label className={`${classes.label}`}>{recipe?.recipe}</label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
}

export default RecipeDetails;

import { useEffect, useState } from "react";
import headerImage from "../../assets/header.jpg";
import RecipeItem from "../../components/recipeItem/RecipeItem";
import Empty from "../../components/shared/Empty/Empty";
import { FaTrash } from "react-icons/fa";
import useHttp from "../../hook/useHttp";
import classes from "./recipes.module.css";
import Pagination from "../../components/shared/pagination/Pagination";
function Recipes() {
  const { sendRequest } = useHttp();
  const [resipesList, setResipesList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const onPageChange = ({ selected }) => {
    setPageNumber(selected + 1);
  };
  const getRecipes = () => {
    sendRequest(
      {
        url: "/cooking/recipes",
        params: { page: pageNumber },
        method: "GET",
      },
      (res) => {
        if (res.status === 200) {
          console.log(res);
          setResipesList(res.data);
        }
      }
    );
  };
  useEffect(() => {
    getRecipes();
  }, [pageNumber]);

  const clearRecipesHandler = () => {
    sendRequest(
      {
        url: "/cooking/clearRecipes",
        method: "DELETE",
      },
      (res) => {
        if (res.status === 200) {
          getRecipes();
        }
      }
    );
  };
  return (
    <section>
      <img
        className={`${classes.img} col-12`}
        alt="header"
        src={headerImage}
      ></img>
      {resipesList?.docs?.length === 0 ? (
        <Empty message="No Recipes Yet" />
      ) : (
        <div className={` row gx-0 mt-5`}>
          <div className="d-flex justify-content-end mb-3">
            <button className={classes.btn} onClick={clearRecipesHandler}>
              <FaTrash className="fs-4 mx-1" />
              clear Recipes
            </button>
          </div>
          <div className="col-12 w-100 d-flex justify-content-around flex-wrap">
            {resipesList?.docs?.map((item) => (
              <RecipeItem
                key={item._id}
                id={item._id}
                img={item.image.url}
                title={item.title}
                prepTime={item.prepTime}
                cookTime={item.cookTime}
              />
            ))}
          </div>
          <Pagination
            totalPages={resipesList.totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </section>
  );
}

export default Recipes;

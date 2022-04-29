import { Link } from "react-router-dom";
import classes from "./recipeItem.module.css";

function RecipeItem(props) {
  return (
    <div className={`card mx-1 my-4 col-lg-3 col-md-5 col-8 shadow ${classes["card-container"]}`}>
      <img src={props.img} className="card-img-top" alt="..." />
      <Link to={`/recipe/${props.id}`}  className={`py-3 border-0 px-4 ${classes.viewbutton}`}>View Details</Link>
      <div className="card-body">
        <label className={`card-text ${classes.title}`}>
          {props.title}
        </label>
        <div className={classes.time}>
          <label className="col-6">prep Time : {props.prepTime} m</label>
          <label>cook Time : {props.cookTime} m</label>
        </div>
      </div>
    </div>
  );
}

export default RecipeItem;

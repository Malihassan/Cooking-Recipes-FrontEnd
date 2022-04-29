import classes from './empty.module.css'
import {ImFilesEmpty} from 'react-icons/im'
function Empty(props) {
  return (
    <div
      className={`d-flex flex-column justify-content-start align-items-center ${classes.divEmpty}`}
    >
      <ImFilesEmpty className={`${classes.emptyIcon}`} />
      <p className="text-dark text-center fs-3 pt-5">
        {props.message}
      </p>
    </div>
  );
}

export default Empty;

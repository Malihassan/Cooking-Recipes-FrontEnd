import React from "react";

import classes from "./loader.module.css";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

function Loader() {
  const loading = useSelector((state) => state.loader.loader);
  return (
    <>
      {loading && (
        <div className={`${classes.loader}`}>
          <Spinner animation="border" variant="light" className="fs-1 p-4" />
        </div>
      )}
    </>
  );
}

export default Loader;

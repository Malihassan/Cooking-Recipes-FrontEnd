import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../network/axiosConfig";
import { loaderAction } from "../store/loader";
export default function useHttp() {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(null);

  const sendRequest = useCallback(
    async (requestConfig, redirectionHandler) => {
      setHasError(null);
      dispatch(loaderAction.toggleLoader());
      // try {
      let respose;
      switch (requestConfig.method) {
        case "GET":
          respose = await axiosInstance
            .get(requestConfig.url, {
              params: requestConfig.params ? requestConfig.params : {},
            })
            .catch((error) => {
              setHasError(error.response.data);
              dispatch(loaderAction.toggleLoader());
            });
          break;
        case "POST":
          respose = await axiosInstance
            .post(
              requestConfig.url,
              requestConfig.body ? requestConfig.body : null
            )
            .catch((error) => {
              setHasError(error.response.data);
              dispatch(loaderAction.toggleLoader());
            });
          break;
        case "PATCH":
          respose = await axiosInstance
            .patch(
              requestConfig.url,
              requestConfig.body ? requestConfig.body : {},
              requestConfig.headers ? requestConfig.headers : {}
            )
            .catch((error) => {
              setHasError(error.response.data);
              dispatch(loaderAction.toggleLoader());
            });
          break;
        case "DELETE":
          respose = await axiosInstance
            .delete(requestConfig.url)
            .catch((error) => {
              setHasError(error.response.data);
              dispatch(loaderAction.toggleLoader());
            });
          break;
        default:
          break;
      }
      redirectionHandler(respose);
      dispatch(loaderAction.toggleLoader());
    },
    [dispatch]
  );
  return {
    hasError,
    sendRequest,
  };
}

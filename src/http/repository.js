import { useQuery } from "react-query";
import { ApiClient } from "./api-client";
var config = require("../config.json");


export const useGetTodos = (pageIndex) => {
  const resultLength = pageIndex ? 10 : 40; // load first time 40 and for more just 10
  return useQuery(
    ["todos", pageIndex],
    () => {
      console.info("server request sent.");
      return ApiClient.get(
        `${config.image_base_url}/api/?results=${resultLength}`
      );
    },
    { refetchOnWindowFocus: false, keepPreviousData: true } // with this configuration we keep the old images and load more data based on change on pageIndex
  );
};;

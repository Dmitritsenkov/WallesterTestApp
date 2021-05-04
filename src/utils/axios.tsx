import axios from "axios";
import * as Constants from "./constants";

const axiosUtility = axios.create({
  baseURL: Constants.baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*", 
    "Content-Type": "application/json",
  },
}); 

export default axiosUtility;

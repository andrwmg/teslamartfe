import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/data",
  headers: {  "Access-Control-Allow-Origin": "http://localhost:8081"
}
});
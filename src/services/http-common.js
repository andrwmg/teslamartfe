import axios from "axios";

const loc = window.location

export default axios.create({
  baseURL: `${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':8080/data' : ''}`,

  //  http://localhost:8080/data",

  headers: {  "Access-Control-Allow-Origin": "http://localhost:8081"
}
});
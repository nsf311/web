import axios from "axios";

// React Client sends HTTP Requests and retrieves HTTP Responses using Axios, 
// consumes data on the components. React Router is used for navigating to pages.
export default axios.create({
  baseURL: "http://localhost:3001/bos311",
  headers: {
    "Content-type": "application/json"
  }
});
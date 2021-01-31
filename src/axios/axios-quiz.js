import axios from "axios";

export default axios.create({
  baseURL: "https://react-quiz-d4e4d-default-rtdb.firebaseio.com/"
});

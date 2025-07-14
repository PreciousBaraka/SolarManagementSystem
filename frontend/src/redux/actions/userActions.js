import axios from "axios";
import { loginFail, loginStart, loginSuccess } from "../slices/userSlices";

export const loginUser = (userData) => async (dispatch) =>{
    try {
      dispatch(loginStart());
      const {data} = await axios.post("http://localhost:5000/api/users/login", userData);
       dispatch(loginSuccess(data))
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data?.message
        : error.message;
        dispatch(loginFail(errorMessage))
    }
}
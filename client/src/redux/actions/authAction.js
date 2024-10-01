import axios from "axios";
import { setUserInfo, setLoading, setError } from "../reducers/authReducer";

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post("/api/users/login", credentials);
    dispatch(setUserInfo(data));
    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch(setError(error.response.data.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(setUserInfo(null));
};
import { useSetAtom } from "jotai";
import { roleValue, userEmail } from "../components/Atom";
import axios from "axios";

const useLogin = () => {
  const setRole = useSetAtom(roleValue);
  const setEmail = useSetAtom(userEmail);

  const loginSuccess = async (user) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/employees/employee/check-email`,
        {
          email: user.email,
        }
      );

      if (response.data.Employee) {
        const { role } = response.data.Employee;
        setRole(role);
        setEmail(user.email);
        console.log(
          "Login Success: Role set to",
          role,
          "Email set to",
          user.email
        );
      } else {
        loginFailure("Employee not found in the database");
      }
    } catch (error) {
      console.error("Error during login:", error);
      loginFailure("Error checking employee data");
    }
  };

  const loginFailure = (message) => {
    console.log("Login failed:", message);
    setRole(null);
    setEmail(null);
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error parsing JWT:", error);
      return null;
    }
  };

  return { loginSuccess, loginFailure, parseJwt };
};

export default useLogin;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "./redux/slices/authSlice";
import { RouterProvider } from "react-router-dom";
import router from "./routes"; // On importe les routes depuis un fichier séparé

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("token") && !token) {
      dispatch(setToken({ token: localStorage.getItem("token") }));
      dispatch(setUser({ user: JSON.parse(localStorage.getItem("user")) }));
    }
  }, [dispatch, token]);

  return <RouterProvider router={router} />;
}

export default App;

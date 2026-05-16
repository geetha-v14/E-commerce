import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { fetchCurrentUser, } from "./features/auth/authSlice";

import AppRoutes from "./routes/AppRoutes";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    const token = localStorage.getItem(
      "accessToken"
    );

    if (token) {

      dispatch(
        fetchCurrentUser()
      );

    }

  }, [dispatch]);

  return <AppRoutes />;

};

export default App;
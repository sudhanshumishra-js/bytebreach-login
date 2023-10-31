import React, { useEffect } from "react";
export const AuthContext = React.createContext();
const AuthContextProvider = (props) => {
  const getInitialState = () => {
    const storedAuthState = localStorage.getItem("authState");
    return storedAuthState
      ? JSON.parse(storedAuthState)
      : { isLoggedIn: false, userName: null };
  };
  const [authState, setAuthState] = React.useState(getInitialState);

  useEffect(() => {
    const storedAuthState = localStorage.getItem("authState");
    if (storedAuthState) {
      setAuthState(JSON.parse(storedAuthState));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  const login = (email) => {
    setAuthState({ ...authState, isLoggedIn: true, userName: email });
  };
  const logout = () => {
    setAuthState({ ...authState, isLoggedIn: false, userName: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(undefined); 

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsub;
  }, []);

  if (user === undefined) {
    return <h3 style={{textAlign:"center",}}>Loading...</h3>; 
  }

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

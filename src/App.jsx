import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AddNotes from "./components/AddNotes";
import { ToastContainer } from "react-toastify";
import ViewNotes from "./components/ViewNotes";


function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddNotes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view"
          element={
            <ProtectedRoute>
              <ViewNotes />
            </ProtectedRoute>
          }
        />

        

      </Routes>
    </>
  );
}

export default App;

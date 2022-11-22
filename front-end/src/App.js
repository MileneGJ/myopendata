import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import HomePage from "./pages/HomePage";
import FilePage from "./pages/FilePage";
import CreateFilePage from "./pages/CreateFilePage";
import AuthorPage from "./pages/AuthorPage";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <ProtectedRouteGuard>
                <HomePage />
              </ProtectedRouteGuard>
            }
          />
          <Route
            path="/file/:id"
            element={
              <ProtectedRouteGuard>
                <FilePage />
              </ProtectedRouteGuard>
            }
          />
          <Route
            path="/new-file"
            element={
              <ProtectedRouteGuard>
                <CreateFilePage />
              </ProtectedRouteGuard>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRouteGuard>
                <HomePage />
              </ProtectedRouteGuard>
            }
          />
          <Route
            path="/author/:authorId"
            element={
              <ProtectedRouteGuard>
                <AuthorPage />
              </ProtectedRouteGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
function ProtectedRouteGuard({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
}
export default App;

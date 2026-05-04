import { Navigate, Route, Routes } from "react-router-dom";
import { useMarketplace } from "./context/MarketplaceContext.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Gallery from "./pages/Gallery.jsx";
import Detail from "./pages/Detail.jsx";
import Profile from "./pages/Profile.jsx";
import PostFormPage from "./pages/PostFormPage.jsx";
import NotFound from "./pages/NotFound.jsx";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useMarketplace();
  return isAuthenticated ? children : <Navigate to="/login" replace state={{ reason: "private" }} />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/publicaciones" element={<Gallery />} />
        <Route path="/publicaciones/:id" element={<Detail />} />
        <Route
          path="/perfil"
          element={(
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          )}
        />
        <Route
          path="/publicar"
          element={(
            <PrivateRoute>
              <PostFormPage mode="create" />
            </PrivateRoute>
          )}
        />
        <Route
          path="/editar/:id"
          element={(
            <PrivateRoute>
              <PostFormPage mode="edit" />
            </PrivateRoute>
          )}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

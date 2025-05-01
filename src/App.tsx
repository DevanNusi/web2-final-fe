import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bensin from "./pages/Bensin";
import AddBensin from "./pages/AddBensin";
import EditBensin from "./pages/EditBensin";
import CuciMobil from "./pages/CuciMobil";
import AddCuciMobil from "./pages/AddCuciMobil";
import EditCuciMobil from "./pages/EditCuciMobil";
import Pembeli from "./pages/Pembeli";
import AddPembeli from "./pages/AddPembeli";
import EditPembeli from "./pages/EditPembeli";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { AuthProvider } from "./utils/AuthProvider";

const queryClient = new QueryClient();
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<BaseLayout />}>
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Route>
        <Route path="/" element={<RootLayout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="bensin"
            element={
              <PrivateRoute>
                <Bensin />
              </PrivateRoute>
            }
          />
          <Route
            path="add-bensin"
            element={
              <PrivateRoute>
                <AddBensin />
              </PrivateRoute>
            }
          />
          <Route
            path="edit-bensin/:id"
            element={
              <PrivateRoute>
                <EditBensin />
              </PrivateRoute>
            }
          />
          <Route
            path="cuci-mobil"
            element={
              <PrivateRoute>
                <CuciMobil />
              </PrivateRoute>
            }
          />
          <Route
            path="add-cuci-mobil"
            element={
              <PrivateRoute>
                <AddCuciMobil />
              </PrivateRoute>
            }
          />
          <Route
            path="edit-cuci-mobil/:id"
            element={
              <PrivateRoute>
                <EditCuciMobil />
              </PrivateRoute>
            }
          />
          <Route
            path="pembeli"
            element={
              <PrivateRoute>
                <Pembeli />
              </PrivateRoute>
            }
          />
          <Route
            path="add-pembeli"
            element={
              <PrivateRoute>
                <AddPembeli />
              </PrivateRoute>
            }
          />
          <Route
            path="edit-pembeli/:id"
            element={
              <PrivateRoute>
                <EditPembeli />
              </PrivateRoute>
            }
          />
        </Route>
      </Route>
    )
  );
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;

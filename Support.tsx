import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { VerifyEmail } from "./pages/VerifyEmail";
import { Dashboard } from "./pages/Dashboard";
import { Marketplace } from "./pages/Marketplace";
import { MyClasses } from "./pages/MyClasses";
import { Profile } from "./pages/Profile";
import { Credits } from "./pages/Credits";
import { Support } from "./pages/Support";
import { AdminDashboard } from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/verify-email",
    Component: VerifyEmail,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/marketplace",
    Component: Marketplace,
  },
  {
    path: "/my-classes",
    Component: MyClasses,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/credits",
    Component: Credits,
  },
  {
    path: "/support",
    Component: Support,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
]);

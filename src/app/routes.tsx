import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Menu } from "./components/Menu";
import { Delivery } from "./components/Delivery";
import { Reservations } from "./components/Reservations";
import { Login } from "./components/Login";
import { Profile } from "./components/Profile";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "menu", Component: Menu },
      { path: "delivery", Component: Delivery },
      { path: "reservations", Component: Reservations },
      { path: "login", Component: Login },
      { path: "profile", Component: Profile },
      { path: "*", Component: NotFound },
    ],
  },
]);
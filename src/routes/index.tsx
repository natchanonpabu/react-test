import { RouteObject } from "react-router-dom";
import Home from "../pages/home";
import FormAndTable from "../pages/form-and-table";
import LayoutAndStyle from "../pages/layout-and-style";

const APP_ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/form-and-table",
    element: <FormAndTable />,
  },
  {
    path: "/layout-and-style",
    element: <LayoutAndStyle />,
  },
];

export default APP_ROUTES;

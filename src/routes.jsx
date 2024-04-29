import Inventory from "./views/inventory";
import Orders from "./views/orders";

const routes = [
  {
    name: "orders",
    path: "/orders",
    element: <Orders />,
  },
  {
    name: "Inventory",
    path: "/inventory",
    element: <Inventory />,
  },
];

export default routes;

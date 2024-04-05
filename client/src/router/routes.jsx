import routeConfig from "../config/router";
import Auth from "../pages/auth/Auth";
import UpdateUser from "../pages/auth/UpdateUser.jsx";
import Cart from "../pages/cart/components/Cart";
import Ao from "../pages/category/ao/Ao";
import Quan from "../pages/category/quan/Quan";
import Shose from "../pages/category/shose/Shose.jsx";
import Vay from "../pages/category/vay/Vay";
import Dashboard from "../pages/home/components/Dashboard";
import Bill from "../pages/manage/Bill.jsx";
import Home from "../pages/manage/Home";
import Product from "../pages/manage/Product";
import ProductSearch from "../pages/manage/ProductSearch.jsx";
import ProductDetail from "../pages/product/components/ProductDetail";
import Search from "../pages/search/Search";

const routes = [
  {
    path: routeConfig.home,
    element: <Dashboard />,
    layout: "layout",
  },
  {
    path: routeConfig.cart,
    element: <Cart />,
    layout: "layout",
  },
  {
    path: routeConfig.productdetail,
    element: <ProductDetail />,
    layout: "layout",
  },
  {
    path: routeConfig.ao,
    element: <Ao />,
    layout: "layout",
  },
  {
    path: routeConfig.shose,
    element: <Shose />,
    layout: "layout",
  },
  {
    path: routeConfig.updateUser,
    element: <UpdateUser />,
    layout: "layout",
  },
  {
    path: routeConfig.quan,
    element: <Quan />,
    layout: "layout",
  },

  {
    path: routeConfig.vay,
    element: <Vay />,
    layout: "layout",
  },
  {
    path: routeConfig.search,
    element: <Search />,
    layout: "layout",
  },
  {
    path: routeConfig.auth,
    element: <Auth />,
    layout: "layout",
  },
  {
    path: routeConfig.managementHome,
    element: <Home />,
    layout: "management",
  },
  {
    path: routeConfig.managementProduct,
    element: <Product />,
    layout: "management",
  },
  {
    path: routeConfig.managementProductSearch,
    element: <ProductSearch />,
    layout: "management",
  },
  {
    path: routeConfig.managementBill,
    element: <Bill />,
    layout: "management",
  },
];

export default routes;

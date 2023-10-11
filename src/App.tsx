import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./error-page";
import {
  Root,
  Products,
  Cart,
  SingleProduct,
  productsLoader,
  singleProductLoader,
  cartLoader,
} from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
      },
      {
        path: "/:productId",
        element: <SingleProduct />,
        loader: singleProductLoader,
      },
      {
        path: "/cart",
        element: <Cart />,
        loader: cartLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

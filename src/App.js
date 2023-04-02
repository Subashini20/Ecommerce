import { Provider } from "react-redux";
import commerceStore from "./eCommerceStore";
import CartPage from "./commerce";
import Products from "./Products";

const ReduxSample = () => {
  return (
    <div>
      <Provider store={commerceStore}>
        <CartPage />
        <hr />
        <Products />
      </Provider>
    </div>
  )
}

export default ReduxSample;
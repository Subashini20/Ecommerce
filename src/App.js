import React from "react";
import { Provider } from "react-redux";
import store from "./eCommerceStore";
import Products from "./Pages/Products";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  );
};

export default App;

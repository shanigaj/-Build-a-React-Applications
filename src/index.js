import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css"; // Import your Tailwind CSS file
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import App from "./App"; // Import your App component
// import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Router>
    {" "}
    {/* Wrap your app with BrowserRouter */}
    <App />
  </Router>,
  document.getElementById("root")
);

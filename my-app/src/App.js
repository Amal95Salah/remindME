import React from "react";
import Data from "./Data";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Signout from "./pages/Signout/Signout";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/blogs" element={<BlogsPage blogsData={blogs} />} /> */}
          {/* <Route
              path="/blogs/:blogId"
              element={<SingleBlogPage blogData={blogs} />}
            /> */}
          <Route path="data" element={<PrivateRoute />}>
            <Route path="/data" element={<Data />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signout" element={<Signout />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

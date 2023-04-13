import React from "react";
import Data from "./Data";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Reminder from "./pages/Reminder/Reminder";
import MedicineForm from "./pages/Medicine/MedicineForm";
import ViewMadicine from "./pages/Medicine/ViewMadicine";
import Profile from "./pages/Profile/Profile";
import ListNotification from "./components/Notification/ListNotification";

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
          <Route path="reminder" element={<PrivateRoute />}>
            <Route path="/reminder" element={<Reminder />} />
          </Route>
          <Route path="medicine/add" element={<PrivateRoute />}>
            <Route path="/medicine/add" element={<MedicineForm />} />
          </Route>
          <Route path="profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/medicine/list" element={<ViewMadicine />} />
          <Route path="/notification" element={<ListNotification />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

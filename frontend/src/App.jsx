
import React, { useEffect } from "react";

import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Footer from "./components/footer/footer";
import About from "./components/about/about";
import Todo from "./components/todo/todo";
import Signup from "./components/signup/signup";
import Signin from "./components/signup/signin";
import PrivateRoute from "./components/PrivateRoute";

import { useDispatch } from "react-redux";
import { authActions } from "./store";

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (token) {
            dispatch(authActions.login());
        }
    }, [dispatch]);

    return (
        <Router>

            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                <Route
                    path="/todo"
                    element={
                        <PrivateRoute>
                            <Todo />
                        </PrivateRoute>
                    }
                />

                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
            </Routes>

            <Footer />

        </Router>
    );
}

export default App;
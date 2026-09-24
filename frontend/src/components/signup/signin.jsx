import React, { useState } from "react";
import "./signup.css";
import Headingcomp from "./headingcomp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const change = (e) => {
        const { name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3200/api/v1/signin",
                inputs
            );

            console.log("LOGIN RESPONSE:", response.data);

            sessionStorage.setItem("id", response.data.others._id);
            sessionStorage.setItem("email", response.data.others.email);
            sessionStorage.setItem("token", response.data.token);

            console.log("ID SAVED:", sessionStorage.getItem("id"));
            console.log("EMAIL SAVED:", sessionStorage.getItem("email"));
            console.log("TOKEN SAVED:", sessionStorage.getItem("token"));

            dispatch(authActions.login());
            navigate("/todo");
        } catch (error) {
            console.log(
                "LOGIN ERROR:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div className="signup">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center">
                        <Headingcomp first="Sign" second="In" />
                    </div>

                    <div className="col-lg-8 column d-flex justify-content-center align-items-center">
                        <div className="d-flex flex-column w-100 p-5">
                            <input
                                className="p-2 my-3 input-signup"
                                type="email"
                                name="email"
                                placeholder="Enter Your Email"
                                onChange={change}
                                value={inputs.email}
                            />

                            <input
                                className="p-2 my-3 input-signup"
                                type="password"
                                name="password"
                                placeholder="Enter Your Password"
                                onChange={change}
                                value={inputs.password}
                            />

                            <button
                                className="btn-signup p-2"
                                onClick={submit}
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
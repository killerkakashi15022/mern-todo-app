import React, { useState } from "react";
import "./signup.css";
import Headingcomp from "./headingcomp";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const Signup = () => {
    const history =useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
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
                "http://localhost:3200/api/v1/register",
                inputs
            );

            console.log(response.data);

            setInputs({
                email: "",
                username: "",
                password: "",
            });
            history("/signin")

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="signup">
            <div className="container">
                <div className="row">

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
                                type="text"
                                name="username"
                                placeholder="Enter Your Username"
                                onChange={change}
                                value={inputs.username}
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
                                Sign Up
                            </button>

                        </div>
                    </div>

                    <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center">
                        <Headingcomp first="Sign" second="Up" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Signup;
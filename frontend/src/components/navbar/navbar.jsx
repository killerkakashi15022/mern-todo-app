import { RiCalendarTodoFill } from "react-icons/ri";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store";

const Navbar = () => {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("token");

        dispatch(authActions.logout());

        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">

                <Link className="navbar-brand" to="/">
                    <b>
                        <RiCalendarTodoFill className="todo-icon" />
                        todo
                    </b>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        <li className="nav-item mx-2">
                            <Link className="nav-link active" to="/">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item mx-2">
                            <Link className="nav-link active" to="/about">
                                About Us
                            </Link>
                        </li>

                        <li className="nav-item mx-2">
                            <Link className="nav-link active" to="/todo">
                                Todo
                            </Link>
                        </li>

                        {!isLoggedIn && (
                            <>
                                <li className="nav-item mx-2">
                                    <Link
                                        className="nav-link active btn-nav"
                                        to="/signup"
                                    >
                                        SignUp
                                    </Link>
                                </li>

                                <li className="nav-item mx-2">
                                    <Link
                                        className="nav-link active btn-nav"
                                        to="/signin"
                                    >
                                        SignIn
                                    </Link>
                                </li>
                            </>
                        )}

                        {isLoggedIn && (
                            <li
                                className="nav-item mx-2"
                                onClick={logout}
                            >
                                <Link
                                    className="nav-link active btn-nav"
                                    to="/"
                                >
                                    Log Out
                                </Link>
                            </li>
                        )}

                    </ul>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
import React, { useEffect, useState } from "react";
import "./todo.css";
import TodoCards from "./todocards";
import Update from "./update";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Todo = () => {
    const [inputs, setInputs] = useState({
        title: "",
        body: ""
    });

    const [array, setArray] = useState([]);
    const [updateId, setUpdateId] = useState(null);

    const [updateInputs, setUpdateInputs] = useState({
        title: "",
        body: ""
    });

    const show = () => {
        document.getElementById("textarea").style.display = "block";
    };

    const change = (e) => {
        const { name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const submit = async () => {
        console.log("ADD BUTTON CLICKED");

        if (inputs.title === "" || inputs.body === "") {
            toast.error("Title or Body should not be empty");
            return;
        }

        const token = sessionStorage.getItem("token");

        console.log("TOKEN:", token);
        console.log("INPUTS:", inputs);

        if (!token) {
            const newTask = {
                title: inputs.title,
                body: inputs.body,
                _id: Date.now().toString()
            };

            setArray((prev) => [...prev, newTask]);

            setInputs({
                title: "",
                body: ""
            });

            toast.info("Please login to save your tasks");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:3200/api/v1/addtask",
                {
                    title: inputs.title,
                    body: inputs.body
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("ADD RESPONSE:", response.data);

            setArray((prev) => [...prev, response.data.list]);

            setInputs({
                title: "",
                body: ""
            });

            toast.success("Your Task is Added");
        } catch (error) {
            console.log(
                "ADD ERROR:",
                error.response?.data || error.message
            );

            toast.error(
                error.response?.data?.message || "Failed to add task"
            );
        }
    };

    const del = async (taskId) => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            setArray((prev) =>
                prev.filter((item) => item._id !== taskId)
            );

            toast.success("Task deleted successfully");
            return;
        }

        try {
            await axios.delete(
                `http://localhost:3200/api/v1/deletetask/${taskId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setArray((prev) =>
                prev.filter((item) => item._id !== taskId)
            );

            toast.success("Task deleted successfully");
        } catch (error) {
            console.log(
                "DELETE ERROR:",
                error.response?.data || error.message
            );

            toast.error(
                error.response?.data?.message || "Failed to delete task"
            );
        }
    };

    const update = (taskId) => {
        const task = array.find((item) => item._id === taskId);

        if (!task) return;

        setUpdateId(taskId);

        setUpdateInputs({
            title: task.title,
            body: task.body
        });

        document.getElementById("todo-update").style.display = "block";
    };

    const updateChange = (e) => {
        const { name, value } = e.target;

        setUpdateInputs({
            ...updateInputs,
            [name]: value
        });
    };

    const updateSubmit = async () => {
        if (
            updateInputs.title === "" ||
            updateInputs.body === ""
        ) {
            toast.error("Title or Body should not be empty");
            return;
        }

        const token = sessionStorage.getItem("token");

        if (!token) {
            setArray((prev) =>
                prev.map((item) =>
                    item._id === updateId
                        ? {
                              ...item,
                              title: updateInputs.title,
                              body: updateInputs.body
                          }
                        : item
                )
            );

            setUpdateId(null);

            setUpdateInputs({
                title: "",
                body: ""
            });

            document.getElementById("todo-update").style.display = "none";

            toast.info("Please login to save your changes");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:3200/api/v1/updatetask/${updateId}`,
                {
                    title: updateInputs.title,
                    body: updateInputs.body
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setArray((prev) =>
                prev.map((item) =>
                    item._id === updateId
                        ? response.data.list
                        : item
                )
            );

            setUpdateId(null);

            setUpdateInputs({
                title: "",
                body: ""
            });

            document.getElementById("todo-update").style.display = "none";

            toast.success("Task updated successfully");
        } catch (error) {
            console.log(
                "UPDATE ERROR:",
                error.response?.data || error.message
            );

            toast.error(
                error.response?.data?.message || "Failed to update task"
            );
        }
    };

    const closeUpdate = () => {
        document.getElementById("todo-update").style.display = "none";

        setUpdateId(null);

        setUpdateInputs({
            title: "",
            body: ""
        });
    };

    useEffect(() => {
        const fetchTasks = async () => {
            const token = sessionStorage.getItem("token");

            if (!token) return;

            try {
                const response = await axios.get(
                    "http://localhost:3200/api/v1/gettask",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log("TASKS:", response.data);

                setArray(response.data.list || []);
            } catch (error) {
                console.log(
                    "GET TASK ERROR:",
                    error.response?.data || error.message
                );
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className="todo">
            <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
                <div className="d-flex flex-column todo-input-div w-50 p-3">
                    <input
                        type="text"
                        placeholder="Title"
                        className="my-2 p-2 todo-inputs"
                        onClick={show}
                        name="title"
                        value={inputs.title}
                        onChange={change}
                    />

                    <textarea
                        id="textarea"
                        placeholder="BODY"
                        className="p-2 todo-inputs"
                        name="body"
                        value={inputs.body}
                        onChange={change}
                    />
                </div>

                <div className="w-50 d-flex justify-content-end my-3">
                    <button
                        type="button"
                        className="home-btn px-2 py-1"
                        onClick={submit}
                    >
                        Add
                    </button>
                </div>
            </div>

            <div className="todo-body">
                <div className="container-fluid">
                    <div className="row">
                        {array.map((item) => (
                            <div
                                className="col-lg-3 mx-5 my-2"
                                key={item._id}
                            >
                                <TodoCards
                                    title={item.title}
                                    body={item.body}
                                    id={item._id}
                                    del={del}
                                    update={update}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                className="todo-update"
                id="todo-update"
            >
                <div className="container update">
                    <Update
                        updateInputs={updateInputs}
                        updateChange={updateChange}
                        updateSubmit={updateSubmit}
                        closeUpdate={closeUpdate}
                    />
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Todo;
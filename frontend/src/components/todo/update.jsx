import React from "react";

const Update = ({
    updateInputs,
    updateChange,
    updateSubmit,
    closeUpdate
}) => {

    return (
        <div className="p-5 bg-primary d-flex justify-content-center align-items-center flex-column">

            <h3>Update your task</h3>

            <input
                type="text"
                name="title"
                className="todo-inputs my-4 w-100 p-3"
                value={updateInputs.title}
                onChange={updateChange}
                placeholder="Enter Title"
            />

            <textarea
                name="body"
                className="todo-inputs w-100 p-3"
                value={updateInputs.body}
                onChange={updateChange}
                placeholder="Enter Body"
            />

            <div>

                <button
                    className="btn btn-dark my-4"
                    onClick={updateSubmit}
                >
                    Update
                </button>

                <button
                    className="btn btn-danger my-4 mx-3"
                    onClick={closeUpdate}
                >
                    Close
                </button>

            </div>

        </div>
    );
};

export default Update;
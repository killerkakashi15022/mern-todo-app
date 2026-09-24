import React from "react";

import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";

const TodoCards = ({ title, body, id, del, update }) => {

    return (
        <div className="p-3 todo-card">

            <div>
                <h1>{title}</h1>

                <p className="todo-card-p">
                    {body.slice(0, 25)}...
                </p>
            </div>

            <div className="d-flex justify-content-around card-icon-head">

                {/* UPDATE */}

                <div
                    className="card-action"
                    onClick={() => update(id)}
                >
                    <GrDocumentUpdate className="card-icons" />
                    Update
                </div>


                {/* DELETE */}

                <div
                    className="card-action"
                    onClick={() => del(id)}
                >
                    <MdDelete className="card-icons del" />
                    Delete
                </div>

            </div>

        </div>
    );
};

export default TodoCards;
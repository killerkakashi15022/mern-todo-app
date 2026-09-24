import React from "react";

const Headingcomp = ({ first, second }) => {
    return (
        <div>
            <h1 className="text-center sign-up-heading">
                {first} <br /> {second}
            </h1>
        </div>
    );
};

export default Headingcomp;
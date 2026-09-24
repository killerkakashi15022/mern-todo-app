const express = require("express");
const cors = require("cors");

const app = express();

require("./conn/conn");

const auth = require("./route/auth");
const list = require("./route/list");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("list");
});

app.use("/api/v1", auth);
app.use("/api/v1", list);

app.listen(3200, () => {
    console.log("Server started on port 3200");
});
const express = require("express");
require("dotenv").config();

const router = require("./routes/routers");

const app = express();

const PORT = process.env.PORT || 3001; // 3001 for test purposes only, if env not available

app.use(express.json());
app.use("/", router);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

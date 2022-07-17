require('dotenv').config();
const express = require("express");
const carRouter = require("./routes/car.routes");
const PORT = process.env.PORT || 8080;
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use("/api", carRouter);




app.listen(PORT, () => {console.log(`server started on port ${PORT}`)});

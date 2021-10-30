require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = 4000;
const yodabotRoute = require("./routes/yodabot");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/yodabot", yodabotRoute);

app.listen(port, () => {
  console.log(`Starting server on port: ${port}`);
});

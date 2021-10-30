require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const port = 4000;
const app = express();

app.use(express.json());
app.use(cors());

const customRequest = axios.create({
  headers: {
    "x-inbenta-key": process.env.X_INBENTA_KEY,
    "Content-Type": "application/json",
  },
});

app.post("/auth", async (req, res) => {
  const data = await customRequest.post("https://api.inbenta.io/v1/auth", {
    secret: process.env.SECRET,
  });
  res.json(data.data);
});

app.post("/conversation", async (req, res) => {
  let config = {
    headers: {
      "x-inbenta-key": process.env.X_INBENTA_KEY,
      Authorization: req.body.token,
    },
  };
  try {
    const data = await axios.post(
      `${req.body.baseUrl}/v1/conversation`,
      {},
      config
    );
    console.log(data.data);
    res.json(data.data);
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`Starting server on port: ${port}`);
});

const express = require("express");
const router = express.Router();
const axios = require("axios");

const customRequest = axios.create({
  headers: {
    "x-inbenta-key": process.env.X_INBENTA_KEY,
    "Content-Type": "application/json",
  },
});

router.post("/auth", async (req, res) => {
  const data = await customRequest.post("https://api.inbenta.io/v1/auth", {
    secret: process.env.SECRET,
  });
  res.json(data.data);
});

router.post("/conversation", async (req, res) => {
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
    res.json(data.data);
  } catch (e) {
    console.log(e);
  }
});

router.post("/conversation/message", async (req, res) => {
  let config = {
    headers: {
      "x-inbenta-key": process.env.X_INBENTA_KEY,
      Authorization: req.body.token,
      "x-inbenta-session": req.body.sessionToken,
    },
  };
  try {
    const data = await axios.post(
      `${req.body.baseUrl}/v1/conversation/message`,
      { message: req.body.message },
      config
    );
    console.log(data.data);
    res.json(data.data.answers);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

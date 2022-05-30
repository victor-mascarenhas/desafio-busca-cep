const express = require("express");
const app = express();
const axios = require("axios");
const { param, validationResult } = require("express-validator");
let cors = require("cors");

const PORT = 4646;

app.use(cors());

app.get(
  "/cep/:cep",
  [param("cep", "Um CEP válido deve conter 8 digitos").isLength({ min: 8 })],
  async (req, res) => {
    try {
      const valErrors = validationResult(req);
      const cep = req.params.cep;
      if (!valErrors.isEmpty()) {
        return res.status(400).json(valErrors);
      } else {
        const { data } = await axios.get(
          `https://ws.apicep.com/cep.json?code=${cep}`
        );
        res.status(200).send(data);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err);
    }
  }
);

const server = app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});

module.exports = { app, server };

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.use((error, request, response, next) => {
  console.error(error);
  response.status(error.status || 500).json({
    message: error.message || "Error interno del servidor",
    errors: error.errors || [],
  });
});

app.listen(port, () => {
  console.log(`API Mercado Vecino disponible en http://localhost:${port}/api`);
});

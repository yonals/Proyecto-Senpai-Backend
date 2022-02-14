const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Client } = require("pg");
if (process.env.ENV !== "production") {
  require("dotenv").config();
}
const { resolve } = require("path");
const { config } = require("dotenv");
config({path: resolve(__dirname, "./.env") });


const { router: usersRouter } = require("./routes/barber")

const authRouter = require("./routes/auth");
const { router: listaDeInscriptos } = require("./routes/inscriptos");
const { response } = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.get("/test", async (request, response) => {
  const client = new Client();
  client.connect();

  client.query("SELECT $1::text as message", ["Hola Mundo!"], (err, res) => {
    if (err) {
      console.error(err.stack);
      response.send("Error: " + err.stack);
    } else {
      console.log(res.rows[0].message);
      response.send(res.rows[0].message);
    }
    client.end();
  });
});

app.use("/auth", authRouter);
app.use("/inscriptos", listaDeInscriptos);

app.listen(PORT, function () {
  console.log(`Corriendo en el puerto ${PORT}`);
});
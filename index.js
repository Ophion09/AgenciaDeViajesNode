import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

const app = express();

// Conectando a la BD
db.authenticate()
  .then(() => console.log("Conectado correctamente a la base de datos"))
  .catch(error => console.log(error));

// Definir Puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set("view engine", "pug");

// Obtener el ano actual
app.use((req, res, next) => {
  const year = new Date();

  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = "Agencia de Viajes";
  return next();
});

// Agregar el bodyParse para habilitar la lectura de formularios
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static("public"));

// Agregar Router
app.use("/", router);

app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});

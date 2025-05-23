import express from "express";
import bodyParser from "body-parser";

// importamos el crud
import ciudadesRoutes from "./routes/ciudadesRoutes.js";
import generoRoutes from "./routes/generosRoutes.js";
import lenguajesRoutes from "./routes/lenguajesRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//inicializamos el app

app.use("/ciudades", ciudadesRoutes);
app.use("/generos", generoRoutes);
app.use("/lenguajes", lenguajesRoutes);
app.use("/usuarios", usuariosRoutes);

app.listen(3000, () => {
  console.log("Creando Nuevo Mundo");
});

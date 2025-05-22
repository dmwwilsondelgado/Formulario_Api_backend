import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Configuración de la conexión
const connection = await mysql.createConnection({
  host: "localhost",
  user: "wilsondelgado",
  password: "1102717619",
  database: "formulario_api",
});

export default connection;

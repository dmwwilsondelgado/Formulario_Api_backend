import { crearTablas, validarText} from "./modulos";
import { validarForm ,campo,get ,crearTablas,validarCamposMinimos} from "./modulos";
const formulario = document.querySelector("form");
const lenguaje = document.querySelector('[name="habilidades"]');
const boton=document.querySelector("btn__validar")

lenguaje.addEventListener("keydown", validarText);
lenguaje.addEventListener("blur",validarCamposMinimos )
lenguaje.addEventListener("blur",campo)
const habilidades = await get("habilidades");
// crearTablas(["id", "habilidades"], habilidades.data);
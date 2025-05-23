
import { validarText} from "./modulos";
import { validarForm ,campo,get,crearTablas,validarCamposMinimos} from "./modulos";
const formulario = document.querySelector("form");
const genero = document.querySelector('[name="genero"]');
genero.addEventListener("blur",validarCamposMinimos)
genero.addEventListener("keydown", validarText);
formulario.addEventListener( "submit",validarForm)
genero.addEventListener("blur", campo);

const generos = await get("generos");
// crearTablas(["id","genero",generos.data])
